"use strict";

const debug = require("debug")("ir-sensor-data-monitor:manager:man-memstore-redis");

const moduleManager = require("./module-manager");
const redis = require("./man-redis");

const conf = require("../conf/config").sensorDataMonitor;
const confCollector = require(conf.appsConfFile).collector;

const redisKeyDelimiter = ":";

// Ingress-router MemStore for JSON object data
const memStoreMap = new Map();

moduleManager.registerModuleReleaseHandler(release);

startUpdate();

// Psubscribe to the MemStore PUT channel to update data in the MemStore
async function startUpdate() {
  try {
    await redis.psubscribe(
      confCollector.redis.address[0],
      conf.redis.memStoreChannel.put + "*",
      (pattern, channel, message) => {
        return new Promise((resolve, reject) => {
          try {
            let key = channel.split(redisKeyDelimiter)[1];
            // Update data in the MemStore
            memStoreMap.set(key, JSON.parse(message));
            resolve(key);
          } catch (err) {
            debug("ERROR: [MemStore/PSUB_PUT]: %s: %s", channel, err.message);
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

// Release all resources
function release() {
  memStoreMap.clear();
}

// Get data from the MemStore or Redis
function get(key) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = memStoreMap.get(key);
      if (!data) {
        try {
          data = JSON.parse(await redis.get(confCollector.redis.address[0], conf.memStore.redisKeyPrefix + key, confCollector.redis.password));
          memStoreMap.set(key, data);
        } catch (err) {
          data = null;
        }
      }
      resolve(data);
    } catch (err) {
      debug("ERROR: [MemStore/GET]: %s: %s", key, err);
      reject(err);
    }
  });
}

function mget(key) {
  return new Promise(async (resolve, reject) => {
    try {
      data = JSON.parse(await redis.mget(confCollector.redis.address[0], conf.memStore.redisKeyPrefix + key, confCollector.redis.password));
      memStoreMap.set(key, data);
      resolve(data);
    } catch (err) {
      data = null;
    }
  });
}
// Set data to the MemStore and Redis
function set(key, data) {
  return new Promise(async (resolve, reject) => {
    try {
      await redis.set(confCollector.redis.address[0], conf.memStore.redisKeyPrefix + key, JSON.stringify(data), confCollector.redis.password);
      memStoreMap.set(key, data);
      resolve();
    } catch (err) {
      debug("ERROR: [MemStore/SET]: %s: %s", key, err);
      reject(err);
    }
  });
}

module.exports = {
  get: get,
  set: set,
  mget: mget,
};
