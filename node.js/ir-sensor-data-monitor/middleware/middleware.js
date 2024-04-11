const memStore = require("../manager/man-memstore");
const debug = require("debug")("ir-sensor-data-monitor");

function findSid(req, res, next) {
  let memData = memStore.get(`ir/${req.params.v}/sensors`);

  if (memData[req.params.sid] != undefined) {
    req.memData = memData[req.params.sid];
    next();
  } else {
    return throwErr(2);
  }
}

function throwErr(number) {
  let err = new Error();
  err.statusCode = number;
  throw err;
}

function wrapError(fn) {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (err) {
      debug("ERROR: GET %s%s: %s", req.baseUrl, req.path, err.message);
      next(err);
    }
  };
}

function searchLetters(data, aid) {
  let result = {};
  let entries = Object.entries(data);
  for (let [key, value] of entries) {
    if (key.startsWith(aid)) {
      result[key] = value;
    }
  }
  if (Object.keys(result).length !== 0) {
    return result;
  } else {
    throwErr(1);
  }
}

module.exports = {
  searchLetters: searchLetters,
  findSid: findSid,
  throwErr: throwErr,
  wrapError: wrapError,
};
