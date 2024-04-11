const Redis = require('ioredis')


const redisClient = new Redis()

async function main () {
  await redisClient.xgroup('CREATE', 'test_stream', 'test_group', '$', "MKSTREAM") 
  // group 을 생성합니다.
  .catch(() => { console.log('group already exists')})

  const [[, records]] = await redisClient.xreadgroup( //구조 분해 할당
    'GROUP', 'test_group', 'data', 'STREAMS', 'test_stream', '0'
  )
    // 현재 소비자가 처리해야할 모든 보류중인 레코드를 읽음
    // 그런다음 읽고 싶은 읽고 싶은 스트림을 지정
  console.log(records) // 
 // group  key : value   // consumer
  while (true) {
    const [[, records]] = await redisClient.xreadgroup(
      'GROUP', 'test_group', 'data', 'BLOCK', '0', 'COUNT', '1', 'STREAMS', 'test_stream', '>'
    )
      // 실제 스트림에서 새로운 레코드에 대한 읽기를 시작
      // GROUP workers_group consumerName 읽기 작업에 사용할 소비자 그룹을 지정
      // 0 은 무기한 대기
    for (const [recordId, [, rawTask]] of records) {
      console.log(recordId, rawTask)
      await processAndAck(recordId, rawTask)
    }
  }
}

async function processAndAck( recordId) {
    await redisClient.xack('test_stream', 'wtest_group', recordId) // 데이터가 확실히 처리됐는지 확인
    .then(data => console.log(data))
}

main().catch(err => console.log(err))