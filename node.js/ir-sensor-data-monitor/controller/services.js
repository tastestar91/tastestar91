const debug = require("debug")("ir-sensor-data-monitor:controller:services");
const memStore = require("../manager/man-memstore");
const { searchLetters, throwErr } = require("../middleware/middleware");


function loadDepth2(req, res) {
  let data = memStore.get(`ir/${req.params.v}/${req.params.api}`)[req.params.sid];
  if (Object.keys(data).length !== 0) {
    res.status(200).json(data);
  } else {
    throwErr(1);
  }
}

function loadDepth3(req, res) {
  let data = memStore.get(`ir/${req.params.v}/${req.params.api}`)[req.params.sid];
  if (Object.keys(searchLetters(data, req.params.aid)).length !== 0) res.json(searchLetters(data, req.params.aid));
  else {
    throwErr(1);
  }
}

module.exports = {
  loadDepth2: loadDepth2,
  loadDepth3: loadDepth3,
};
