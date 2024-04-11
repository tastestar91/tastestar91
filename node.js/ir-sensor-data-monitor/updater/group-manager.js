"use strict";

const debug = require("debug")("ir-sensor-data-monitor:updater:group-manager");
const request = require("request-promise-native");

const redis = require("../manager/man-redis");
const memStore = require("../manager/man-memstore");
const memStoreRedis = require("../manager/man-memstore-redis");

const conf = require("../conf/config").sensorDataMonitor;
const confCollector = require(conf.appsConfFile).collector;

const sensorsKey = "ir/v1/sensors";
const groupsKey = "ir/v1/groups";
const groupConfKey = "ir-mon/groups/v1/config";
const groupUpdateChannel = "ir-mon/groups/v1/update";
const fs = require("fs");

// read json file with sensor data
function loadJsonSensorData() {
  try {
    if (fs.existsSync("./data.json", "utf-8")) {
      console.log("File exists.");
      const data = fs.readFileSync("./data.json", "utf-8");
      memStore.set("ir/v1/sensors", JSON.parse(data));
    } else {
      console.log("File does not exist.");
    }

    if (fs.existsSync("./data2.json", "utf-8")) {
      console.log("File exists.");
      const data = fs.readFileSync("./data2.json", "utf-8");
      memStore.set("ir/v2/sensors", JSON.parse(data));
    } else {
      console.log("File does not exist.");
    }
    console.log("세팅완료");
    debug("Loaded READ sensorData");
  } catch (err) {
    debug("ERROR:", err);
  }
}
// Subscribe to a group configuration update channel to update group data
async function startConfUpdate() {
  try {
    await generate();
    await redis.psubscribe(
      confCollector.redis.address[0],
      conf.redis.groupManagerChannel.put + groupUpdateChannel,
      (pattern, channel, message) => {
        return new Promise(async (resolve, reject) => {
          try {
            let conf = JSON.parse(message);
            debug("INFO: Received group configurations:", conf);
            await update(conf);
            let groupConf = await memStoreRedis.get(groupConfKey);
            for (let gid in conf) {
              if (!groupConf[gid]) groupConf[gid] = {};
              Object.assign(groupConf[gid], conf[gid]);
            }
            await memStoreRedis.set(groupConfKey, groupConf);
            resolve();
          } catch (err) {
            debug("ERROR: [GRPMAN/PSUB_CONFUPDATE]: %s: %s", channel, err.message);
            reject(err);
          }
        });
      },
      confCollector.redis.password
    );
  } catch (err) {
    debug("ERROR:", err);
  }
}

// Generate group data
async function generate() {
  return new Promise(async (resolve, reject) => {
    try {
      let groupConf = await memStoreRedis.get(groupConfKey);
      if (!groupConf) {
        await memStoreRedis.set(groupConfKey, {});
        resolve();
        return;
      }

      let groupData = await updateGroupData(groupConf, memStore.get(sensorsKey), {});
      if (!groupData) {
        throw new Error("Invalid group configurations");
      }

      memStore.set(groupsKey, groupData);
      resolve();
    } catch (err) {
      debug("ERROR:", err.message);
      reject(err);
    }
  });
}

// Update group data
async function update(groupConf) {
  let groupData = await updateGroupData(groupConf, memStore.get(sensorsKey), memStore.get(groupsKey));
  if (!groupData) throw new Error("Invalid group configurations");
}

// Update group data based on group configurations
async function updateGroupData(groupConf, sensorData, groupData) {
  try {
    let matched;
    debug("groupConf update: %o", groupConf);

    for (let gid in groupConf) {
      if (Object.keys(groupConf[gid]).length === 0) {
        delete groupData[gid];
        let fullGroupConf = await memStoreRedis.get(groupConfKey);
        delete fullGroupConf[gid];
        await memStoreRedis.set(groupConfKey, fullGroupConf);
        continue;
      }

      if (!groupData[gid]) groupData[gid] = {};

      for (let sid in groupConf[gid]) {
        if (!sensorData[sid]) sensorData[sid] = {};

        // Conf: all
        if (groupConf[gid][sid].all) {
          Object.assign(groupData[gid], sensorData[sid]);
          continue;
        }

        // Conf: list
        if (groupConf[gid][sid].list) {
          for (let did of groupConf[gid][sid].list) {
            if (groupData[gid][did]) continue;

            if (sensorData[sid][did]) {
              groupData[gid][did] = sensorData[sid][did];
            }
          }
        }

        // Conf: pattern
        if (groupConf[gid][sid].pattern) {
          for (let did in sensorData[sid]) {
            if (groupData[gid][did]) continue;

            matched = groupConf[gid][sid].pattern.some((regex) => {
              return new RegExp(regex).test(did);
            });

            if (matched) {
              groupData[gid][did] = sensorData[sid][did];
            }
          }
        }
      }
    }

    return groupData;
  } catch (err) {
    debug("ERROR:", err.message);
    return null;
  }
}

// Add new sensor data to groups
async function addSensorDataToGroups(data) {
  try {
    let groupConf = await memStoreRedis.get(groupConfKey);
    let sensorData = memStore.get(sensorsKey);
    let groupData = memStore.get(groupsKey);

    for (let gid in groupConf) {
      if (!groupData[gid]) groupData[gid] = {};

      if (groupConf[gid][data.service.id] && !groupData[gid][data.service.deviceId]) {
        if (
          groupConf[gid][data.service.id].all ||
          (groupConf[gid][data.service.id].list && groupConf[gid][data.service.id].list.includes(data.service.deviceId)) ||
          (groupConf[gid][data.service.id].pattern &&
            groupConf[gid][data.service.id].pattern.some((regex) => {
              return new RegExp(regex).test(data.service.deviceId);
            }))
        ) {
          groupData[gid][data.service.deviceId] = sensorData[data.service.id][data.service.deviceId];
        }
      }
    }
  } catch (err) {
    debug("ERROR:", err);
  }
}

module.exports = {
  loadJsonSensorData: loadJsonSensorData,
  addSensorDataToGroups: addSensorDataToGroups,
  startConfUpdate: startConfUpdate,
};
