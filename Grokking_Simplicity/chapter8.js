// 7. 신뢰할 수 없는 코드를 쓰면서 불변성 지키기

// (1) 레거시 코드와 불변성

// 레거시 코드 : 오래전에 만든 것으로, 지금 당장 고칠 수 없어서 그대로 사용해야 하는 코드를 말함
function add_item_to_cart(name, price) {
  let item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);
  let total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);

  // // let cart_copy = deepCopy(shopping_cart)
  // shopping_cart = deepCopy(cart_copy)
  // black_friday_promotion(shopping_cart) // 이 코드는 장바구니 값을 바꿈
  shopping_cart = black_friday_promotion_safe(shopping_cart);
}
function black_friday_promotion_safe(cart) {
  let cart_copy = deepCopy(cart);
  black_friday_promotion(cart_copy);
  return deepCopy(cart_copy);
}

// 방어적 복사
// A. 원본이 바뀌는 걸 막아줌
// 깊은 복사를 한 데이터를 안전지대에서 내보냄

// (2) 방어적 복사 구현하기

// 방어적 복사를 ㅏㅅ용하면 데이터가 바뀌는 것을 막아서 불변성을 지킬 수 있음

// A. 데이터가 안전한 코드에서 나갈 때 복사하기
// - 불변성 데이터를 위한 깊은 복사본을 만듬
// - 신뢰할 수 없는 코드로 복사본을 전달

// B. 안전한 코드로 데이터가 들어올 떄 복사하기
// - 변경될 수 있는 데이터가 들어오면 바로 깊은 복사본을 만들어 안전한 코드로 전달
// - 복사본을 안전한 코드에서 사용

// (3) 카피-온-라이트와 방어적 복사

// A. 카피-온-라이트
// - 통제할 수 없는 데이터를 바꿀 때 카피-온-라이트를 씀
// 얕은 방식

// B.방어적 복사
// - 신뢰할수 없는 코드와 데이터를 주고받아야할 때 방어적 복사를 씀
// 깊은 복사
