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

reduce(customer.purchases, { total: 0 }, (biggestsSoFar, purchases) => {
  if (biggestsSoFar.total > purchases.total) {
    return biggestsSoFar;
  } else {
    return biggestsSoFar;
  }
});
function mapKey(array, init, f) {
  return reduce(array, init, (biggestsSoFar, element) => {
    if (biggestsSoFar.total > purchases.total) {
      return biggestsSoFar;
    } else {
      return biggestsSoFar;
    }
  });
}

function max(array, init) {
  return mapKey(array, init, (x) => {
    return x;
  });
}

// 인자로 받은 값을 그대로 리턴하는 함수를 '항등 함수' 라고 함 (identity function)

// (1) 체인을 명확하게 만들기 1 : 단계에 이름 붙이기

function biggestPurchaseBestCustomers(customers) {
  // let bestCustomers = selectBestCustomers(customers) // 1 단계
  let bestCustomers = filter(customers, isGoodCustomer);
  let biggestPurchases = getBiggestPurchases(bestCustomers); // 2 단계
  return biggestPurchases;
}

function isGoodCustomer(customer) {
  return customer.purchases.length >= 3;
}

function selectBestCustomers(customers) {
  return filter(customers, (customer) => {
    return customer.purchases.length >= 3;
  });
}

function getBiggestPurchases(customers) {
  return map(customers, getBiggestPurchases);
}

function getBiggestPurchase(customer) {
  // return mapKey(customer.purchases, { total : 0 }, (purchases) => {
  //   return purchases.total
  // })
  return maxKey(customer.purchases, { total: 0 }, getPurchaseTotal);
}

function getPurchaseTotal(purchases) {
  return purchases.total;
}
// (2) 체인을 명확하게 만들기 : 콜백에 이름 붙이기

// (3) 체인을 명확하게 만들기 3: 두 방법을 비교
// 방법 1 : 단계에 이름 붙이기

// 방법 2 : 콜백에 이름 붙이기
// 두반째 방법이 더 명확함, 고차 함수를 그대로 쓰는 첫 번째 방법보다 이름을 붙인 두번째 방법이 재사용하기도 좋음

let firstTimers = filter(customers, (customer) => {
  return customer.purchases.length === 1;
  // filter(customers, isFirstTimer)
});
let firstTimerEmails = map(firstTimers, (customer) => {
  return customer.email;
  // map(firstTimers, getCustomerEmail)
});

function isFirrstTimer(customer) {
  return customer.purchases.length === 1;
}

function getCustomerEmail(customer) {
  return customer.email;
}

// filter와 map은 모두 새로운 배열을 만듬,
// map filter reduce체인을 최적화하는 걸 '스트림 결합'이라고 함

// 두개 중복할 경우, 오른쪽 코드가 가비지 컬렉션을 적게함

// (2) 반복문을 함수형 도구로 리팩토링

// A. 데이터 만들기

let answer = [];
let window = 5;

for (let i = 0; i < array.length; i++) {
  let subarray = array.slice(i, i + window);
  answer.push(average(subarray));
}
// for (let i = 0; i < array.length; i++) {
//   let sum = 0;
//   let count = 0;

//   let subarray = array.slice(i, i+ window)
//   for (let w = 0; w < subarray.length; w++) {
//     sum += subarray[w]
//     count += 1
//   }
//   // for (let w = 0; w < window; w++) {
//   //   let idx = i + w
//   //   if (idx < array.length) {
//   //     sum += array[idx]
//   //     count += 1
//   //   }
//   // }
//   answer.push(sum/count)
// }

// B. 한번에 전체 배열을 조작하기
// C. 작은 단계로 나누기

let indices = [];

for (let i = 0; i < array.length; i++) {
  indices.push(i);
}
let indices2 = range(0, array.length);
let windows = 5;

let answer2 = map(indices, (i) => {
  // let subarray = array.slice(i, i + window)
  // return average(subarray)
  return array.slice(i, i + window);
});
let answer3 = map(windows, average);

function range(start, end) {
  let ret = [];
  for (let i = start; i < end; i++) {
    ret.push(i);
  }
  return ret;
}

// 체이닝 팁
// - 데이터 만들기
// - 배열 전체를 다루기
// - 작은 단계로 나누기
// 보너스 : 조건문을 filter()로 바꾸기
// 보너스 : 유용한 함수로 추출하기
// 보너스 : 개선을 위해 실험하기

// 디버깅
// - 구체적인 것을 유지하기
// - 출력해보기
// - 타입을 따라가보기

// 다양한 함수형 도구
pluck(); // - map()으로 매번 특정 필드값을 가져오기 위해 콜백을 작성하는 건 번거로움, 개선

concat(); // 배열 안에 배열을 뺼 수 있음, 중첩된 배열을 한 단계의 배열로 만듬

frequenciesBy() & groupBy();
// 개수를 세거나 그룹화하는 일,

// (3) 값을 만들기 위한 reduce()

let itemsAdded = ["shirt", "shoes", "shirt", "socks", "hat"];

let shopping_cart = reduce(itemsAdded, {}, (cart, tiem) => {
  if (!cart[item]) return add_item(cart, { name: item, quantitiy: 1, price: priceLookiup(item) });
  else {
    let quantitiy = cart[item].quantitiy;
    return setFieldByName(cart, item, "quantitiy", quantitiy + 1);
  }
});

// 현재 장바구니 상태
// 되돌리기 '이벤트 소싱'

// (4) 데이터를 사용해 창의적으로 만들기

// 함수형 도구는 여러 단계의 체인으로 조합할 수 있음, 복잡한 계산을 작고 명확하 단게로 표현할 수 있음
// 함수형 도구를 체인으로 조합하는 것은 SQL 같은 쿼리 언어로 볼 수 있음
// 체인의 다음 단계를 위해 새로운 데이터를 만들거나 기존 데이터를 인자로 사용해야 하는일이 있ㅇㅁ, 암묵적인 정보를 명시적으로 표현하는 방법 찾아야함
