//Replcae Magic Literal

function potentialEnergy(mass, heigth) {
    return mass * 9.81 * heigth
}
// =>
const STANDARD_GRAVITY = 9.81;
function potentialEnergy(mass, heigth) {
    return mass * STANDARD_GRAVITY * heigth
}

// 상수를 선언하고 매직 티러럴을 대입
// 해당 리터럴이 사용되는 곳을 모두 찾음
// 찾은 곳 각각에서 리터럴이 새상수와 똑같은 의미로 쓰였는지 확인
// 같은 상수라면 대체한 후 테스트
