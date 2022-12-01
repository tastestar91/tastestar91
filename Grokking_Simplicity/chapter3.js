//Part1

// 3. 액션과 계산 데이터의 차이를 알기

// - 문제에 대해 생각할 때
// 문제를 액션과 계산, 데이터로 나눠 코드 작성

// - 코딩할 때
// 함수형 프로그래머는 최대한 액션에서 계산을 빼려고 함
// 계산에서는 데이터를 분리할 수 있는지 생각
// 계산은 데이터가 될 수 있는지 고민

// - 코드를 읽을 때
// 액션과 계산, 데이터 중에 어떤 것에 속하는지 살펴봐야함

// (1) 확인

["냉장고확인", "운전해서 상점으로 가기", "필요한 것 구입하기", "운전해서 집으로 오기"][
  // - 냉장고 확인
  // 시점이 중요하기 때문에 액션, 냉장고에서 가지고 있는 제품은 데이터

  // - 운전해서 상점으로 가기
  // 액션

  // - 필요한 것 구입하기
  // 구입하는 일도 확실히 액션
  //=> 필요한 것 구입하기 나누기
  ("현재재고", "필요한재고", "재고뺴기", "장보기목록", "목록에 있는 것 구입하기")
];

// 데이터, 데이터, 계산, 데이터, 액션

// - 운전에서 집으로 오기

// (2) 마무리

// - 액션과 계산, 데이터는 어디에서나 적용할 수 있음

// - 액션 안에는 계산과 데이터, 또 다른 액션이 숨어 있을지도 모름

// - 계산은 더 작은 계산과 데이터를 나누고 연결할 수 있음

// - 데이터는 데이터만 조합할 수 있음

// - 계산은 떄로 '우리 머릿속에서' 일어남\

// (3) 새로 만드는 코드에 함수형 사고 적용하기

// A. 데이터베이스에서 구독자를 가져오는 것부터 시작
// 액션,
// 구독자를 데이터베이스에서 가져오면 사용자 목록을 얻을 수 있고 이는 데이터

// B. 데이터베이스에서 쿠폰 목록 가져오기
// 쿠폰 목록 가져오기, 액션 데이터베이스 계속 바꾸기 떄문
// 가져온 쿠폰 목록은 데이터

// C. 보내야 할 이메일 목록 만들기
// 이메일 목록 계획하기

// D. 이메일 전송하기

// E. 이메일 만드는 부분을 자세히 살펴보기

// G.쿠폰 보내는 과정 구현하기

// 자바스크립트에서 계산은 함수로 구현, 입력값은 함수 인자이고 출력값은 함수의 리턴값

// (4) 액션 다양

// 함수호출
// 메서드 호출
// 생성자
// 표현식
// 상태
