import redis
import json

def send_message_to_channel():
    try:
        # 레디스 클라이언트 생성
        redis_client = redis.StrictRedis(host='localhost', port=6379)

        ir_data = {
            'service' : {
                'id' : 'kw-aws-min1',
                'deviceId' : '1111051500'
            }
        }
        # 채널로 메시지 발행(Publish)
        redis_client.publish('ingress-router/v1/sensors.delete:', json.dumps(ir_data))
        print('뭘까')
    except Exception as e:
        print("오류:", e)

if __name__ == "__main__":
    send_message_to_channel()