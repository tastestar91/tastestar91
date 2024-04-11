from sqlite3 import paramstyle
import paho.mqtt.client as mqtt
from datetime import datetime
import requests, json

CONFIG_FILE = "./apps-config.json"

SENSOR_FIELDS = [
	"power", "wind_speed", "bipass_mode", "auto_mode", "filter_alarm", "air_mode"
]

ELECTRIC_SENSOR_FIELDS = [
	"electric_energy","effective_power"
]

IR_SERVICE_ID = "kw-vsbp1"
IR_SERVICE_ID_WATT = "kw-watt-vsbp1"

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.username_pw_set("user") # broker에 password가 설정되어 있다면 추가 없으면 생략
    client.subscribe("beems/ack/#") # Topic

	

def checksum_modulo256(string):
	return hex(sum(string.encode('ascii')) % 256)[-1].upper()

try:
	with open(CONFIG_FILE, 'r') as f:
		conf = json.load(f)

	address = conf["servers"]["kwKiotCluster"]["mqtt"]["address"][1].split(":")

	irApiUrl = "http://" + conf["collector"]["ingressRouter"]["address"][0]
	irApiUrl += conf["collector"]["ingressRouter"]["apiPathV1"]["sensors"]
	print(irApiUrl)
except Exception as e:
	print(e)

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
	global irApiUrl
	reg_date = datetime.today().strftime("%Y%m%d%H%M")
	message = msg.payload.decode("utf-8")
	topic_tree = msg.topic.split("/")
	print(msg.topic)
	checksum = checksum_modulo256(message[:-2])
	print(checksum)
	if message[-2:-1] != checksum:
		raise Exception(f"Wrong checksum: {msg.topic}: {checksum}")	
		
	data_str = message[4:-2]
	data_header = message[0:4]

	if (data_header == 'STAT'):
		data_sensor = SENSOR_FIELDS
			
	else:
		data_sensor = ELECTRIC_SENSOR_FIELDS

	payload = { "serial": topic_tree[2], "reg_date": reg_date }
	
	if data_header == "STAT":		# Model: HUM
		irApiUrl = irApiUrl + '/' + IR_SERVICE_ID
		for i in range(0, len(data_sensor)):
			if data_str[i*2:i*2+2] != "NA":
				payload[data_sensor[i]] = data_str[i*2:i*2+2]
				
	else:
		irApiUrl = irApiUrl + '/' + IR_SERVICE_ID_WATT
		print(irApiUrl)
		payload[data_sensor[0]] = data_str[0:10] # watt_hour
		payload[data_sensor[1]] = data_str[10:18] # watt
	print(payload)
	headers = {'Content-Type': 'application/json; charset=utf-8'}
	requests.post(irApiUrl, headers=headers, data=json.dumps(payload))
	

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883) # broker IP

client.loop_forever() #무한루프