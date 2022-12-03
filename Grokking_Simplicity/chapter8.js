// 8. 계층형 설계

// 소프트웨어 설계 : 코드를 만들고 테스트하고, 유지보수하기 쉬운 프로그래밍 방법을 선택하기 위해 미적 감각을 사용하는 것

// 계층형 설계 : 소프트웨어를 계층으로 구성하는 기술, 계층에 있는 함수는 바로 아래 계층에 있는 함수를 이용해 정의
// 컴퓨터 프로그램의 구조와 해석

//계층형 설계 감각을 키우기 위한 입력

// 함수 본문 : 길이, 복잡성, 구체화 단계, 함수 호출, 프로그래밍 언어 기능 사용
// 계층 구조 : 화살표 길이, 응집도, 구체화 단게
// 함수 시그니처 : 함수명, 인자 이름, 인잣값, 리턴 값

// 조직화 : 새로운 함수를 어디에 놓을지 결정, 함수를 다른 곳으로 이동
// 구현 : 구현 바꾸기, 함수 추출하기, 데이터 구조 바꾸기
// 변경 : 새 코드를 작성할 곳 선택하기, 적절한 수준의 구체화 단계 결정하기

// (1) 계층형 설계 패턴
// 패턴1 : 직접 구현

// A. 장바구니가 해야 할 동작

function freeTieClip(cart) {
  // let hasTie = false
  // let hasTieClip = false

  // for (let i = 0; i < cart.length; i++) {
  //   let item = cart[i]
  //   if (item.name === "tie") {
  //     hasTie = true
  //   }
  //   if (item.name === "tie clip") {
  //     hasTieClip = true
  //   }
  // }
  // if (hasTie && !hasTieClip) {
  //   let tieClip = make_item("tie clip", 0)
  //   return add_item(cart, tieClip)
  // }
  // return cart
  let hasTie = isInCart(cart, "tie");
  let hasTieClip = isInCart(cart, "tie clip");
  if (hasTie && !hasTieClip) {
    let tieClip = make_itme("tie clip", 0);
    return add_item(cart, tieClip);
  }
  return cart;
}
// =>
function isInCart(cart, name) {
  for (let i = 0; i < cart.length; i++) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        return true;
      }
    }
  }
  return false;
}

// B. 호출 그래프를 만들어 함수 호출을 시각화하기
// 함수에서 사용하는 다른 함수와 언어 긴으을 호출 그래프

// C. 줌 레벨
// - 계층 사이의 상호 관계
// - 특정 계층의 구현
// - 특정 함수의 구현

// 줌 레벨 : 전역, 계층, 함수
// 장바구니 비즈니스 규칙, 일반적인 비즈니스 규칙, 장바구니 기본동작, 제품에 관한 기본동작, 카피-온-라이트 동작, 자바스크립트 언어기능

// 직접 구현 패턴 리뷰
// - 직접 구현한 코드는 한 단계의 구체화 수준에 관한 문제만 해결
// - 계층형 설계는 특정 구체화 단계에 집중할 수 있게 도와줌
// - 호출 그래프는 구체화 단계에 대한 풍부한 단서를 보여줌
// - 함수를 추출하면 더 일반적인 함수로 만들 수 있음
// - 일반적인 함수가 많을수록 재사용하기 좋음
// - 복잡성을 감추지않음

// 패턴2 : 추상화 벽

// 패턴3 : 작은 인터페이스

// 패턴4: 편리한 계층
