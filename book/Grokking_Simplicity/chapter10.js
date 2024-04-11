// 10. 일급 함수

// 리팩터링 : 암묵적 인자를 드러내기
// - 함수 이름에 있는 암묵적 인자를 확인
// - 명시적인 인자를 추가
// - 함수 본문에 하드 코딩된 값을 새로운 인자로 바꿈
// - 함수를 호출하는 곳을 고침

// 리팩터링 : 함수 본문을 콜백으로 바꾸기
// - 함수 본문에서 바꿀 부분의 앞부분과 뒷부분을 확인
// - 리팩터링 할 코드를 함수로 빼냄
// - 빼낸 함수의 인자로 넘길 부분을 또 다른 함수로 뺴냄

// => 함수 이름에 있는 암묵적 인자
// - 함수 구현이 거의 똑같음
// - 함수 이름이 구현의 차이를 만듬

// (1) 리팩터링 : 암묵적 인자 들어내기

function setFieldByName(cart, name, field, value) {
  if (!validItemFields.includes(field)) {
    throw "Not a valid item field";
  }
  if (translations.hasOwnProperty(field)) {
    field = translations[field];
  }
  // function setPriceByName(cart, name, price) {
  let item = cart[name];
  // let newItem = objectSet(item, 'price', 13)
  let newItem = objectSet(item, field, value);
  let newCart = objectSet(cart, name, newItem);
  // let newCart = objectSet(cart, name, newItme)
  return newCart;
}

function objectSet(object, key, value) {
  let copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}
// A. 일급인 것과 일급이 아닌 것을 구별하기

// 일급이 아닌 것 : 수식 연산자, 반복문, 조건문, try/catch 블록
// 일급인 것 : 변수에 할당, 함수의 인자로 넘기기, 함수의 리턴값으로 받기, 배열이나 객체에 담기

// 필드명이 일급이라는 말은 객체나 배열에 담을 수 있다는 뜻

// B. 객체와 배열을 너무 많이 쓰게 됨

// 데이터 지향 : 이벤트와 엔티티에 대한 사실을 표현하기 위해 일반 데이터 구조를 사용하는 프로그래밍 형식
// 제한된 api로 정의하면 데이터를 제대로 활용할 수 없음,

// (2) 리팩터링 : 콜백으로 바꾸기

// 고차함수 : 인자를 함수로 받거나 리턴 값으로 함수를 리턴할 수 있는 함수를 말함

function cookAndEatFoods() {
  for (let i = 0; i < foods.length; i++) {
    let food = foods[i];
    cook(food);
    eat(food);
  }
}

function cleanDishes() {
  for (let i = 0; i < dishes.length; i++) {
    let dish = dishes[i];
    wasy(dish);
    dry(dish);
    putAway(dish);
  }
}

function operateOnArray(array, f) {
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    f(item);
  }
}

function clean(dish) {
  wash(dish);
  dry(dish);
  putAway(dish);
}

function forEach(array, f) {
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    f(item);
  }
}

// forEach는  배열 전체를 순회할 수 있는 완전한 반복문, 반복문을 다시 만들 필요없음
// 고차함수 함수를 인자로 받음

// (3) 리팩터링 : 함수 본문을 콜백으로 바꾸기

// - 본문과 본문의 앞부분과 뒷부분을 구현합니다
// - 전체를 함수로 빼냅니다
// - 본문 부분을 빼낸 함수의 인자로 전달한 함수로 바꿈

// 콜백 = 핸들러 함수

function withLogging() {
  try {
    f();
  } catch (error) {
    logToSnapErros(error);
  }
}

withLogging(() => {
  saveUserData(user);
});
// 인라인 함수 : 쓰는 곳에서 바로 정의하는 함수

// - 전역으로 정의
function global() {}

// - 지역으로 정의
const local = () => {};
// - 인라인으로 정의
// = 익명 함수라고도 함
inline(() => {});
