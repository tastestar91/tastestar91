// 6. 함수형 프로그래밍 Functional Programming

// 함수형 프로그래밍은 상태나 가변 변수를 허용하지 않음
// 함수 전달 Function passing
// 필터와 파이프 Filters and pipes
// 어큐뮬레이터 Accumulators
// 메모이제이션 Memoization
// 불변성 Immutability
// 지연 인스턴스 생성 Lazy instantiation

// (1) 함수 전달

// 준비 상태 변화를 처리하는 보일러 플레이트 사용, boiler plate

let HamiltonianTour = (() => {
    function HamiltonianTour(options) {
        this.options = options
    }
    HamiltonianTour.prototype.StartTour = () => {
        if (this.options.onTourStart&&typeof (this.options.onTourStart) === 'function') {
            this.options.onTourStart()
            this.VisitAttractin("King's Landing")
            this.VisitAttractin('Winterfell')
        }
        if (this.options.onTourCompletion&& typeof (this.options.onTourCompletion) === 'function') {
            this.options.onTourCompletion()
        }
    }
    HamiltonianTour.prototype.VisitAttractin = (AttractionName) => {

    }
})

//  (2) 필터와 파이프

// 파이프 '-' 문자로 표시 
// 각 배열이 구성원에 대해 일치하는지 검토하고, 그 결과를 반환하는 함수를 제공

Array.prototype.where = function (inclusionTest) {
    let results = [];
    for (let i = 0; i < this.length; i++) {
        if (inclusionTest(this[i])) {
            results.push(this[i])
        }
    }
    return results
}


// 원래의 객체를 변경하지않고 원본 객체의 수정된 버전을 리턴하는 방법, 플루언트 인터페이스 fluent interface

// (3) 어큐뮬레티어 accumulator
// 집합을 반복하여 하나의 결과를 만들어냄

TaxCollector.prototype.collect = (items, value, projection) => {
    if (items.length > 1) {
        return projection(items[0] + this.collect(items.slice(1), value, projection))
    }
    return projection(items[0])
}


// (3) 메모이제이션

// 함수에서 계산된 이진 값들을 저장하는데 사용하는 특정한 용어
//많은 메모리가 필요

// 다음 호출이 동일한 매개변수로 진행될 때

// (4) 불변성 
// 변수가 단지 한 번만 할당될 수 있다는 것
// (5) 지연 인스턴스 생성
// 지연인스턴스 생성, 지연 초기화

let Bakery = (() => {
    function Bakery() {
        this.requiredBreads = [];
    }
    Bakery.prototype.orderBreadType = (breadType) => {
        this.requiredBreads.push(breadType)
    }
})

Bakery.prototype.pickUpBread = (breadType) =>  {
    if (!this.breads) {
        this.createBreads()
    }
    for (let i = 0; i < this.breads.length; i++) {
        if (this.breads[i].breadType == breadType) {
            return this.breads[i]
        }
    }
    Bakery.prototype.createBreads = () => {}
    this.breads = []
    for (let i = 0; i < this.requiredBreads.length; i++) {
        this.breads.push(new Bread(this.requireBreads[i]))
    }
}

// 지연 생성은 사용하지 않는 고가의 객체를 생성하는데 소비되는 상당한 시간을 절약시켜줌

// (6) 힌트와 팁

