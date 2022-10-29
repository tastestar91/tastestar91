// Change Value to Reference

let customer = new Customer(customerData);

let customer2 = customerRepository.get(customerData.id)

// 값으로 다룬다면 고객 데이터가 각 주문에 복사
// 참조로 다룬다면 여러 주문이 단 하나의 데이터 구조를 참조하게 됨

// 복제된 데이터를 모두 참조로 바꿔주는게 좋음, 갱신된 내용이 고객의 주문 모두에 반영되기 떄문

// 값을 참조로 바꾸면 엔티티 하나당 객체도 단 하나만 존재, 각 엔티티를 표현하는 객체를 한번만 만들고
// 객체가 필요한 곳에서 이 저장소로 얻어쓰는 방식이됨

// 절차ㅣ
// 1. 같은 부류에 속하는 객체들을 보관할 저장소를 만듬
// 2. 생성자에서 이 부류의 객체들 중 특정 객체를 정확히 찾아내는 방법이 있는 지 확인
// 3. 호스트 객체의 생성자들을 수정하여 필요한 객체를 저장소에서 찾도록 함

// 예시
class Order {
    constructor(data) {
        this._number = data.number
        this._customer = new Customer(data.customer)
    }
    get customer() { return this._customer}
}

class Customer {
    constructor(id) {
        this._id = id
    }
}

// 물리적으로 똑같은 고객 객체를 사용하고 싶다면 유일한 객체를 저장해둘 곳이 있어야함
// 저장소 객체 사용

let _repositoryData;
export function initialize() {
    _repositoryData = {};
    _repositoryData.customers = new Map()
}

export function registerCustomer(id) {
    if (!_repositoryData.customers.has(id)) {
        _repositoryData.customers.set(id, new Customer(id))
        return findCustomer(id)
    }
}


export function findCustomer(id) {
    return _repositoryData.customers.get(id)
}

// 고객 객체를 ID와 함께 등록할 수 있으며, ID 하나당 오직 하나의 고객 객체가 생성됨을보장

class Order3 {
    constructor(data) {
        this._number = data.number
        this._customer = registerCustomer(data.customer)
    }
    get customer() { return this._customer}
}

