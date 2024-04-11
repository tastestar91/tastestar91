// 15. 타임라인 격리하기

// 타임라인 다이어그램

function add_item_to_cart(name, price, quantitiy) {
  cart = add_item(cart, name, price, quantitiy)
  calc_cart_total()
}

function calc_cart_total() {
  total = 0
  cost_ajax(cart, (cost) => {
    total += cost
    shipping_ajax(cart, (shipping) => {
      total += shipping
      update_total_dom(total)
    })
  })
}

// (1) 두 가지 타임라인 다이어그램 기본 규칙

// A. 두 액션이 순서대로 나타나면 같은 타임라인에 넣음


// B. 두 액션이 동시에 실행되거나 순서를 예상할 수 없다면 분리된 타임라인테 넣음

// - 액션은 순서대로 실행되거나 동시에 실행
// - 순서대로 실행되는 액션은 같은 타임라인에서 하나가 끝나면 다른 하나가 실행
// - 동시에 실행되는 액션은 여러 타임라인에서 나란히 실행


// (2) add-to-cart 타임라인 그리기: 단계 1


// (3) 좋은 타임라인의 원칙
// - 타임라인은 적을수록 이해하기 쉽습니다
// - 타임라인은 짧을수록 이해하기 쉽습니다
// - 공유하는 자원이 적을수록 이해하기 쉽습니다
// - 자원을 공유한다면 서로 조율해야 합니다
// - 시간을 일급으로 다룹니다.


// (4) 타임라인 단순화

// - 하나의 타임라인에 있는 모든 액션을 하나로 통합
// - 타임라인이 끝나는 곳에서 새로운 타임라인이 하나만 생긴다면 통합