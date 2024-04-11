// 4. 액션에서 계산 빼내기

function update_shipping_icons() {
  let buy_buttons = get_buy_buttons_dom(); //A

  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.items;

    if (item.price + shopping_car_total >= 20) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}
// 재사용하려면 전역 변수에 의존하지않아야함
// DOM을 사용할 수 있는 곳에서 실행된다고 가정하면 안됨
// 함수가 결괏값을 리턴해야함

// 액션과 계산 데이터를 구분하기

let shopping_cart = []; //A
let shopping_cart_total = 0; //A

function add_item_to_cart(name, price) {
  let shopping_cart = add_item(shopping_cart, name, price);
  cal_cart_total();
}
// =>
function add_item(cart, name, price) {
  let new_cart = cart.slice();
  new_cart.push({
    name: name,
    price: price,
  });
  return new_cart;
}
// 어떤 값을 바꿀 때, 그 값을 복사해서 바꾸는 방법은 불변성을 구현하는 방법 중 하나
// 카피-온 라이트라고함

function cal_cart_total() {
  //A
  // shopping_car_total = 0;
  // for (let i = 0; i < shopping_cart.length; i++) {
  //     let item = shopping_cart[i]
  //     shopping_car_total += item.price;
  // }
  shopping_car_total = calc_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function calc_total(cart) {
  // => 서브 루틴 추출하기 extract subroutine
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price;
  }
  return total;
}

function update_tax_dom() {
  //A
  set_tax_dom(calc_tax(shopping_cart_total));
}
// =>
function calc_tax(amount) {
  return amout * 0.1;
}

// (1) 함수에는 입력과 출력이 있음
// 명시적 출력과 암시적 출력
// 함수에서 암묵적 입력과 출력을 없애면 계산이 됨
// 암묵적 입력은 함수의 인자로 바꾸고, 출력은 함수의 리턴값으로 바꾸면 됨

// (2) 액션에서 또 다른 계산 뺴내기

// 계산 추출하기
// 코드를 선택하고 빼냅니다
// 암묵적 입력과 출력을 찾습니다.
// 입력은 인자로 바꾸고 출력은 리턴값으로 바꿉니다

// 액션은 암묵적인 입력 또는 출력을 가지고 있음
// 계산의 정의에 따르면 계산은 암묵적인 입력이나 출력이 없어야함
// 공유변수는 일반적으로 암묵적 입력 또는 출력이 됨
// 암묵적 입력은 인자로 바꿀 수 있음
// 암묵적 출력은 리턴값으로 바꿀 수 있음
// 함수형 원칙을 적용하면 액션은 줄어들고 계산은 늘어남
