const mqtt = require("mqtt");
const request = require("request");

// const client = mqtt.connect("mqtt://localhost:1883");
const client = mqtt.connect("mqtt://kwall4.kweather.co.kr:38616");

client.publish("test/alarm/test", JSON.stringify({ id: "kw-iske1", timestamp: 1688610300, deviceId: "IARAW1800010", deviceType: "iaq", smoke: 1 }));

// for (let i = 0; i < 100; i++) {
//   client.publish("test/alarm/test", JSON.stringify({ id: "kw-iske1", timestamp: 1688610300, deviceId: "IARAW1800010", deviceType: "iaq", smoke: 1 }));
//   console.log(i);
// }
// client.on("connect", () => {
//   console.log("연결되었습니다");
//   client.subscribe("kwv-arc/req/#");
// });

// setInterval(
//   () => {
//     client.publish('beems-aircon/ack/IGT-SAM-CON_2200001', 'DATA0000123456000030013=')
//     client.publish('beems-aircon/ack/IGT-SAM-CON_2200002', 'DATA0000123456000030013=')
//     client.publish('beems-cleaner/ack/IGT-CAR-CLN_2200001', 'DATA000045645600003003E=')
//     client.publish('beems-cleaner/ack/IGT-CAR-CLN_2200002', 'DATA000045645600003003E=')
//     client.publish('beems-vent/ack/KWB-ST1_2200001', 'DATA000045645600003003E=')
//   }, 1000 * 60 // 1분
// )
// client.subscribe("beems-cleaner/ack/#");
// client.subscribe("beems-cleaner/ack/CAR-CON_2200001");
// client.subscribe("beems-cleaner/ack/CAR-CON_2200002");
// SENSOR_FIELDS = [
// 	"power", "wind_speed", "bipass_mode", "auto_mode", "filter_alarm", "air_mode"
// ]

// ELECTRIC_SENSOR_FIELDS = [
// 	"electric_energy","effective_power"
// ]
// let SENSOR_FIELDS = ["power", "operation_mode", "temp", "humi", "desired_speed", "wind_speed"];

// let ELECTRIC_SENSOR_FIELDS = ["watt_hour", "watt"];

// client.on("message", (topic, message) => {
//   console.log(topic, message, "들어오네!!!");
//   message = message.toString("utf-8");
//   console.log(message);
// let data_header, data_str, data_sensor;
// let reg_data = new Date(+new Date() + 3240 * 10000).toISOString();
// topic_tree = topic.split("/");

// data_header = message.substring(0, 4);
// data_str = message.substring(4, message.length - 2);

// if (data_header === "STAT") {
//   data_sensor = SENSOR_FIELDS;
// } else {
//   data_sensor = ELECTRIC_SENSOR_FIELDS;
// }

// let payload = { serial: topic_tree[2], reg_date: reg_data };
// if (data_header === "STAT") {
//   // payload[data_sensor[0]] = data_str.substring(0, 2);
//   // payload[data_sensor[1]] = data_str.substring(2, 4);
//   // payload[data_sensor[2]] = data_str.substring(4, 6);
//   // payload[data_sensor[3]] = data_str.substring(6, 8);
//   // payload[data_sensor[4]] = data_str.substring(8, 13);
//   // payload[data_sensor[5]] = data_str.substring(13, 18);
//   payload[data_sensor[0]] = data_str.substring(0, 2); // power
//   payload[data_sensor[1]] = data_str.substring(2, 4); // operation_mode
//   payload[data_sensor[2]] = data_str.substring(4, 9); // temp
//   payload[data_sensor[3]] = data_str.substring(9, 12); // humi
//   payload[data_sensor[4]] = data_str.substring(12, 14); // desired_speed
//   payload[data_sensor[5]] = data_str.substring(14, 16); // wind_speed
// } else {
//   payload[data_sensor[0]] = data_str.substring(0, 10); // electric_energy
//   payload[data_sensor[1]] = data_str.substring(10, 18); // effective_power
// }
// console.log(payload);
// const option = {
//   url: "http://localhost:40001/v1/sensors/kw-watt-csbp1",
//   method: "POST",
//   body: payload,
//   json: true,
//   // };
//   // request.post(option, (err, result) => {
//   //   console.log(err);
//   // });
// });

// client.on("error", (err) => {
//   console.log(err);
// });
