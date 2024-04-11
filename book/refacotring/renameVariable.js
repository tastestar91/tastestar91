// 6.7 변수 이름 바꾸기



// #### 절차
// - 폭넓게 쓰이는 변수라면 변수 캡슐화 하기를 고려합니다.
// - 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경합니다.

let tpHd = 'untitled'
result += `<h1>${tpHd}</h1>`
tpHd = obj['articleTitle']

// => 변수 캡슐화하기로 바꾸기
function title (){
  return tpHd;
}
function setTile(arg) {
  tpHd = arg
}

// 상수 이름 바꾸기

const companyName = '애크미 구스베리';
const cpyNm = companyName