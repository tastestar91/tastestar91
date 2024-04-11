// Split Variable

let temp = 2 * (heigth * width)
console.log(temp)
temp = heigth * width
console.log(tmep)
// =>

let perimeter = 2 * (heigth * width)
console.log(perimeter)
let area = heigth * width
console.log(area)

// 역할이 둘 이상인 변수는 쪼개야함, 예외는 없음

// 절차
// 1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꿉니다
// 2. 가능하면 이때 불변으로 선언합니다,
// 3. 이 변수에 두번쨰로 값을 대입하는 곳 앞까지의 모든 참조를 새로운 변 수 이름으로 바꿉니다.
// 4. 두 번째 대입 시 변수를 원래 이름으로 다시 선언

function distanceTravelled (scenario, test) {
    let result;
    let acc = scenario.primaryForce / scenario.mass  // 가속도 = 힘 / 질량
    let primaryTime = Math.min(time, scenario.delay)

    result = 0.5 * acc * primaryTime * primaryTime // 전파된 거리

    let secondaryTime = time - scenario.delay

    if (secondaryTime > 0) {
        let primaryVelocity = acc * scenario.delay ; // 두번쨰 값을 반영해 다시 계산
        acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime
    }
    return result
}

// acc에 값이 두번 대입, 역할이 두개라는 신호 => 쪼개야함

// 변수에 새로운 이름 짓고 => 선언시 const를 붙여 불변으로 바꿈 => 두 번째 대입전까지 모든 참조를 새로운 이름으로 바꿈 => 두번쨰 대입 변수 다시 선언
function distanceTravelled2 (scenario, test) {
    let result;
    let primaryAcceleration = scenario.primaryForce / scenario.mass  // 가속도 = 힘 / 질량
    let primaryTime = Math.min(time, scenario.delay)

    result = 0.5 * acc * primaryAcceleration * primaryTime * primaryTime // 전파된 거리

    let secondaryTime = time - scenario.delay

    if (secondaryTime > 0) {
        let primaryVelocity = primaryAcceleration * scenario.delay ; // 두번쨰 값을 반영해 다시 계산
        const secondaryAcceleration = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryAcceleration * secondaryTime * secondaryTime
    }
    return result
}

// 예시 : 입력 매개변수의 값을 수정할 때

function discount (inputValue, quantitiy) {
    if (inputValue > 50) {
        inputValue = inputValue -2
    }
    if (quantitiy > 100) {
        inputValue = inputValue -1
    }
    return inputValue
}

// 쪼개기
function discount2 (originInputValue, quantitiy) {
    let inputValue = originInputValue
    if (inputValue > 50) {
        inputValue = inputValue -2
    }
    if (quantitiy > 100) {
        inputValue = inputValue -1
    }
    return inputValue
}

// 변수 이름 바꾸기

function discount2 (originInputValue, quantitiy) {
    let result = originInputValue
    if (inputValue > 50) {
        result = result -2
    }
    if (quantitiy > 100) {
        result = result -1
    }
    return result
}

