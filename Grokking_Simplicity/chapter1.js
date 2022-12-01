// 1. 함수형 프로그래밍은 무엇인가

// - 수학 함수를 사용하고 부수 효과를 피하는 것이 특징인 프로그래밍 패러다임
// - 부수 효과 없이 순수 함수만 사용하는 프로그래밍 스타일


// * 부수 효과
// 리턴값 이외에 하는 모든 일을 말함, 전역 상태 수정하기

// * 순수함수 => 수학함수
// 인자에만 의존하고 부수 효과가 없는 함수,
// 인자에만 의존한다는 말은, 항상 같은 결과를 돌려준다는 말


// 2. 실용적 측면에서 함수형 프로그래밍의 문제점

// 문제1 : 부수효과는 필요
// 함수형 프로그래밍은 부수효과를 피해야 하지만, 부수 효과는 소프트웨어를 실행하는 이유

// 문제2 : 함수형 프로그래밍은 부수 효과를 잘 다룰 수 있음

// 문제3 : 함수형 프로그래밍은 실용적

// // 3. 액션과 계산, 데이터 구분하기

// (1) 액션
// 호출하는 횟수나 호출하는 시점이 중요한 함수
// 액션은 실행 시점이나 횟수 또는 둘 다에 의존

// - 시간이 지남에 따라 안전하게 상태를 바꿀 수 있는 방법
// - 순서를 보장하는 방법
// - 액션이 정확히 한 번만 실행하게 보장하는 방법

sendEmail(to, from, subject, body)
saveUserDB(user)
getCurrentTime()

// (2) 계산
// 계산이나 데이터는 둘 다 부르는 시점이나 횟수가 중요하지않지만, 계산을 실행가능

// 정확성을 위한 정적 분석
// 소프퉤어에서 쓸 수 있는 수학적 지식
sum(numbers)
string_length(str)

// (3) 데이터
// 이벤트에 대한 기록한 사실,
[1, 10, 2, 45, 3, 98]
let object = {
    "firstname" : "choi",
    "lastname" : "Normand"
}

// 효율적으로 접근하기 위해 데이터 구성하는 방법
// 데이터를 보관하는 기술
// 데이터를 이용해 중요한 것을 발견하는 원칙

// 함수형 프로그래머는 코드를 액션과 계산 데이터로 구분
// 함수형 프로그래머는 액션보다 계산을 좋아하고 계산보다 데이터를 좋아함

// 3. 함수형 프로그래머는 액션과 계산, 데이터를 구분

// 1단계 : 사용자가 작업 완료 표시를 함
// UI이벤트 실행 횟수에 의존하기 떄문에 액션

// 2단계 : 클라이언트가 서버로 메세지를 보냄
// 메세지를 보내는 것도 액션, 메세지 자체는 데이터

// 3단계 : 서버가 메세지를 받음
// 메세지를 받는 것은 횟수에 의존하므로 액션

// 4단계 : 서버가 데이터베이스를 변경
// 내부 상태를 바꾸는 것은 액션

// 5단계 : 서버가 누구에게 알림을 보낼지 결정
// 결정하는 것은 계산, 입력 값이 같다면 서버는 항상 같은 결정을 내림

// 6단계 : 서버가 이메일로 알림을 보냄
// 이메일로 보내기는 액션



