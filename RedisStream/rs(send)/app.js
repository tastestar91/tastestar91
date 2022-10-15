const Redis = require('ioredis')

const redisClient = new Redis()

const taskTest = [
    '데이터',
    '계속해서',
    '넣기',
]
async function main() {
    for (task of taskTest)
    await redisClient.xadd('test_stream', '*',
        'data', JSON.stringify(task))
    console.log('추가되었습니다')
}

setInterval(
    () => {
        main().catch(err => console.log(err))
    }, 1000 * 60
)



