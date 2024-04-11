// 여러 함수 클래스로 묶기

// 절차
// 함수들이 공유하는 공통 데이터 레코드를 캡슐화합니다.
// => 공통 데이터가 레코드 구조로 묶여있지 않다면 먼저 매개변수 객체 만들기로 데이터를 하나로 묶는 레코드를 만듭니다.
// 콩통 레코드를 사용하는 함수 각각을 새 클래스로 옮깁니다
// => 공통 레코드의 멤버는 함수 호출몬의 인수 목록에서 제거합니다.
// 데이터를 조작하는 로직들은 함수로 추출해서 새 클래스로 옮깁니다.


const reading = { customer : 'ivan', quantitiy : 10, month: 5, year : 2017}

const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantitiy

const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.yaer) * aReading.quantitiy);
const taxableCharge = Math.max(0, base - thaxThreshold(aReading.year))


const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year)
} // 기본 요금 계산 함수


// 레코드를 클래스로 변환
class Reading {
  constructor (data) {
    this._customer = data.customer,
    this._quantitiy = data.quantitiy,
    this._month = data.month,
    this._year = data.year
  }
  get customer() { return this._customer }
  get quantitiy() { return this._quantitiy }
  get month() { return this._month }
  get year() { return this._year}
}

// calculateBaseCharge() 변환 새클래스 사용하려면 데이터를 얻자마자 객체로 만들어야함

const rawReading = acquireReading( );
const aReading = new Reading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);

get baseCharge() {
  return baseRate(this.month, this.year) * this.quantitiy;
}

const rawReading = acquireReading()
const aReading = new Reading(rawReading)
const basicChargeAmount = aReading.baseCharge;







