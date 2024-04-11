// 17. 타임라인 조율하기

// 액션을 확인하기
// 모든 액션을 그리기
// 단순화하기

// 1 cost_ajax 응답의 크기가 커서 다운로드하는데 시간이 오래 걸림
// 2 배송 api 서버보다 cost_ajax를 처리하는 서버가 더 바쁨
// 3 이동중이 ㄴ차 안에서 핸드폰으로 cost_ajax요청을 보냈지만, 기지국이 바뀌는 동안 지연이 생김

// 코드에 cut 적용하기


function calc_cart_worker(cart, callback) {
  let total = 0 
  let done = Cut(2, () => {
    callback(total)
  })
  cost_ajax(cart, (total) => {
    update_total_dom(total);
    done(total);
    });
  shippint_ajax(cart, (shipping) => {
    total += shipping
    done()
  })
}

let update_total_queue = Queue(1, calc_cart_worker)

function JustOnce(action) {
  let alreadyCalled = false;
  return function (a, b, c) {
    if (alreadyCalled) {
      return
    }
    else {
      return action(a, b, c)
    }
  }
}