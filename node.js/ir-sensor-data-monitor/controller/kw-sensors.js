const { searchLetters, throwErr } = require("../middleware/middleware");

function receiveMessage(data) {
  return { error: "0", message: "정상", data: data };
}

function loadDepth2(req, res) {
  let data = req.memData;
  res.json(receiveMessage(data));
}

async function loadDepth3(req, res) {
  let data = req.memData;

  if (req.params.aid.length === 5) {
    if (data[req.params.aid]) res.json(receiveMessage(data[req.params.aid]));
    else {
      throwErr(1);
    }
  } else if (req.params.aid.length < 4) {
    let filterData = searchLetters(data, req.params.aid);
    res.status(200).json(receiveMessage(filterData));
  } else {
    let filterData = searchLetters(data, req.params.aid);
    res.status(200).json(receiveMessage(filterData));
  }
}

module.exports = {
  loadDepth2: loadDepth2,
  loadDepth3: loadDepth3,
};
