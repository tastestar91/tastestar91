"use strict";

const sensorDataMonitor = {
  appsConfFile: "../apps-config.json",
  port: 30101,
  memStore: {
    redisKeyPrefix: "ir-sensor-data-monitor/v1/memstore:",
  },
  redis: {
    memStoreChannel: {
      put: "ir-sensor-data-monitor/v1/memstore.put:",
    },
    groupManagerChannel: {
      put: "ir-sensor-data-monitor/v1/groupmanager.put:",
    },
    redisServiceUpdaterChannel: {
      put: "ir-sensor-data-monitor/v1/redisServiceupdater.put:",
    },
    redisSubUpdaterChannel: {
      put: "ir-sensor-data-monitor/v1/redissubupdater.put:",
    },
  },
};

module.exports = {
  sensorDataMonitor: sensorDataMonitor,
};
