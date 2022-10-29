// Push Down Method

class Employee {
    get quota {}
}

class Engineer extends Employee {}
class Salesperson extends Employee {}

// =>
class Employee {}
class Engineer extends Employee {}
class Salesperson extends Employee {
    get quota {}
}

// 특정 서브클래스 하나와만 관련된 메서드는 슈퍼클래스에서 제거하고 해당 서브클래스에 추가하는 편이 깔끔

//절차
// 대상 메서드를 모든 서브클래스에 복사
// 슈퍼클래스에서 그 메서드를 제거
// 이 메서드를 사용하지않는 모든 서브클래스 제거
