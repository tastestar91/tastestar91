"use strict";

const debug = require("debug")("ir-sensor-data-monitor:updater:from-zk");

const zookeeper = require("../manager/man-zk");
const memStore = require("../manager/man-memstore");

const conf = require("../conf/config").sensorDataMonitor;
const confCollector = require(conf.appsConfFile).collector;

const sensorsKey = "ir/v2/sensors";

// Update Ingress-router sensor data in MemStore from ZooKeeper
function update() {
  return new Promise(async (resolve, reject) => {
    try {
      let sensorData = memStore.get(sensorsKey);
      if (!sensorData) {
        sensorData = {};
        memStore.set(sensorsKey, sensorData);
      }

      let groupList = await zookeeper.getZnodeList(confCollector.zookeeper.address[0], confCollector.zookeeper.monitorPathV1.sensors);

      console.log(groupList);
      debug("INFO: [UPDATER/ZK]: Znode: %o: %o (%o)", confCollector.zookeeper.monitorPathV1.sensors, groupList, groupList.length);

      let sidList, sensorList, irData;

      for (let i = 0; i < groupList.length; ++i) {
        sidList = await zookeeper.getZnodeList(confCollector.zookeeper.address[0], confCollector.zookeeper.monitorPathV1.sensors + "/" + groupList[i]);

        debug("INFO: [UPDATER/ZK]: Znode: %o: %o (%o)", groupList[i], sidList, sidList.length);

        for (let j = 0; j < sidList.length; ++j) {
          sensorList = await zookeeper.getZnodeList(
            confCollector.zookeeper.address[0],
            confCollector.zookeeper.monitorPathV1.sensors + "/" + groupList[i] + "/" + sidList[j]
          );

          debug("INFO: [UPDATER/ZK]: Znode: %o: [ ... ] (%o)", sidList[j], sensorList.length);

          if (!sensorData[sidList[j]]) sensorData[sidList[j]] = {};

          for (let k = 0; k < sensorList.length; ++k) {
            try {
              irData = JSON.parse(
                await zookeeper.getZnodeData(
                  confCollector.zookeeper.address[0],
                  confCollector.zookeeper.monitorPathV1.sensors + "/" + groupList[i] + "/" + sidList[j] + "/" + sensorList[k]
                )
              );

              sensorData[sidList[j]][sensorList[k]] = {
                service: {
                  timestamp: irData.service.timestamp,
                },
                data: irData.data,
              };
            } catch (err) {
              debug("ERROR: %s: %s: %s: %s", groupList[i], sidList[j], sensorList[k], err.message);
            }
          }
        }
      }

      debug("SUCCESS: [UPDATER/ZK]: Updated MemStore %o", sensorsKey);
      resolve();
    } catch (err) {
      debug("ERROR: [UPDATER/ZK]:", err.message);
      reject(err);
    }
  });
}

module.exports = {
  update: update,
};
