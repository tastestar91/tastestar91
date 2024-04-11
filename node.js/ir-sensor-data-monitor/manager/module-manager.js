"use strict";

const debug = require("debug")("ir-sensor-data-monitor:manager:module-manager");
const fs = require("fs");
const path = require("path");

const defaultModuleExt = "js";

let moduleReleaseHandlers = [];

// Load Ingress-router modules
function loadModules(modulePath, modulePrefix, moduleExt) {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(modulePath, (err, files) => {
        try {
          if (!moduleExt) {
            moduleExt = defaultModuleExt;
          }

          let type = path.basename(modulePath);
          let moduleName,
            moduleMap = new Map();

          files.forEach((file) => {
            try {
              if (file.startsWith(modulePrefix) && file.endsWith("." + moduleExt)) {
                moduleName = file.substring(modulePrefix.length, file.length - moduleExt.length - 1);
                moduleMap.set(moduleName, require(path.join("..", modulePath, file)));
              }
            } catch (err) {
              debug("ERROR:", err);
            }
          });

          resolve(moduleMap);
          debug("Loaded %s modules: %o", type, [...moduleMap.keys()]);
        } catch (err) {
          debug("ERROR: Failed to load %s modules: %s", modulePath, err.message);
          reject(err);
        }
      });
    } catch (err) {
      debug("ERROR:", err);
      reject(err);
    }
  });
}

// Register a module release handler
function registerModuleReleaseHandler(handler) {
  if (handler && typeof handler === "function") {
    moduleReleaseHandlers.push(handler);
    return true;
  } else {
    debug("ERROR: Invalid module release handler");
    return false;
  }
}

// Call all module release handlers
function releaseAllModules() {
  for (let handler of moduleReleaseHandlers) {
    try {
      handler();
    } catch (err) {
      debug("ERROR:", err);
    }
  }
  moduleReleaseHandlers = [];
}

// Wrapping function for promise timeout
function startPromiseTimer(promise, timeoutMs, timeoutReason) {
  let timeoutHandle;

  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      timeoutHandle = setTimeout(() => {
        reject(timeoutReason);
      }, timeoutMs);
    }),
  ]).then((result) => {
    clearTimeout(timeoutHandle);
    return result;
  });
}

// Start a promise reject timer
function enableRejectTimeout(reject, timeoutMs, timeoutReason) {
  return setTimeout(() => {
    reject(timeoutReason);
  }, timeoutMs);
}

module.exports = {
  loadModules: loadModules,
  registerModuleReleaseHandler: registerModuleReleaseHandler,
  releaseAllModules: releaseAllModules,
  startPromiseTimer: startPromiseTimer,
  enableRejectTimeout: enableRejectTimeout,
};
