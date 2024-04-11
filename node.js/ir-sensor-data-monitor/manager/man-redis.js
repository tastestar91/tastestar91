"use strict";

const debug = require("debug")("ir-sensor-data-monitor:manager:man-redis");
const Redis = require("ioredis");

const moduleManager = require("./module-manager");

const redisPubServerMap = new Map();
const redisSubServerMap = new Map();
const redisSubChannelHandlerMap = new Map();

const redisConnectionTimeout = 5000;

const defaultNodeOptions = {
  keepAlive: 10000,
  noDelay: false,
  dropBufferSupport: true,
  enableReadyCheck: true,
  enableOfflineQueue: true,
  autoResubscribe: true,
  autoResendUnfulfilledCommands: true,
  password: "",
};

const defaultClusterOptions = {
  enableOfflineQueue: true,
  enableReadyCheck: true,
  scaleReads: "master",
  maxRedirections: 16,
  retryDelayOnFailover: 100,
  retryDelayOnClusterDown: 100,
  retryDelayOnTryAgain: 100,
  redisOptions: defaultNodeOptions,
};

moduleManager.registerModuleReleaseHandler(release);

// Generate the address list of Redis cluster nodes
function getClusterAddressList(addressStr) {
  let addressInfo,
    addressList = [];
  for (let address of addressStr.split(",")) {
    addressInfo = address.trim().split(":");
    addressList.push({ port: addressInfo[1], host: addressInfo[0] });
  }
  return addressList;
}

// Connect a Redis server
function connect(address, serverMap, /* [optional] */ password) {
  return new Promise((resolve, reject) => {
    let rejectTimeoutHandle;

    try {
      // If there exists a valid connection, return the connection
      let redis = new Redis({
        host: "localhost",
        port: 6379,
      });
      // let redis = serverMap.get("localhost:6379");

      // If there exists no valid connection, create a new connection
      rejectTimeoutHandle = moduleManager.enableRejectTimeout(reject, redisConnectionTimeout, new Error("Connection timeout"));

      // let addressList = getClusterAddressList(address);
      // if (password) {
      //   let nodeOptions = defaultNodeOptions;
      //   nodeOptions.password = password;
      //   let clusterOptions = defaultClusterOptions;
      //   clusterOptions.redisOptions = nodeOptions;
      //   redis = new Redis.Cluster(addressList, clusterOptions);
      // } else {
      //   redis = new Redis.Cluster(addressList, defaultClusterOptions);
      // }

      redis.on("error", () => {
        debug("ERROR: [Redis/CLUSTER_ERROR]: %o (%o)", address, redis.status);
      });

      redis.on("connect", () => {
        clearTimeout(rejectTimeoutHandle);
        let rd = serverMap.get(address);
        if (rd) {
          resolve(rd);
          redis.disconnect();
        } else {
          redis.on("pmessage", pmessageHandler);
          serverMap.set(address, redis);
          resolve(redis);
          debug("Connected to Redis: %o (%o)", address, redis.status);
        }
      });
    } catch (err) {
      if (rejectTimeoutHandle) clearTimeout(rejectTimeoutHandle);
      debug("ERROR:", err);
      reject(err);
    }
  });
}

// Release all resources
function release() {
  for (let serverMap of [redisPubServerMap, redisSubServerMap]) {
    for (let redis of serverMap.values()) {
      if (redis) {
        try {
          redis.disconnect();
        } catch (err) {
          debug("ERROR:", err);
        }
      }
    }
    serverMap.clear();
  }
}

// Publish data to a Redis channel
function publish(address, channel, data, /* [optional] */ password) {
  return new Promise(async (resolve, reject) => {
    try {
      let redis = await connect(address, redisPubServerMap, password);

      if (!Array.isArray(channel)) {
        channel = [channel];
      }

      for (let index = 0; index < channel.length; ++index) {
        redis
          .publish(channel[index], data)
          .then((result) => {
            debug("SUCCESS: [Redis/PUB]: %s: %s", address, channel[index]);
            if (index === 0) resolve(result);
          })
          .catch((err) => {
            debug("ERROR: [Redis/PUB]: %s: %s: %s", address, channel[index], err);
            if (index === 0) reject(err);
          });
      }
    } catch (err) {
      debug("ERROR: [Redis/PUB]: %s: %s: %s", address, channel, err);
      reject(err);
    }
  });
}

// Psubscribe message handler
async function pmessageHandler(pattern, channel, message) {
  try {
    /*
		debug('INFO: [Redis/PSUB]: %s (%s), message = %s',
			channel, pattern, message);
		*/

    let handler = redisSubChannelHandlerMap.get(pattern);
    if (handler) {
      await handler(pattern, channel, message);
    }
  } catch (err) {
    debug("ERROR: [Redis/PSUB]: %s (%s): %s", channel, pattern, err);
  }
}

// Psubscribe to a Redis channel
function psubscribe(address, pattern, patternHandler, /* [optional] */ password) {
  return new Promise(async (resolve, reject) => {
    try {
      let redis = await connect(address, redisSubServerMap, password);
      redis.psubscribe(pattern, (err, count) => {
        if (err) {
          debug("ERROR: [Redis/PSUB]: %s: %s (%d): %s", address, pattern, count, err);
          reject(err);
        } else {
          redisSubChannelHandlerMap.set(pattern, patternHandler);
          debug("Subscribed to a Redis channel: %o", pattern);
          resolve();
        }
      });
    } catch (err) {
      debug("ERROR: [Redis/PSUB]: %s: %s: %s", address, pattern, err);
      reject(err);
    }
  });
}

// Get Redis data
function get(address, key, /* [optional] */ password) {
  return new Promise(async (resolve, reject) => {
    try {
      let redis = await connect(address, redisSubServerMap, password);

      redis.get(key, (err, result) => {
        if (err) {
          debug("ERROR: [Redis/GET]: %s: %s: %s", address, key, err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (err) {
      debug("ERROR: [Redis/GET]: %s: %s: %s", address, key, err);
      reject(err);
    }
  });
}

// Set Redis data
function set(address, key, data, /* [optional] */ password) {
  return new Promise(async (resolve, reject) => {
    try {
      let redis = await connect(address, redisPubServerMap, password);

      redis.set(key, data, (err, result) => {
        if (err) {
          debug("ERROR: [Redis/SET]: %s: %s: %s", address, key, err);
          reject(err);
        } else {
          debug("SUCCESS: [Redis/SET]: %s: %s", address, key);
          resolve(result);
        }
      });
    } catch (err) {
      debug("ERROR: [Redis/SET]: %s: %s: %s", address, key, err);
      reject(err);
    }
  });
}

module.exports = {
  publish: publish,
  psubscribe: psubscribe,
  get: get,
  set: set,
};
