// 14. 중첩된 데이터에 함수형 도구 사용하기

function incrementField(item, field) {
  // // let value = item('quantitiy')
  // let value = item(field)
  // // let newQuantitiy = quantitiy +1
  // let newValue = value +1
  // // let newItem = objectSet(item, 'quantitiy')
  // let newItem = objectSet(item, field, newValue)
  // return newItem
  return updateField(item, field, (value) => {
    return value + 1;
  });
}

function decrementField(item, field) {
  let value = item(field);
  let newValue = value - 1;
  let newItem = objectSet(item, field, newValue);
  return newItem;
}

// 리팩터링 동작 이름을 명시적인 인자로 바꿈

function updateField(item, field, modify) {
  let value = item(field);
  let newValue = modify(value);
  let newItem = objectSet(item, field, modify);
  return newItem;
}

// 리팩터링 : 조회하고 변경하고 설정하는 걸 update()로 교체하기

// 조회
// 바꾸기
// 설정

// (1) 중첩된 update

// 조회하고 변경하고 설정하는 걸 찾음
// 바꾸는 동작을 콜백으로 전달해서 update()로 교체

function incrementField2(item) {
  return updateField(item, field, (options) => {
    return updateField(options, "size", incrementField);
  });
}

// 함수 이름에 있는 암묵적 인자를 확인
// 명시적인 인자를 추가
// 함수 본문에 하드 코딩된 값을 새로운 인자로 바꿈
// 함수를 호출하는 곳을 고칩니다

function incrementSize(item) {
  return update2(item, "options", "size", (size) => {
    return size + 1;
  });
}

// w중첩에서는 재귀
