from sqlite3 import paramstyle
import paho.mqtt.client as mqtt
from datetime import datetime
import requests, json

CONFIG_FILE = "./apps-config.json"

IR_SERVICE_ID = "kw-watt-csbp1"

MQTT_SUB_TOPICS = [
	("beems/ack/#", 0)
]	# [(topic, qos), ]

SENSOR_FIELDS = [
	"ch1_current", "ch1_power", "ch2_current", "ch2_power", "ch1_sum", "ch2_sum"
]

fieldDelimiter = "&"
nullData = "NA"

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("beems/ack/#") # Topic

	
def checksum_modulo256(string):
	return hex(sum(string.encode('ascii')) % 256)[-1].upper()

try:
	with open(CONFIG_FILE, 'r') as f:
		conf = json.load(f)

	address = conf["servers"]["kwKiotCluster"]["mqtt"]["address"][1].split(":")

	irApiUrl = "http://" + conf["collector"]["ingressRouter"]["address"][0]
	irApiUrl += conf["collector"]["ingressRouter"]["apiPathV1"]["sensors"]
	irApiUrl += "/" + IR_SERVICE_ID

except Exception as e:
	print(e)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
	
	reg_date = datetime.today().strftime("%Y%m%d%H%M")
	topic_tree = msg.topic.split("/")
	message = msg.payload.decode().lstrip()

	checksum = checksum_modulo256(message[:-1])
	if message[-1:] != checksum:
		raise Exception(f"Wrong checksum: {msg.topic}: {checksum}")	

	if topic_tree[0] == "beems":
		data_str = message[4:-2]
		data_sensor = SENSOR_FIELDS

		payload = { "serial": topic_tree[2], "reg_date": reg_date }

		for i in range(0, len(data_sensor)):
			if data_str.split(fieldDelimiter)[i] != nullData:
				payload[data_sensor[i]] = data_str.split(fieldDelimiter)[i]
		print(payload)
	headers = {'Content-Type': 'application/json; charset=utf-8'}
	print(irApiUrl)
	requests.post(irApiUrl, headers=headers, data=json.dumps(payload))
	

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883) # broker IP

client.loop_forever() #무한루프