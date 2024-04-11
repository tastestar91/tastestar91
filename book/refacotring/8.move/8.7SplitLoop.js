// 반복문 쪼개기

let averageAge = 0;
let totalSalary = 0;

for (const p of people) {
    averageAge += p.age;
    totalSalary += p.salary
}

averageAge = averageAge / people.length

//=>
let totalSalary = 0
for (const p of people) {
    totalSalary += p.salary
}

let averageAge = 0
for (const p of people) {
    averageAge += p.age
}

averageAge = averageAge / people.length

// 반복문을 복제해 두 개로 만든다
// 반복문이 중복되어 생기는 부수효과를 파악해서 제거
// 완료되었다면 각 반복문을 함수로 추출할지 고민

let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people ) {
    if (p.age < youngest) {
        youngest = p.age;
    }
    totalSalary += p.salary
} 
return '최연소, 총 급여'

// 1. 반복문 쪼개기

let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people ) {
    if (p.age < youngest) {
        // youngest = p.age;
        totalSalary += p.salary
    }
    for (const p of people) {
        if (p.age < youngest) {
            youngest = p.age;
            // totalSalary += p.salary
        }
    }
    return '최연소, 총 그벼'
}

// 2. 반복문을 복제했으면 잘못된 결과를 초래할 수 있는 중복을 제거,
// 부수효과가 없는 코드라면 박복문 안에 그대로 둬도 되지만, 지금은 없음


// 반복문 쪼개기 + 함수 추출 + 알고리즘 교체하기