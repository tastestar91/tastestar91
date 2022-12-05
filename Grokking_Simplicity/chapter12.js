// 12. 함수형 본문

function emailsForCustomers(customers, goods, bests) {
  // let emails = []
  // forEach(customers, (customer) => {
  //   let email = emailsForCustomers(customer, goods, bests)
  //   emails.push(email)
  // })
  // // for (let i = 0; i < customers.length; i++) {
  // //   let customer = customers[i]
  // //   let email = emailsForCustomers(customer, goods, bests)
  // //   emails.push(email)
  // // }
  // return emails
  return map(customers, (customer) => {
    return emailsForCustomer(customer, goods, bests)
  })
}

function map(array, f) {
  let newArray = []
  forEach(array, (element) => {
    newArray.push(element)
  })
  return newArray
}

//reduce로 할 수 있는 것
// 실행 취소/ 실행 복귀
// 테스트할 때 사용자 입력을 다시 실행하기
// 시간 옇애 디버깅
// 회계 감사 추적