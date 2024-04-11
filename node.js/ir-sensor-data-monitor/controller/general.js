const memStore = require("../manager/man-memstore");
const { searchLetters, throwErr } = require("../middleware/middleware");

function loadDepth1(req, res) {
  let data = memStore.get(`ir/${req.params.v}/sensors`);
  console.log(data);
  if (data) res.status(200).json(data);
  else {
    throwErr(1);
  }
}

function loadDepth2(req, res) {
  let data = req.memData;
  res.status(200).json(data);
}

async function loadDepth3(req, res) {
  let data = req.memData;
  if (data) {
    if (req.params.aid.length < 5) {
      let filterData = searchLetters(data, req.params.aid);
      res.status(200).json(filterData);
    } else {
      let filterData = searchLetters(data, req.params.aid);

      if (filterData) res.status(200).json(filterData);
      else {
        throwErr(1);
      }
    }
  } else {
    throwErr(1);
  }
}

function loadDepth4(req, res) {
  let data = req.memData;
  if (data[req.params.aid][req.params.did]) res.json(data[req.params.aid][req.params.did]);
  else {
    throwErr(1);
  }
}

module.exports = {
  loadDepth1: loadDepth1,
  loadDepth2: loadDepth2,
  loadDepth3: loadDepth3,
  loadDepth4: loadDepth4,
};
