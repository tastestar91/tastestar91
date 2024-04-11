import paho.mqtt.client as mqtt
import random
import time


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("connected OK")
    else:
        print("Bad connection Returned code=", rc)

def on_message(client, userdata, msg):
    print('데이터들어왔습니다')
    print(msg, 'message입니다')

def on_subscribe(client, userdata, mid, granted_qos):
    print("subscribed: " + str(mid) + " " + str(granted_qos))
    print(client, 'client')
    print(userdata, 'userData')

 
mqtt = mqtt.Client()      # MQTT Client 오브젝트 생성
mqtt.connect("localhost", 1883)    # MQTT 서버에 연결
mqtt.on_connect = on_connect
mqtt.on_message = on_message
mqtt.on_subscribe = on_subscribe

mqtt.subscribe('kwv-arc/req/*')

mqtt.loop_forever()

