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

// function Queue(worker) {
function DroppingQueue(max, worker) {
  let queue_items = [];
  let working = false;

  function runNext() {
    if (working) {
      return;
    }

    if (queue_items.length === 0) {
      return;
    }

    let item = queue_items.shift();
    
    worker(item.data, (val) => {
      working = false;
      runNext();
      setTimeout(item.callback, 0, val)
    });

    return function (data, callback) {
      queue_items.push({
        data: data,
        callback : callback || function() {}
      })
      while(queue_items.length > max) {
        queue_items.shift()
      }
      setTimeout(runNext, 0)
    }
  }
}

function calc_cart_worker(cart, done) {
      calc_cart_total(cart, (total) => {
        update_total_dom(total);
        done(total);
      });
    }

let update_total_queue = Queue(1, calc_cart_worker)

// (2) 작업이 끝났을 떄 실행하는 콜백을 받기

// (3) 작업이 완료되었을 때 콜백 부르기

// QUEUE느느 동시성 기본형, 