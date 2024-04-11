// 5. 더 좋은 액션 만들기

function gets_fress_shipping(cart) {
  return calc_total(cart) >= 20;
}

function calc_total(cart) {
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i]
    total += item.price
  }
  return total
}

function make_cart_item(name, price) {
  return {
    name : name,
    price : price
  }
} // 생성자 함수를 만듬

function update_shipping_icons(cart) {
  let buttons = get_buy_buttons_dom();

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i]
    let item = button.item

    // if (get_free_shipping(shopping_cart_total, itme.price)) {
    //   button.shopping_cart_total()
    // }
    // else {
    //   button.hide_free_shipping_icon()
    // }
    let new_cart = add_itme(cart, make_cart_item(name, price))
    if (gets_fress_shipping(new_cart)) {
      button.shopping_cart_total()
    }
    else {
      button.hide_free_shipping_icon()
    }
  }
}

// 암묵적 입력과 출력은 적을 수록 좋음!
function add_item_to_cart(name, price) { // 구매하기
  let item = make_cart_item(name, price)
  shopping_cart = add_item(shopping_cart, item)
  
  let total = calc_total(shopping_cart)
  set_cart_total_dom(total)
  update_shipping_icons(shopping_cart)
  update_tax_dom(total)
}

function set_cart_total_dom(total) {
  total
}

function update_tax_dom(total) {
  set_tax_dom(calc_total(total))
}



// '=================='

function add_item(cart, item) {
  // let new_cart = cart.slice()
  // // new_cart.push({
  // //   name : name,
  // //   price : price
  // // })
  // new_cart.push(item)
  // return new_cart
  return add_element_last(cart, item)
}

function add_element_last(array, elem) {
  let new_array = array.slice()
  new_array.push(elem)
  return new_array
}
// 재사용 할 수 있는 유틸리티 함수

function calc_tax (amount) {
  return amount * 0.10
}

// (1) 설계는 엉켜있는 코드를 푸는 것

// 재사용, 유지보수, 테스트

// 계산을 유틸리티, 장바구니, 비즈니스 규칙으로 나눔, 설계 기술을 미리 보여주기 위해서

// 암묵적 입력과 출력은 인자와 리턴 값으로 바꿔 없애는게 좋음

// 설계는 엉켜있는 것을 푸는 것, 풀려있는 건 다시 합칠 수 있음
// 개념을 중심으로 쉽게 구현할 수있음

