
var amqp = require('amqplib/callback_api');

const url = 'amqp://mqttuser:zpdliot1!@localhost:5672';
const queueName = 'queueTest';

amqp.connect(url, function(error, connect){
    if(error){
        console.log(error);
        return;
    }
    connect.createChannel(function(error, channel){
        if(error){
            console.log(error);
            return;
        }
        channel.assertQueue(queueName, {durable: true}, function(error){
            let sendData = {
                type : 'message',
                message : 'test message!'
            };
            channel.sendToQueue(queueName, encode(sendData), {
                persistent: true
            });
        });
    });
});

function encode(doc) {  
    return Buffer.from(JSON.stringify(doc));
}