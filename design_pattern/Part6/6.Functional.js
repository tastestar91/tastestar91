// 7. 모델 뷰 패턴


// (1) MVC 패턴
// 대화형 사용자 인터페이스 생성에 사용되는 패턴

// 누드 객체 패턴은 전형적인 mvc 패턴의 변형

// (2) MVP 패턴
// Model View Pressenter

// Presenter와 View는 1대1로 매핑, // 모든 통신은 presenter를 통해 이루어짐
// 모델이 없기 떄문에 공용세터와 게터 메소드의 수가 증가함
// 프레젠터가 뷰의 상태를 업데이트 할 수 있도록 해줌

// (3) MVVM 패턴
// Model View ViewModel

// 컨트롤러와 프레젠터의 역할 이제 뷰모델이 함
// 하나의 뷰느느 여러 개의 뷰모델을 가질 수가 있음

// 더티 체킹 