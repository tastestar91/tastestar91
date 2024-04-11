//Replace Derived Variable with Query

get discountedTotal() {
    return this._discountedTotal;
}
set discount(aNumber) {
    const old = this._discount;
    this._discount = aNumber;
    this._discountedTotal += old -aNumber;
}

// =>
get discountedTotal() { return this._baseTotal - this.discount }
set discount(aNumber) { this._discount = aNumber }

// 가변 데이터의 유효범위를 가능한 좁혀야함

// 변형 연산
// 1. 데이터 구졸르 감싸며 그 데이터에 기초하여 계산한 결과를 속성으로 제공하는 객체
// 2. 데이터 구조를 받아 다른 데이터 구조로 변환해서 변환하는 함수
// 소스 데이터가 가변이고 파생 데이터 구조의 수명을 관리해야하는 상황에서는 객체를 사용하는 편이 유리

// 절자
// 1. 변수 값이 갱신되는 지점을 모두 찾음, 필요하면 변수 쪼개기를 활ㄹ용해서 각 갱신 지점에서 변수를 분리
// 2. 해당 변수의 값을 계산해주는 함수를 만듬
// 3. 해당 변수가 사용되는 모든 곳에 assertion 을 추가하여 함수의 계산 결과가 변수의 값과 같은지 확인
// 4.  변수를 읽는 코드를 모두 함수 호출로 대체
// 5. 변수를 선언하고 갱신하는 코드를 죽은 코드 제거하기로 없앰

class ProductionPlan {
    get production() { return this._production}

    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment)
        this._production += anAdjustment.amount;
    }
}

// =>

class ProductionPlan2 {
    assert(this._production === this.calculateProduction)
    return this._production;

    get calculateProduction() {
        return this._adjustments
            .reduce((sum, a) => sum + a.mount, a)
    }
}

//
class ProductionPlan3 {
    
    get production() {
        return this._adjustments.reduce((sum, a) => sum + a.mount, 0)
    }
    applyAdjustment(anAdjustment) {

    }
}

// 소스가 둘 이상일 떄

class Production {
    constructor(production) {
        this._production = production;
        this._adjustments = []
    }
    get production() { return this._production }
    applyAdjustment(anAdjustment) {
        this._adjustments.push(anAdjustment)
        this._production += anAdjustment.amount
    }
}