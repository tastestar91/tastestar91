//반복문을 파이프라인으로 바꾸기
const name = []
for (const i of input) {
    if (i.job === 'programmer') {
        names.push(i.name)
    }
}

//=>
const names = input
.filter(i => i.jon === 'programmer')
.map(i => i.name)

// 1. 반복문을 사용하는 컬렉션을 가리키는 변수를 하나 만듬 => 기존 변수를 단순히 복사
// 2. 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 적절한 컬렉션 파이프라인 연산으로 대체
// 이때 컬렉션 파이프라인 연산은 1 반복문 컬렉션 변수에서 ㅅ작하며, 이넞 ㄴ연ㅅㄴ의 결과를 기초로 연쇄적으로 수행
// 3. 반복문의 모든 동작을 대체했다면 반복문 자체를 지움

function acquireData(input) {
    const lines = input.split("\n")
    // let firstLine = true;
    const result = []
    const loopItems = lines.slice(1).filter(line => line.trim() !=="").map(line => line.split(","))
    .filter(record => record[1].trim() === "india")
    .map(record => ({city : record[0].trim(), phone: record[2].trim()}))
    // for (const line of loopItems) {
    //     // if (firstLine) {
    //     //     firstLine = false;
    //     //     continue;
    //     // }
    //     // if (line.trim() === "") continue;
    //     const record = line//.split(",")
    //     // if (recordp[1].trim()) {
    //     //     result.push({city : record[0].trim(), phone: record[2].trim()})
    //     // }
    // }
    return result
}


// 반복문에서 사용하는 컬렉션을 가리키는 별도 변수를 새로 만드는 것

// 이 코드의 반복문에서 첫 if 문은 csv 데이터의 첫 줄을 건너뛰는 역할, 
// 다음 비눚ㄹ 지우기 이건 => filter