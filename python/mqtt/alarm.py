import paho.mqtt.client as mqtt
import json
# MQTT broker credentials
broker_address = "kwall4.kweather.co.kr"
broker_port = 38616
username = "mqttuser"
password = "zpdliot1!"


# Callback function for connection success
def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker")

# Callback function for connection loss
def on_disconnect(client, userdata, rc):
    print("Disconnected from MQTT broker")

# Callback function for publish success
def on_publish(client, userdata, mid):
    print("Message published")

def make_message():
    result = {"id":"kw-iske1","timestamp":1687419960,"deviceId":"IBOKW2200141","pm25":100}
    return result
# Create MQTT client instance
client = mqtt.Client()
client.username_pw_set(username, password)
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.connect(broker_address, broker_port)
client.loop_start()

# Publish a message
topic = "ingress-router/alarm"
message = json.dumps(make_message())

for i in range(0, 2):
    print(i)
    client.publish(topic, message)

# Disconnect from MQTT broker
client.disconnect()







