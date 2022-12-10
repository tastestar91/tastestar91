// 16. 타임라인 사이에 자원 공유하기

// DOM이 업데이트 되는 순서를 보장

// 큐에 처리할 작업을 큐에 넣기

let queue_items = [];
let working = false;

function update_total_queue(cart) {
  queue_items.push(cart);
}

// function Queue {
//   function runNext() {
//    if (working) {
//      return
//     }
//    if (queue_items.length == 0) {
//     return
//    }
//    working = true
//    let cart = queue_items.shift()
//    // calc_cart_total(cart, (update_total_dom))
//    calc_cart_total(cart, (total) => {
//      update_total_dom(total)
//      working = false
//      runNext()
//    })
//   }

//   return (cart) => {
//     queue_items.push(cart)
//     setTimeout(runNext, 0)
//   }
// }
let update_total_queue = Queue();
// function update_total_queue(cart) {
//   queue_items.push(cart)
//   setTimeout(runNext, 0)
// }

// (1) 큐를 재사용할 수 있게 만들기

function Queue() {
  let queue_items = [];
  let working = false;

  function runNext() {
    if (working) {
      return;
    }

    if (queue_items.length === 0) {
      return;
    }

    let cart = queue_items.shift();

    function worker(cart, done) {
      calc_cart_total(cart, (total) => {
        update_total_dom(total);
        done(total);
      });
    }
    worker(cart, () => {
      working = false;
      runNext();
    });
  }
}
