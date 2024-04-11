//----------------------------------------------------------------
// Ingress-router Sensor Data Monitor [Node.js]
//
// Dongwoo Kwon {dwkwon80@gmail.com}, 2019-04-25
// (last modified: 2020-05-14)
//----------------------------------------------------------------

"use strict";

if (!process.env.DEBUG) process.env.DEBUG = "ir-sensor-data-monitor:*";

const debug = require("debug")("ir-sensor-data-monitor:app");
const express = require("express");
const cors = require("cors");

const { releaseAllModules } = require("./manager/module-manager");
const conf = require("./conf/config").sensorDataMonitor;
const { swaggerUi, specs } = require("./swagger/swagger");

const inetPort = conf.port || 40101;
const apiRouteV1 = require("./routes/apiroute-v1");
const { send_bot } = require("./processor/telegram");
const app = express();

app.use(cors());
app.use("/", apiRouteV1);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((err, req, res, next) => {
  if (err.statusCode === 1) {
    res.status(206).json({
      error: "001",
      message: "데이터를 찾을 수 없음",
    });
  } else if (err.message === "Cannot convert undefined or null to object") {
    res.status(206).json({
      error: "001",
      message: "데이터를 찾을 수 없음",
    });
  } else if (err.statusCode === 2) {
    res.status(404).json({
      error: "002",
      message: "API를 찾을 수 없음",
    });
  } else if (err.message.indexOf("Cannot read") !== -1) {
    res.status(404).json({
      error: "002",
      message: "API를 찾을 수 없음",
    });
  } else if (err.statusCode === 422) {
    res.status(err.statusCode).json({
      error: "102",
      message: "파라미터 오류",
    });
  } else if (err.statusCode === 400 || err.statusCode === 401 || err.statusCode === 403) {
    res.status(err.statusCode).json({
      error: "104",
      message: "접근 오류",
    });
  } else if (err.statusCode === 500 || err.statusCode === 503) {
    res.status(err.statusCode).json({
      error: "105",
      message: "서버 에러",
    });
  } else if (err.code === "ERR_HTTP_INVALID_STATUS_CODE") {
    res.status(500).json({
      error: "105",
      message: "서버 에러",
    });
  } else {
    send_bot(`kwall_ir_sensor_monitor Error: ${err.message}`);
    res.status(901).json({
      error: "901",
      message: "UNKNOWN_ERROR",
    });
  }
});

let expressWs = require("express-ws")(app);

expressWs.getWss().on("error", (error) => {
  debug("ERROR:", error);
  process.exit(1);
});

let sensorDataMonitor = app
  .listen(inetPort, () => {
    debug("Started Ingress-router Sensor Data Monitor on HTTP port %o", inetPort);
  })
  .on("error", (err) => {
    debug("ERROR:", err);
    process.exit(1);
  });

const isJest = typeof jest !== "undefined";

if (isJest) {
  afterAll((done) => {
    // Close the server or release resources after all tests run
    sensorDataMonitor.close(() => {
      console.log("Server closed");
      done();
    });
  });
}

process.on("warning", (e) => debug("WARN:", e.stack));

process.on("unhandledRejection", (reason, p) => {
  // elastic.captureError(err);
  debug("ERROR: UNHANDLED REJECTION at Promise: %O, Reason: %s, Stack: %s", p, reason, reason.stack);
});

process.on("uncaughtException", (err) => {
  // elastic.captureError(err);
  debug("ERROR: UNCAUGHT EXCEPTION:", err);
});

["exit", "SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, (code) => {
    releaseAllModules();

    if (expressWs) {
      try {
        let wss = expressWs.getWss();
        if (wss) {
          wss.clients.forEach((client) => {
            client.close();
          });
          wss.close();
        }
        expressWs = null;
      } catch (err) {
        debug("ERROR:", err);
      }
    }

    if (sensorDataMonitor) {
      sensorDataMonitor.close();
      sensorDataMonitor = null;
    }

    if (signal === "exit") {
      debug("Stopped Ingress-router Sensor Data Monitor");
    } else {
      process.exit(code);
    }
  });
});

module.exports = app;
