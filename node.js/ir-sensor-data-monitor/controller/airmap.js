const debug = require("debug")("ir-sensor-data-monitor:controller:airmap");
const request = require("request-promise-native");

const conf = require("../conf/config").sensorDataMonitor;
const confCollector = require(conf.appsConfFile);

tsdb_query_url = "http://" + confCollector["servers"]["kwKiotCluster"]["opentsdb"]["address"][0] + "/api/query?";

let httpOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  forever: true,
  timeout: 50000,
  uri: "http://kiototsdb.kweather.co.kr:24242/api/query?",
  body: "",
  json: true,
};

function airMapData(data) {
  let result = {
    [data[0].metric.split(".")[2]]: {
      [data[0]["tags"]["sensor"]]: Object.values(data[0]["dps"])[0], //pm10
      [data[1]["tags"]["sensor"]]: Object.values(data[1]["dps"])[0], //pm25
      [data[2]["tags"]["sensor"]]: Object.values(data[2]["dps"])[0], //lon
      [data[3]["tags"]["sensor"]]: Object.values(data[3]["dps"])[0], //lat
      [data[4]["tags"]["sensor"]]: Object.values(data[4]["dps"])[0], //uw
      [data[5]["tags"]["sensor"]]: Object.values(data[5]["dps"])[0], //vw
      [data[6]["tags"]["sensor"]]: Object.values(data[6]["dps"])[0], //wd
      [data[7]["tags"]["sensor"]]: Object.values(data[7]["dps"])[0], //ws
      [data[8]["tags"]["sensor"]]: Object.values(data[8]["dps"])[0], //h
      [data[9]["tags"]["sensor"]]: Object.values(data[9]["dps"])[0], //t
    },
  };
  return result;
}

function httpArea(start, end, area, number, sensor) {
  if (area === "11") {
    httpOptions.body = {
      timezone: "Asia/Seoul",
      useCalendar: true,
      start: start,
      end: end,
      queries: [{ metric: `kw-kgkw1.${area}`, aggregator: "sum", tags: { grid: "*", sensor: `${sensor}|lon|lat` } }],
    };
    return httpOptions;
  } else {
    httpOptions.body = {
      timezone: "Asia/Seoul",
      useCalendar: true,
      start: start,
      end: end,
      queries: [{ metric: `kw-kgkw1.${area}.${number}`, aggregator: "sum", tags: { grid: "*", sensor: `${sensor}|lon|lat` } }],
    };

    return httpOptions;
  }
}

function isGrid(result, row) {
  result[row["tags"]["grid"]]["data"][row["tags"]["sensor"]] = Object.values(row["dps"])[0];
}

function isNotGrid(result, row) {
  result[row["tags"]["grid"]] = {
    ["data"]: {
      [row["tags"]["sensor"]]: Object.values(row["dps"])[0],
    },
  };
}

module.exports = {
  areaData: async (req, res) => {
    const { start, end, area, sensor } = req.query;

    try {
      if (area === "11") {
        const areaData = await request(httpArea(start, end, area, 0, sensor));

        if (!areaData) {
          throw new Error("No Data");
        }

        let result = {};
        areaData.forEach((row) => {
          result[row["tags"]["grid"]] ? isGrid(result, row) : isNotGrid(result, row);
        });
        res.status(200).json(result);
      } else {
        const areaData = await Promise.all([
          request(httpArea(start, end, area, 0, sensor)),
          request(httpArea(start, end, area, 1, sensor)),
          request(httpArea(start, end, area, 2, sensor)),
        ]);

        if (!areaData) {
          throw new Error("No Data");
        }
        let result = {};
        areaData.flat().forEach((row) => {
          result[row["tags"]["grid"]] ? isGrid(result, row) : isNotGrid(result, row);
        });
        res.status(200).json(result);
      }
    } catch (err) {
      debug(`ERR: [OpenTSDB/AIRMAP]: ${err}`);
    }
  },

  deviceData: async (req, res) => {
    const { start, end, area, device } = req.query;

    httpOptions.body = {
      timezone: "Asia/Seoul",
      useCalendar: true,
      start: start,
      end: end,
      queries: [{ metric: `kw-kgkw1.${area}.${device}`, downsample: "1h-first-none", aggregator: "sum", tags: { sensor: "*" } }],
    };

    try {
      const deviceData = await request(httpOptions);

      if (!deviceData) {
        throw new Error("No Data");
      }
      let result = [];
      for (let i = 0; i < deviceData.length; i = i + 10) {
        result.push(airMapData(deviceData.slice(i, i + 10)));
      }
      res.status(200).json(result);
      debug("SUCCESS: [OpenTSDB/AIRMAP]:");
    } catch (err) {
      debug("ERROR: [OpenTSDB/AIRMAP]:", err.statusCode, err.statusMessage, err.request.body);
      res.status(404);
    }
  },
};
