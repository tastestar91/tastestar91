"use strict";

const debug = require("debug")("ir-sensor-data-monitor:routes:apiroute-v1");
const expressRouter = require("express").Router();

const airmap = require("../controller/airmap");
const general = require("../controller/general");
const services = require("../controller/services");
const sensors = require("../controller/kw-sensors");
const special = require("../controller/special");
const appsApi = require("../controller/appsApi");
const fs = require("fs");

const memStore = require("../manager/man-memstore");
const { findSid, wrapError } = require("../middleware/middleware");
const zkUpdater = require("../updater/from-zk");

runUpdaters();

// Run Ingress-router sensor data and configuration updaters
async function runUpdaters() {
  try {
    console.log("loadJsonSensorData");

    try {
      await zkUpdater.update();
    } catch (err) {
      debug("ERROR:", err); // Ignore an error
    }

    // if (fs.existsSync("./data.json", "utf-8")) {
    //   console.log("data1 File exists.");
    //   const data = fs.readFileSync("./data.json", "utf-8");
    //   memStore.set("ir/v1/sensors", JSON.parse(data));
    // } else {
    //   console.log("File does not exist.");
    // }

    // if (fs.existsSync("./data2.json", "utf-8")) {
    //   console.log("data2 File exists.");

    //   const data = fs.readFileSync("./data2.json", "utf-8");
    //   memStore.set("ir/v2/sensors", JSON.parse(data));
    // } else {
    //   console.log("File does not exist.");
    // }

    debug("Loaded READ sensorData");
  } catch (err) {
    debug("ERROR:", err);
  }
}

// Express router
expressRouter.get("/:v/apps/:sid/:aid", findSid, wrapError(appsApi.loadDepth4));

expressRouter.get("/:v/services/kw-kgkw1/:area", wrapError(airmap.areaData));
expressRouter.get("/:v/services/:sid/:aid", wrapError(services.loadDepth3));
expressRouter.get("/:v/services/:sid", wrapError(services.loadDepth2));

expressRouter.get("/:v/kw-sensors/:sid/:aid", findSid, wrapError(sensors.loadDepth3));
expressRouter.get("/:v/kw-sensors/:sid", findSid, wrapError(sensors.loadDepth2));

expressRouter.get("/:v/sensors/kw-gps1", findSid, special.loadDepth3);

expressRouter.get("/:v/sensors/:sid/:aid/:did", findSid, wrapError(general.loadDepth4));
expressRouter.get("/:v/sensors/:sid/:aid", findSid, wrapError(general.loadDepth3));
expressRouter.get("/:v/sensors/:sid", findSid, wrapError(general.loadDepth2));
expressRouter.get("/:v/sensors", wrapError(general.loadDepth1));

module.exports = expressRouter;
