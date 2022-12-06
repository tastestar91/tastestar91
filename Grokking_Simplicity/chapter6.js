// 6. 변경 가능한 데이터 구조를 가진 언어에서 불변성 유지하기

// 쓰기 동작은 불변성 원칙에 따라 구현해야함
// 불변성 원칙 => 카피 - 온 - 라이트 copy-on-write

// 카피-온-라이트 원칙 세 단계

// 1.복사본 만들기
// 2.복사본 변경하기(원하는 만큼)
// 3.복사본 리턴하기

function add_element_last(array, elem) {
  let new_array = array.slice() //복사본 만들기
  new_array.push(elem) // 복사본 변경
  return new_array // 복사본 리턴
}

// copy-on-write로 쓰기를 일기로 바꾸기

function remove_item_by_name(cart, name) {
  let new_cart = cart.slice()
  let idx = null;

  for (let i = 0 ; i < cart.length; i++) {
    if (cart[i].name === name) {
      idx = i
    }
  }
  if (idx !== null) {
    return removeItems(cart, idx, 1)
  // for (let i = 0; i < cart.length; i++) {
  //   if (cart[i].name === name) {
  //     idx = i
  //   }
  //   if (idx !== null) {
  //     cart.splice(idx, 1) // 배열에서 항목을 삭제하는 메서드
  //   }
  // }
  }
  return cart
}


function delete_handler(name) {
  // remove_item_by_name(shopping_cart, name) // 전역 변수 변경
  let total = calc_total(shopping_cart)
  set_cart_total_dom(total)
  update_shipping_icons(shopping_cart)
  update_tax_dom(total)

  shopping_cart = remove_item_by_name(shopping_cart, name)
}

function removeItems(array, idx, count) {
  let copy = array.slice()
  copy.splice(idx, count)
  return copy
}



let mailing_list = []

function add_contact(email) {
  let new_mailing_list = mailing_list.slice()
  new_mailing_list.push(email)
  // mailing_list.push(email)
  return new_mailing_list
}

function submit_form_handler(event) {
  let form = event.target
  let email = form.elements["email"].value;
  mailing_list = add_contact(mailing_list, email)
}



// (2) 읽기와 쓰기 동작 같이
// - 읽기와 쓰기 함수로 각각 분리
// - 함수에서 값을 두 개 리턴

// A. 읽기와 쓰기 동작으로 분리하기

function first_element(array) {
  return array[0]
}
// 쓰기 동작을 카피 - 온 - 라이트로 바꾸기

function drop_fisrt(array) {
  array.shift()
  // => 
  let array_copy = array.slice()
  array_copy.shift()
  return array_copy
}


function shift(array) {
  return array.shift()
  // =>
  let array_copy = array.slice()
  let first = array_copy.shift()
  return {
    first : first, 
    array : array_copy
  }

  return {
    first : first_element(array),
    array : drop_fisrt(array)
  }
}


// (3) 불변 데이터 구조를 읽는 것은 계산입니다.

// - 변경 간으한 데이터를 읽는 것은 액션
// - 쓰기는 데이터를 변경 가능한 구조로 만듬
// - 어떤 데이터에 쓰기가 없다면 데이터는 변경 불가능한 데이터
// - 불변 데이터 구조를 읽는 것은 계산 ( 불변형으로 만들었다면 데이터에 모든 읽기는 계산 )
// - 쓰기를 읽기로 바꾸면 코드에 계산이 많아집니다 ( 액션이 줄어듬 )

// 불변 데이터 구조

// 언제든 최적화 할 수 있음
// 가비지 콜렉터는 매우 빠름
// 많이 복사하지 않음
// 함수형 프로그래밍 언어네느 빠른 구현체가 있음

function setPrice(item, new_price) {
  item.price = new_price
  // =>
  let item_copy = Object.assign({}, item)
  item_copy.price = new_price
  return item_copy
}

// 두 개의 중첩된 데이터 구조가 어떤 참조를 공유한다면 '구조적 공유'임
// 데이터가 바뀌지않는 불변 데이터 구조라면 구조적 공유는 안전, 구조적 공유는 메모리를 적게 사용하고, 모든 것을 복사하는 것보다 빠름



// (4) 중첩된 쓰기를 읽기로 바꾸기

function setPriceByName(cart, name, price) {
  let cartCopy = cart.slice();

  for (let i = 0; i < cartCopy.length; i++) {
    if (cartCopy[i].name === name ) {
      cartCopy[i] = setPrice(cartCopy[i], price)
    } 
    return cartCopy
  }
  // for (let i = 0; i < cart.length; i++) {
  //   if (cart[i].name === name) {
  //     cart[i].price = price
  //   }
  // }
}

// 중첩 데이터 : 데이터 구조 안에 데이터 구조가 있는 걸 말함, 안쪽 데이터와 최상위 데이터라는 용어를 사용
// 얕은 복사 : 중첩 데이터에서 최상위 데이터 구조만 복사
// 구조적 공유 : 두 중첩된 데이터 구조에서 안쪽 데이터가 같은 데이터를 참조

// 보일러플레이트 코드를 줄이기 위해 기본적인 배열과 객체 동작에 대한 카피-온-라이트 버전을 만들어 두는 것이 좋음
// 보일러 플레이트 코드는 여러 곳에서 비슷한 코드가 반복되는 걸 말함

