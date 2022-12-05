// 11. 일급함수

// 함수 이름에 있는 암묵적 인자
// => 리팩터링 : 암묵적 인자를 드러내기
// => 리팩터링 : 함수 본문을 콜백으로 바꾸기

// 리팩터링
// - 표준화된 원칙
// - 새로운 동작에 원칙 적용
// - 여러 개를 변경할 때 최적화

function push(array, elem) {
  // let copy = array.slice()
  // copy.push(elem)
  // return copy
  return withArrayCopy(array, (copy) => {
    copy.push(elem)
  })
}
function drop_last(array) {
  let array_copy = array.slice()
  array_copy.pop()
  return array_copy
}

function drop_last(array) {
  let array_copy = array.slice()
  array_copy.shift()
  return array_copy
}



function withObjectCopy(object, modify) {
  let copy = Object.assign({}, object)
  copy[key] = value
  return copy
}

function withObjectCopy(object, modify) {
  let copy = Object.assign({}, object)
  modify(copy)
  return copy
}

function objectSet(object, key, value) {
  return withObjectCopy(object, (copy) => {
    copy[key] = value
  })
}


function tryCatch(f, errorHandler) {
  try {
    return f()
  }
  catch(error) {
    return errorHandler(error)
  }
}


// (1) 함수를 리턴하는 함수
// - 어떤 부분에 로그를 남기는 것을 깜빡할 수 있음
// - 모든 코드에 수동으로 withLogging() 함수를 적용해야함

// 함수 본문을 콜백으로 바꾸기
// 함수를 리턴하는 함수는 팩토리 함수와 같음

// - 고차 함수로 패턴이나 원칙을 코드로 만들 수 있음
// - 고차 함수로 리턴하는 함수를 만들 수 있음
// - 고차 함수르르 사용하면서 잃는 것도 있음, 많은 중복 코드를 없애주지만 기독성을 해칠 수도 있음
