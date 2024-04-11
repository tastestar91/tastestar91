// //Pull up Method

// class Employee {

// }
// class Salesperson extends Employee {
//     get name() {}
// }

// class Engineer extends Employee {
//     get name() {}
// }

// // =>
// class Employee {
//     get name() {}
// }

// class Salesperson extends Employee {}
// class Engineer extends Employee {}


// // 서로 다른 두 클래스의 두 메서드를 각각 매개변수화하면 궁극적으로 같은 메서드
// // 각각의 함수를 매개변수화한 다음 메서드를 상속 계층의 위로 올리면됨

// // 절차
// // 1. 똑같이 동작하는 메서드인지 면밀히 살펴봄
// // 2. 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서도 호출하고 참조할 수 있는지 확인
// // 3. 메서드 시그니처가 다르다면 함수 선언 바꾸기로 슈퍼클래스에서 사용하고 싶은 형태로 통일
// // 4. 슈퍼클래스에 새로운 메서드를 생성하고, 대상 메서드의 코드를 복사해 넣습니다.
// // 5. 정적 검사를 수행
// // 6. 서브클래스 중 하나의 메서드를 제거
// // 7. 테스트
// // 8. 모든 서브클래스의 메서드가 없어질 때까지 다른 서브클래스의 메서드를 하나씩 제거

class Employee {
    get annualCost() {
        return this.monthlyCost * 12;
    }
}

class Department {
    get totalAnnualCost() {
        return this.monthlyCost * 12
    }
}

// 선언 바꾸기로 두 메서드의 이름 통일
// 서브 클래스중 하나의 메서드를 복사해 슈퍼클래스에 붙여넣음
