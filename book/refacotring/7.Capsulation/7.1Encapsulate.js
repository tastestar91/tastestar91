// 중첩된 코드 캡슐


// 1. 변수 캡슐화
// 2. 전체 데이터 구조를 표현하는 클래스를 정의

class CustomerData {
    constructor (data) {
        this._data = data;

    }
}

function getCustomerData() { return customerData }
function getRawDataOfCustomer () { return customerData._data; }
function setRawDataOfCustomer (arg) { return customerData = new CustomerData(arg);}

// 쓰기
setUsage(customerId, year, month, amount);

function setUsage(customerId, year, month, amount) {
    getRawDataOfCustomer()[customerId].usage[year][month] = amount;
}

// => 함수 옮기기
getCustomerData().setUsage(customerId, year, month, amount);
setUsage(customerId, year, month, amount) {
    this._data[customerId].usage[year][month] = amount
}


// 읽는 코드를 모두 독립함수로 추출한 다음 고객 데이터 클래스로 옮김

usage(customerId, year, month) {
    return this._data[customerId].usage[year][month]
}