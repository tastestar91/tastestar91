const { throwErr } = require("../middleware/middleware");

function receiveMessage(data) {
  return { error: "0", message: "정상", data: data };
}

function loadDepth4(req, res) {
  let data = req.memData;

  if (data[req.params.aid]) {
    let result = {
      hcode: req.params.aid,
      timestamp: data[req.params.aid]["service"]["timestamp"],
      ...data[req.params.aid]["data"],
    };
    res.json(receiveMessage(result));
  } else {
    throwErr(1);
  }
}

module.exports = {
  loadDepth4: loadDepth4,
};
