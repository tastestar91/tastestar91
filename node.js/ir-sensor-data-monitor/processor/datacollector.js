const debug = require("debug")("ir-sensor-data-monitor:controller:datacollector");
const memStore = require("../manager/man-memstore");
const keyPrefix = "ir/v1/";
const _ = require("lodash");
const moment = require("moment");
const { throwErr } = require("../middleware/middleware");

setInterval(() => {
  deleteKtko50();
}, 1000); //* 30); // 30 minute

function deleteKtko50() {
  try {
    let now = new Date();
    for (let i = 1; i <= 3; i++) {
      let data = memStore.get(keyPrefix + "sensors")[`kw-ktko51${i}`];
      if (Object.keys(data).length !== 0) {
        for (const key of Object.keys(data)) {
          let keydate = new Date(moment(data[key]["service"]["timestamp"], "YYYYMMDDHHmm").add(9, "hours"));
          if ((now.getTime() - keydate.getTime()) / (24 * 60 * 60 * 1000) > 7) {
            delete memStore.get(keyPrefix + "sensors")[`kw-ktko51${i}`][key];
          }
        }
      } else {
        continue;
      }
    }
  } catch (err) {
    throwErr(err);
    debug("ERROR:", err.message);
  }
}
