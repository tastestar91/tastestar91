// 13. 함수형 도구 체이닝

// function biggestPurchaseBestCustomers (customers) {
//   let bestCustomers = filter(customers, function(customer) {
//     return customer.purchases.length >= 3
//   })
//   let biggestPurchases = map(bestCustomers, (customer) => {
//     return reduce(customer.reduce, {total : 0}, (biggestsSoFar, purchases) => {
//       if (biggestsSoFar.total > purchases.total) {
//         return biggestsSoFar
//       }
//       else {
//         return purchases
//       }
//     })
//   })
//   return biggestPurchases
// }

reduce(customer.purchases, { total : 0}, (biggestsSoFar, purchases) => {
  if (biggestsSoFar.total > purchases.total) {
    return biggestsSoFar
  }
  else {
    return biggestsSoFar
  }
})
function mapKey(array, init, f) {
  return reduce(array, init, (biggestsSoFar, element) => {
    if (biggestsSoFar.total > purchases.total) {
      return biggestsSoFar
    }
    else {
      return biggestsSoFar
    } 
  })
}

function max(array, init) {
  return mapKey(array, init, (x) => {
    return x
  })
}

// 인자로 받은 값을 그대로 리턴하는 함수를 '항등 함수' 라고 함 (identity function)

// (1) 체인을 명확하게 만들기 1 : 단계에 이름 붙이기

function biggestPurchaseBestCustomers (customers) {
  // let bestCustomers = selectBestCustomers(customers) // 1 단계
  let bestCustomers = filter(customers, isGoodCustomer)
  let biggestPurchases = getBiggestPurchases(bestCustomers) // 2 단계
  return biggestPurchases
}

function isGoodCustomer(customer) {
  return customer.purchases.length >= 3
}

function selectBestCustomers(customers) {
  return filter(customers, (customer) => {
    return customer.purchases.length >= 3
  })
}

function getBiggestPurchases(customers) {
  return map(customers, getBiggestPurchases)
}

function getBiggestPurchase(customer) {
  // return mapKey(customer.purchases, { total : 0 }, (purchases) => {
  //   return purchases.total
  // })
  return maxKey(customer.purchases, { total : 0}, getPurchaseTotal)
}

function getPurchaseTotal(purchases) {
  return purchases.total
}
// (2) 체인을 명확하게 만들기 : 콜백에 이름 붙이기

// (3) 체인을 명확하게 만들기 3: 두 방법을 비교
// 방법 1 : 단계에 이름 붙이기

// 방법 2 : 콜백에 이름 붙이기
// 두반째 방법이 더 명확함, 고차 함수를 그대로 쓰는 첫 번째 방법보다 이름을 붙인 두번째 방법이 재사용하기도 좋음

let firstTimers = filter(customers, (customer) => {
  return customer.purchases.length === 1
  // filter(customers, isFirstTimer)
})
let firstTimerEmails = map(firstTimers, (customer) => {
  return customer.email
  // map(firstTimers, getCustomerEmail)
})

function isFirrstTimer(customer) {
  return customer.purchases.length === 1
}

function getCustomerEmail(customer) {
  return customer.email
}

// filter와 map은 모두 새로운 배열을 만듬, 
// map filter reduce체인을 최적화하는 걸 '스트림 결합'이라고 함

// 두개 중복할 경우, 오른쪽 코드가 가비지 컬렉션을 적게함
