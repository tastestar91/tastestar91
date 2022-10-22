// 6.8 매개변수 객체 만들기

// 데이터 뭉치를 구조화하는데 시작은 매개변수 객체 만들기
// - 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만듭니다
// 	=> 개인적으로 클래스, 동작까지 함께 묶을 수 있기 때문에
// - 테스트
// - 함수 선언 바꾸기로 새 데이터 구조를 매개변수로 추가한다
// - 테스트
// - 함수 호출 시 새로우 ㄴ데이터 구조 인스턴스를 넘기도록 수정합니다.
// - 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꿉니다
// - 다 바꿨다면 기존 매개변수를 제거하고 테스트합니다.



const station = {
  name : '281',
  readings: [
    {temp : 47, tiem : '2016-11-10 09:10'},
    {temp : 53, tiem : '2016-11-10 09:10'},
    {temp : 58, tiem : '2016-11-10 09:10'},
    {temp : 53, tiem : '2016-11-10 09:10'},
    {temp : 51, tiem : '2016-11-10 09:10'},
  ]
}


function readingsOutsidRange(station, min, max, range) {
  return station.readings
  .filter(r => r.temp < min || r.temp > max);
}

alerts = readingsOutsidRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCelling, null) //최저 최고 온도


// 범위 라는 개념은 객체 하나로 묶어 표현하는 게 나은 대표적인 예

class NumberRange {
  constructor (min, max) {
    this._data = { min : min, max : max}
  }
  get min() { return this._data.min}
  get max() { return this._data.max}
}
// 새로 생성한 객체로 동짝까지 옮기는 더 큰 작업의 첫 단계로 수행될 떄가 많기 떄문

const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCelling)

alerts = readingsOutsidRange(station, range)