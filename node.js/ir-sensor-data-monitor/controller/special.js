const memStore = require("../manager/man-memstore");
const { throwErr } = require("../middleware/middleware");

async function loadDepth3(req, res) {
  let data = await memStore.get(`ir/${req.params.v}/sensors`)["kw-gps1"];

  if (data) {
    if (req.query.pm10_start && req.query.pm10_end) {
      data["data"] = data["data"].map((el) => {
        return {
          ...el,
          pm10: Math.floor(Math.random() * (Number(req.query.pm10_end) - Number(req.query.pm10_start))) + Number(req.query.pm10_start),
        };
      });
    }
    if (req.query.pm25_start && req.query.pm25_end) {
      data["data"] = data["data"].map((el) => {
        return {
          ...el,
          pm25: Math.floor(Math.random() * (Number(req.query.pm25_end) - Number(req.query.pm25_start))) + Number(req.query.pm25_start),
        };
      });
    }
    res.status(200).json(data);
  } else {
    throwErr(1);
  }
}

module.exports = {
  loadDepth3: loadDepth3,
};
