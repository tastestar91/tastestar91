"use strict";

const debug = require("debug")("ir-sensor-data-monitor:updater:from-redis-sub");
const _ = require("lodash");

const redis = require("../manager/man-redis");
const memStore = require("../manager/man-memstore");
const memStoreRedis = require("../manager/man-memstore-redis");
const groupManager = require("../updater/group-manager");

const conf = require("../conf/config").sensorDataMonitor;
const confCollector = require(conf.appsConfFile).collector;

const sensorsKey = "ir/v1/sensors";
const sensorsKey2 = "ir/v2/sensors";

const mergeConfKey = "ir-mon/merges/v1/config";
const mergeUpdateChannel = "ir-mon/merges/v1/update";

// Subscribe to a merge configuration update channel to merge sensor data
async function startConfUpdate() {
  try {
    if (!(await memStoreRedis.get(mergeConfKey))) {
      await memStoreRedis.set(mergeConfKey, {});
    }

    await redis.psubscribe(
      confCollector.redis.address[0],
      conf.redis.redisSubUpdaterChannel.put + mergeUpdateChannel,
      (pattern, channel, message) => {
        return new Promise(async (resolve, reject) => {
          try {
            let conf = JSON.parse(message);
            debug("INFO: Received merge configurations:", conf);
            let mergeConf = await memStoreRedis.get(mergeConfKey);
            for (let sid in conf) {
              mergeConf[sid] = conf[sid];
            }
            await memStoreRedis.set(mergeConfKey, mergeConf);
            resolve();
          } catch (err) {
            debug("ERROR: [UPDATER/PSUB_CONFUPDATE]: %s: %s", channel, err.message);
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

// Ingress-router sensor data update handler for Redis psubscribe
async function sensorDataUpdateHandler(pattern, channel, message) {
  try {
    let irData = JSON.parse(message);

    let sensorData = memStore.get(sensorsKey);
    if (!sensorData) {
      sensorData = {};
      memStore.set(sensorsKey, sensorData);
    }

    // Update sensor data
    function isGps(irData) {
      sensorData[irData.service.id].data = irData.data;
    }
    function isNotGps(irData) {
      sensorData[irData.service.id] = {
        data: irData.data,
      };
    }

    async function isDefault(irData) {
      if (sensorData[irData.service.id][irData.service.deviceId]) {
        sensorData[irData.service.id][irData.service.deviceId].service.timestamp = irData.service.timestamp;
        sensorData[irData.service.id][irData.service.deviceId].data = irData.data;
      } else {
        sensorData[irData.service.id][irData.service.deviceId] = {
          service: {
            timestamp: irData.service.timestamp,
          },
          data: irData.data,
        };
        await groupManager.addSensorDataToGroups(irData);
      }
    }
    async function isNotDefault(irData) {
      sensorData[irData.service.id] = {
        [irData.service.deviceId]: {
          service: {
            timestamp: irData.service.timestamp,
          },
          data: irData.data,
        },
      };
      await groupManager.addSensorDataToGroups(irData);
    }

    function isKgkw(irData) {
      if (sensorData[irData.service.id][irData.service.areaId]) {
        if (sensorData[irData.service.id][irData.service.areaId][irData.service.deviceId]) {
          sensorData[irData.service.id][irData.service.areaId][irData.service.deviceId].service.timestamp = irData.service.timestamp;
          sensorData[irData.service.id][irData.service.areaId][irData.service.deviceId].data = irData.data;
        } else {
          sensorData[irData.service.id][irData.service.areaId][irData.service.deviceId] = {
            service: {
              timestamp: irData.service.timestamp,
            },
            data: irData.data,
          };
        }
      } else {
        sensorData[irData.service.id][irData.service.areaId] = {
          [irData.service.deviceId]: {
            service: {
              timestamp: irData.service.timestamp,
            },
            data: irData.data,
          },
        };
      }
    }

    function isNotKgkw(irData) {
      sensorData[irData.service.id] = {
        [irData.service.areaId]: {
          [irData.service.deviceId]: {
            service: {
              timestamp: irData.service.timestamp,
            },
            data: irData.data,
          },
        },
      };
    }

    switch (irData.service.id) {
      case "kw-gps-busantp":
      case "kw-gps1":
        sensorData[irData.service.id] ? isGps(irData) : isNotGps(irData);
        break;
      case "kw-kgkw1":
        sensorData[irData.service.id] ? isKgkw(irData) : isNotKgkw(irData);
        break;
      default:
        sensorData[irData.service.id] ? isDefault(irData) : isNotDefault(irData);
        break;
    }
  } catch (err) {
    debug("ERROR: [UPDATER/PSUB_DATAUPDATE] %s: %s", channel, err.message);
  }
}

// Ingress-router sensor data update handler for Redis psubscribe
async function sensorDataUpdateHandlerV2(pattern, channel, message) {
  try {
    let irData = JSON.parse(message);

    let sensorData = memStore.get(sensorsKey2);
    if (!sensorData) {
      sensorData = {};
      memStore.set(sensorsKey2, sensorData);
    }

    // Update sensor data
    function isGps(irData) {
      sensorData[irData.service.id].data = irData.data;
    }
    function isNotGps(irData) {
      sensorData[irData.service.id] = {
        data: irData.data,
      };
    }

    async function isDefault(irData) {
      if (sensorData[irData.service.id][irData.service.deviceId]) {
        sensorData[irData.service.id][irData.service.deviceId].service.timestamp = irData.service.timestamp;
        sensorData[irData.service.id][irData.service.deviceId].data = irData.data;
      } else {
        sensorData[irData.service.id][irData.service.deviceId] = {
          service: {
            timestamp: irData.service.timestamp,
          },
          data: irData.data,
        };
        await groupManager.addSensorDataToGroups(irData);
      }
    }
    async function isNotDefault(irData) {
      sensorData[irData.service.id] = {
        [irData.service.deviceId]: {
          service: {
            timestamp: irData.service.timestamp,
          },
          data: irData.data,
        },
      };
      await groupManager.addSensorDataToGroups(irData);
    }

    function isKgkw(irData) {
      if (sensorData[irData.service.id][irData.service.areaId]) {
        if (sensorData[irData.service.id][irData.service.areaId][irData.service.deviceId]) {
          sensorData[irData.service.id][irData.service.areaId][irData.service.deviceId].service.timestamp = irData.service.timestamp;
          sensorData[irData.service.id][irData.service.areaId][irData.service.deviceId].data = irData.data;
        } else {
          sensorData[irData.service.id][irData.service.areaId][irData.service.deviceId] = {
            service: {
              timestamp: irData.service.timestamp,
            },
            data: irData.data,
          };
        }
      } else {
        sensorData[irData.service.id][irData.service.areaId] = {
          [irData.service.deviceId]: {
            service: {
              timestamp: irData.service.timestamp,
            },
            data: irData.data,
          },
        };
      }
    }

    function isNotKgkw(irData) {
      sensorData[irData.service.id] = {
        [irData.service.areaId]: {
          [irData.service.deviceId]: {
            service: {
              timestamp: irData.service.timestamp,
            },
            data: irData.data,
          },
        },
      };
    }

    switch (irData.service.id) {
      case "kw-gps-busantp":
      case "kw-gps1":
        sensorData[irData.service.id] ? isGps(irData) : isNotGps(irData);
        break;
      case "kw-kgkw1":
        sensorData[irData.service.id] ? isKgkw(irData) : isNotKgkw(irData);
        break;
      default:
        sensorData[irData.service.id] ? isDefault(irData) : isNotDefault(irData);
        break;
    }
  } catch (err) {
    debug("ERROR: [UPDATER/PSUB_DATAUPDATE] %s: %s", channel, err.message);
  }
}

// Update Ingress-router sensor data in MemStore from a Redis channel
function update() {
  return new Promise(async (resolve, reject) => {
    try {
      await redis.psubscribe(
        confCollector.redis.address[0],
        confCollector.redis.dataChannelV1.get + "*",
        sensorDataUpdateHandler,
        confCollector.redis.password
      );
      resolve();
    } catch (err) {
      debug("ERROR:", err);
      reject(err);
    }
  });
}

// Update Ingress-router sensor data in MemStore from a Redis channel
function updateV2() {
  return new Promise(async (resolve, reject) => {
    try {
      await redis.psubscribe(
        confCollector.redis.address[0],
        confCollector.redis.dataChannelV2.get + "*",
        sensorDataUpdateHandlerV2,
        confCollector.redis.password
      );
      resolve();
    } catch (err) {
      debug("ERROR:", err);
      reject(err);
    }
  });
}

async function sensorDataDeleteHandler(pattern, channel, message) {
  try {
    let irData = JSON.parse(message);
    let sensorData = memStore.get(sensorsKey);
    if (!sensorData) {
      sensorData = {};
      memStore.set(sensorsKey, sensorData);
    }

    memStore.forEach((el) => {
      if (el[irData.service.id]) {
        if (irData.service.deviceId) {
          delete el[irData.service.id][irData.service.deviceId];
        } else {
          delete el[irData.service.id];
        }
      }
    });
  } catch (err) {
    debug("ERROR: [UPDATER/PSUB_DATAUPDATE] %s: %s", channel, err.message);
  }
}

function del() {
  return new Promise(async (resolve, reject) => {
    try {
      await redis.psubscribe(
        confCollector.redis.address[0],
        confCollector.redis.dataChannelV2.delete + "*",
        sensorDataDeleteHandler,
        confCollector.redis.password
      );
      resolve();
    } catch (err) {
      debug("ERROR:", err);
      reject(err);
    }
  });
}

module.exports = {
  startConfUpdate: startConfUpdate,
  update: update,
  updateV2: updateV2,
  del: del,
};
