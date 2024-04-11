// 18. 반응형 아키텍처와 어니언 아키텍처

// 반응형 아키텍처 :  코드에 나타난 순차적 액션의 순서를 뒤집음, 효과에 대한 원인은 분리해서 코드에 복잡하게 꼬인 부분을 풀 수 있습니다.

// 어니언 아키텍처 : 현실세계와 상호작용하기 위해서 서비스 구조

// (1) 반응형 아키텍처
// - 원인과 효과가 결합한 것을 분리
// 
// - 여러 단계를 파이프라인으로 처리

// - 타임라인이 유연해짐

// A.셀은 일급 상태


function ValueCell(initialValue) {
    let currentValue = initialValue;
    let watchers = [] ; // 감시자
    return {
        val : function() {
            return currentValue
        },
        update: function(f) {
            let oldValue = currentValue;
            let newValue = f(oldValue)

            if (oldValue !== newValue) {
                currentValue = newValue
                forEach(watchers, (watchers) => {
                    watcher(newValue)
                })
            }
            // currentValue = newValue
        },
        addWatcher: (f) => {
            watchers.push(f)
        }
    }
    // 값 하나와 두개의 동작
}

let shopping_cart = ValueCell({})
let cart_total = FormulaCell(shopping_cart, calc_total) // 쇼핑 카드가 바뀔때 같이 바뀜

function add_item_to_cart(name, price) {
    let item = make_cart_item(name, price)
    shopping_cart.update((cart) => {
        return add_item(cart, item)
    })
    let total = calc_total(shopping_cart.val())
    set_cart_total_dom(total)
    update_shipping_icons(shopping_cart.val())
    update_tax_dom(total)
}

// B. FormulaCell은 파생된 값을 계산

function FormulaCell(upstreamCell, f) {
    let myCell = ValueCell(f(upstreamCell.val()))
    upstreamCell.addWatcher((newUpstreamValue) => {
        myCell.update((currentValue) => {
            return f(newUpstreamValue)
        })
    })
    return {
        let : myCell.val,
        addWatcher : myCell.addWatcher
    }
}

// C. ValueCell일관되게 유지
// 올바른 값으로 초기화
// update() 에는 계산을 전달 하면안됨
// 계산을 올바른 값이 주어졌다면 올바른 값을 리턴