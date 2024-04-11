const { createServer } = require('http');
const Redis = require('ioredis');
const staticHandler = require('serve-handler')
const ws = require('ws')


const redisClient = new Redis()
const redisClientXRead = new Redis()

const server = createServer((req, res) => {
  return staticHandler(req, res, {public : 'www'})
})

const wss = new ws.Server({ server })

wss.on('connection', async client => {
  
  client.on('message', msg => {
    redisClient.xadd('chat_stream', `${msg}`)
  })

  const logs = await redisClient.xrange('chat_stream')

  for (const [, [, message]] of logs) {
    client.send(message)
  }
})

function broadcast (msg) {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg)
    }
  }
}

let lastRecordId = '$'

async function processStreamMessages() {
  while (true) {
    const [[, records]] = await redisClientXRead.xread('BLOCK', '0', 'STREAMS', 'chat_stream', lastRecordId)
    for (const [record, [, message]] of records) {
      BroadcastChannel(message)
      lastRecordId = recordId
    }
  }
}

processStreamMessages().catch(err => console.log(err))

server.listen(8000)