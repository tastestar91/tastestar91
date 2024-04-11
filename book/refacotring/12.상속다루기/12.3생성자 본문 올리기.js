//Pull up Constructor Body

class Party {}

class Employee extends Party {
    constructor (name, id, monthlyCost) {
        super();
        this._id = id
        this._name = name
        this._monthlyCost = monthlyCost
    }
}

// =>
class Party {
    constructor (name) {
        this._name = name
    }
}

class Employee extends Party {
    constructor (name, id, monthlyCost) {
        super (name)
        this._id = id;
        this._monthlyCost = monthlyCost
    }
}

// 서브 클래스들이 기능이 같은  메서드를 발견하면 함수 추출하기와 메서드 올리기를 차례로 적용 슈퍼클래스에 올림

// 절차
// 1. 슈퍼클래스에 생성자가 없다면 하나 정의, 서브클래스의 생성자들에서 이 생성자가 호출되는지 확인
// 2. 문장 슬라이드하기로 공통 문장 모두를 super() 호출 직후로 옮김
// 3. 공통 코드를 슈퍼클래스에 추가하고 서브클래스들에서는 제거, 생성자 매개변수 중 공통 코드에 서 참조하는 ㄱ밧들을 모두 super()로 건넴
// 4. 생성자 시작 부분으로 옮길 수 없는 코드에는 함수 추출하기와 메서드 올리기를 차례로 적용

// 예시 공통 코드가 나중에 나올 때

class Employee {
    constructor (name) { }
    get isPrivileged() { }
    assignCar() { }
}

class Manager extends Employee {
    constructor (name, grade) {
        super(name)
        this._grade = grade
        if (this.isPrivileged) {
            this.assignCar() // 모든 서브클래스가 수행
        }
    }
}
// =>

class Manger {
    constructor (name, grade) {
        super(name)
        this._grade = grade;
        this.finishConstruction()
    }
    finishConstruction() {
        if (this.isPrivileged) this.assignCar()
    }
}

class Employee {
    finishConstruction() {
    if (this.isPrivileged) this.assignCar()
    {}
}
// 추출한 메서드를 슈퍼클래스로 옮김