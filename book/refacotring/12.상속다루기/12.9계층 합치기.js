//Replace Type Code with Subclasses

function createEmployee(name, type) {
    return new Employee(name, type)
}

// =>

function createEmployee(name, type) {
    switch (type) {
        case 'engineer' : return new Engineer(name);
        case 'salesperson' : return new Salesperson(name)
        case "manager": return new Manager(name)
    }
}

// 서브 클래스 조건에 따라 다르게 동작하는 다형성을 제공
// 서브 클래스 방식이 관계를 명확히 드러내줌

// 타입 코드 필드를 자가 캡슐화
// 타입 코드 값 하나를 선택하여 그 값에 해당하는 서브 클래스를 만듬 타입 게터 메서드르 ㄹ오버라이드, 해당 타입 코드의 리터럴 값을 반환하게함
// 매개변수로 받은 타입 코드와 방금 만든 서브클래스를 매핑하는 선택 로직을 만듬
// 타입코드 값 각각에 대해 서브클래스 생성과 선택 로직 추가를 반복,
// 타입 코드 필드르 ㄹ제거
// 타입 코드 접근자를 이용하느 ㄴ메서드 모두에 메서드 내리기와 조건부 로직을 다형성으로 바꾸기를 적용

// 예시 : 직접 상속

class Employee {
    constructo( name, type ) {
        this.validateType(type);
        this._name = name
        this._type = type
    }
    validateType(arg) {
        if (!["engineer", "manager", "salesperson"].includes(arg)) {
            throw new Error()
        }
        toString()
        return 
    }
}

// 1. 타입 코드를 자가 캡슐화함
// 2. 타입 코드 중 하나, 엔지니어를 선택  직접 상속방식으로 구현할 것
// 직원 클래스 자체를 서브클래싱, 타입코드 게터 오버라이드하여 적절한 리터럴 값을 반환하기만 하면 되므로 아주 간단하게 처리


class Engineer extends Employee {
    get type() { return "engineer"}
}

// 생성자를 팩토리 함수로 바꿔서 선택, 로직을 담을 별도 장소 마련해야함
function createEmployee(name, type) {
    switch (type) {
        case "engineer" : return new Engineer(name, type)
    } 
    //  return new Employee(name, type)
}


class Salesperson extends Employee {
    get type() { return 'salesPerson'}
}

class Mangeer extends Employee {
    get type() { return 'manager'}
}

function createEmployee(name, type) {
    switch (type) {
        case "engineer" : return new Engineer (name, type)
        case "salesPerson" : return new Salesperson(name, type)
        case "manger" : return new Manger(name, type)
    }
    return new Employee(name, type)
}
// 모든 유형에 적용했다면 타입 코드 필드와 슈퍼클래스의 게터를 제거

class Employee {
    constructor (name, type) {
        this.validateType(type);
        this._name = name;
        // this._type = type 
    }
    // get type() { return this._type}
    toString() {    
     return ''
    }
}

// 예시 간접 상속할 떄
class Employee {
    constructo( name, type ) {
        this.validateType(type);
        this._name = name
        this._type = type
    }
    validateType(arg) {
        if (!["engineer", "manager", "salesperson"].includes(arg)) {
            throw new Error()
        }
        toString()
        return 
    }
    get type() { return this._type}
    set type(arg) { this._type = arg}

    get capitalizedType() {
        return this._type.charAt(0).toUpperCase()
    }
    toString() {
        return ''
    }
}

// 