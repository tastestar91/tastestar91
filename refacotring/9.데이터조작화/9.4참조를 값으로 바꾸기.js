class Product {
    applyDiscount(arg) { this._price.amount -= arg}
}
// =>
class Product {
    applyDiscount(arg) { 
        this._price = new Money(this._price.amount - arg, this._price.currency)
    }
}

// 내부 객체는 그대로 둔채, 그 객체의 속성만을 갱신하며
// 값으로 다루는 경우에는 새로운 속성을 담는 객체로 기존 내부 객체를 통쨰로 대체

// 필드를 값으로 다룬다면 내부 객체의 클래스를 수정하여 값 객체로 만들 수 있음

// 절차
// 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 확인
// 각각의 세터를 하나씩 제거
// 이 값 객체의 필드들을 사용하는 동치성 비교 메서드를 만듬

class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber()
    }
    get officeAreaCode() { return this._telephoneNumber.areaCode}
    set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg}
    get officeNumber() { return this._telephoneNumber.number};
    set officeNumber(arg) { return this._telephoneNumber.number = arg}
}

class TelephoneNumber {
        get areaCode() { return this._areacCode};
        set areaCode(arg) { this._areacCode = arg}
        get number() { return this._number}
        set number(arg) { this._number = arg}
}

// 1. 전화번호를 불면 
// 2. 필드들의 세터들만 제거


class TelephoneNumber2 {
    constructor (areaCode, number) {
        this._areacCode = areaCode;
        this._number = number
    }
    get areaCode() { return this._areacCode};
    set areaCode(arg) { this._areacCode = arg}
    get number() { return this._number}
    set number(arg) { this._number = arg}
}

class Person2 {
    constructor() {
        this._telephoneNumber = new TelephoneNumber()
    }
    get officeAreaCode() { return this._telephoneNumber.areaCode}
    set officeAreaCode(arg) { this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber)
    }
    get officeNumber() { return this._telephoneNumber.number};
    set officeNumber(arg) { this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg)}
}

equals 메서드를 직접 작성해야함