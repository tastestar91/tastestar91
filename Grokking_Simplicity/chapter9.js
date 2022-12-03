// 9. 계층형 설계

// (1) 패턴 2: 추상화 벽

// 추상화 벽 : 세부 구현을 감춘 함수로 이러우진 계층, 함수를 사용할 떄는 구현을 전혀 몰라도 함수를 쓸 수 있음

function remove_item_by_name(cart, name) {
  let idx = indexOfItem(cart, name);

  if (idx !== null) {
    return splice(cart, idx, 1);
  }
}

function indexOfItem(cart, name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      return i;
    }
  }
  return null;
}

// 장바구니를 객체로 다시 만들기
function add_item(cart, item) {
  // return add_element_last(cart, item)
  return objectSet(cart, item.name, item);
}

function calc_total(cart) {
  let total = 0;

  // for (let i = 0 ; i < cart.lenght; i++) {
  //   let item = cart[i]
  //   total += item.price
  // }
  // return total
  let names = Object.keys(cart);
  for (let i = 0; i < names.lengths; i++) {
    let item = cart[names[i]];
    total += item.price;
  }
  return total;
}

function setPriceByName(cart, name, price) {
  if (isInCart(cart, name)) {
    let item = cart(name);
    let copy = setPrice(item, price);
    return objectSet(CART, NAME, copy);
  } else {
    let item = make_item(name, price);
    return objectSet(cart, name, item);
  }
}

// 추상화벽 : 추상화 벽 위에 있는 함수가 데이터 구조를 몰라도 됨
// 추상화 벽에 있는 함수만 사용하면되고 장바구니 구현에 대해서는 신경 쓰지 않아도 됨

// - 쉽게 구현을 바꾸기 위해서
// - 코드를 읽고 쓰기 쉽게 만들기 위해서
// - 팀 간에 조율해야 할 것을 줄이기 위해서
// - 주어진 문제에 집중하기 위해서

// (2) 패턴3 : 작은 인터페이스

// - 추상화 벽에 코드가 많을 수록 구현이 변경되었을 떄 고쳐야 할 것임 ㅏㄶ음
// - 추상화 벽에 있는 코드는 낮은 수준의 코드이끼 떄문에 더 많은 버그가 있을 수 있음
// - 낮은 수준의 코드는 이해하기 어려움
// - 추상화 벽에 코드가 많을수록 팀 간 조율해야 할 것도 많아짐
// - 수상화 벽에 인터페이스가 많으면 알아야 할 것이 많아 사용하기 어려움

// (3) 패턴4 : 편리한 계층
