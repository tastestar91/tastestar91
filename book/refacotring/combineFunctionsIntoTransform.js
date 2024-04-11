// 여러 함수를 변환함수로 묶기

// 원본 데이터를 입력받아서 필요한 정보를 모두 도출한 뒤에, 가각 출력 데이터의 필드에 넣어서 반환하는 걸 변환함수

// // 절차
// 변환할 레코드를 입력받아서 값을 그대로 반환하는 변환 함수를 만든다
// 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함수로 옮기고, 처리 결과를 레코드에 새 필드로 기록합니다. 클라이언트 코드가 이 필드를 사용하도록 수정
// 테스트
// 나머지 관련 함수도 위 과정에 따라 처리합니다.

function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result                                                                                                      )
  return result
}