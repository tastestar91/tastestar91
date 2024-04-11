"use strict";

const debug = require("debug")("ir-sensor-data-monitor:manager:man-memstore");

const moduleManager = require("./module-manager");

// JSON object MemStore
const memStoreMap = new Map();

moduleManager.registerModuleReleaseHandler(release);

// Release all resources
function release() {
  memStoreMap.clear();
}

module.exports = memStoreMap;
