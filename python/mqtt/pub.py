import paho.mqtt.client as mqtt
import random
import time

mqtt = mqtt.Client()      # MQTT Client 오브젝트 생성
mqtt.connect("kiot.kweather.co.kr", 38616)    # MQTT 서버에 연결
#mqtt.connect("localhost", 1883)

def stat_vent_message() :
    ch1 = str(random.randrange(0, 2)).zfill(2)
    ch2 = str(random.randrange(1, 7)).zfill(2)
    ch3 = str(random.randrange(0, 2)).zfill(2)
    ch4 = str(random.randrange(0, 2)).zfill(2)
    ch5 = str(random.randrange(0, 4)).zfill(2)
    ch6 = str(random.randrange(0, 2)).zfill(2)
    command = f'STAT{ch1}{ch2}{ch3}{ch4}{ch5}{ch6}' # 2, 2, 2, 2, 2, 2
    checksum=hex(sum(command.encode('ascii')) % 256)   #보기) 0xdc, 0x46, 0x49, 0xaf,...
    message = command+checksum[-1].upper()
    return message

def stat_aircon_message() :
    ch1 = str(random.randrange(0, 2)).zfill(2)
    ch2 = str(random.randrange(0, 4)).zfill(2)
    ch3 = str(random.randrange(0, 4)).zfill(2)
    ch4 = str(random.randrange(0, 2)).zfill(2)
    ch5 = str(random.randrange(24, 26)).zfill(5)
    ch6 = str(random.randrange(18, 26)).zfill(5)
    command = f'STAT{ch1}{ch2}{ch3}00{ch5}{ch6}' # 2, 2, 2, 2, 5, 5
    checksum=hex(sum(command.encode('ascii')) % 256)   #보기) 0xdc, 0x46, 0x49, 0xaf,...
    message = command+checksum[-1].upper()
    return message

def stat_clean_message() :
    print('데이터')
    ch1 = str(random.randrange(0, 1)).zfill(2)
    ch2 = str(random.randrange(0, 1)).zfill(2)
    ch3 = str(random.randrange(18, 26)).zfill(5)
    ch4 = str(random.randrange(30, 60)).zfill(3)
    ch5 = str(random.randrange(00, 18)).zfill(2)
    ch6 = str(random.randrange(00, 18)).zfill(2)
    command = f'STAT{ch1}{ch2}{ch3}{ch4}{ch5}{ch6}' # 2, 2, 2, 2, 5, 5
    checksum=hex(sum(command.encode('ascii')) % 256)   #보기) 0xdc, 0x46, 0x49, 0xaf,...
    message = command+checksum[-1].upper()
    return message

def data_message() :
    ch1 = str(random.randrange(0, 280000)).zfill(10)
    ch2 = str(random.randrange(0, 200)).zfill(8)
    command = f'DATA{ch1}{ch2}' # 2, 2, 2, 2, 5, 5
    checksum=hex(sum(command.encode('ascii')) % 256)   #보기) 0xdc, 0x46, 0x49, 0xaf,...
    message = command+checksum[-1].upper()+'='
    return message

while mqtt.loop() == 0:
    
#     mqtt.publish("beems-aircon/ack/SAM-CON_2200001", stat_aircon_message())
#     mqtt.publish("beems-aircon/ack/SAM-CON_2200001", data_message())
#     mqtt.publish("beems-aircon/ack/SAM-CON_2200002", stat_aircon_message())
#     mqtt.publish("beems-aircon/ack/SAM-CON_2200002", data_message())

    mqtt.publish("damper/ack/CAR-CLN_2200001", stat_clean_message())
    # mqtt.publish("beems-cleaner/ack/CAR-CLN_2200001", data_message())
    # mqtt.publish("beems-cleaner/ack/CAR-CLN_2200002", stat_clean_message())
    # mqtt.publish("beems-cleaner/ack/CAR-CLN_2200002", data_message())

    # mqtt.publish("beems-vent/ack/KWB-ST1_2200001", stat_vent_message())
    # mqtt.publish("beems-vent/ack/KWB-ST1_2200001", data_message())
    # mqtt.publish("beems-vent/ack/KWB-ST1_2200002", stat_vent_message())
    # mqtt.publish("beems-vent/ack/KWB-ST1_2200002", data_message())
    
    #mqtt.publish("beems-cleaner/ack/CAR-CLN_2200003", stat_clean_message())

    time.sleep(60)

