// 필드 옮기기

class Customer {
    get plan() { return this._plan };
    get discountRate() { return this._discountRate}
}

// =>
class Customer2 {
    get plan() { return this._plan }
    get discountRate() { return this.plan.discountRate}
}

// 저라
// 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화
// 2. 타깃 객체에 필드를 생성
// 3. 정적 검사 수행
// 4. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인
// => 기존 필드나 타깃 객체를 넘겨주는게 있을지 모름, 없다면 이런 기능의 메서드를 쉽게 만들 수 있는 지 살펴봄
// 5. 접근자들이 타깃 필드를 사용하도록 수정
// 6. 소스 필드를 제거

class Customer {
    constructor (name, discountRate) {
        this._name = name
        // this._discountRate = discountRate
        this._setDscountRate(discountRate)
        this._contract = new CustomerContract(dateToday())
    }

    get discountRate() { return this._contract.discountRate}
    _setDscountRate(aNumber) { this._contract.discountRate = aNumber;}
    becomePreferred() { 
        //this._discountRate += 0.03
        this._setDscountRate(this.discountRate + 0.03)
    }
    applyDiscount(amount) { return amount.subtract(amount.multyply(this._discountRate))}
}

class CustomerContract {
    constructor(startDate) {
        this._startDate = startDate
        this._discountRate = discountRate
    }
    get discountRate() { return this._discountRate}
    set discountRate(arg) { this._discountRate = arg}
}

// discountRaate 를 customer => customerContract로
// 1. 캡슐화하기

// 예시:; 공유 객체로 이동하기

class Accout {
    constructor (number, type, interestRate) {
        this._number = number;
        this._type = type;
        assert(interestRate === this._type.interestRate)
        this._interestRate = interestRate;
    }
    get interestRate() { return this._interestRate}
}

class AccountType {
    constructor(nameString, interestRate) {
        this._name = nameString
        this._interest = interestRate
    }
    get interestRate() { return this._interestRate}
}

// 이자율 필드는 이미 캡슐화 => 