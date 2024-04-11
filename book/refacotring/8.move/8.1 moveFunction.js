// 함수 옮기기

class Account {
    get overdraftCharge() {}
}

// => 메서드 이용
class AccountType {
    get overdraftCharge() {}
}

// 절차
// 1. 선택한 함수가 현재 컨텍스트에서 사용 중인 모든 프로그램 요소를 살펴봅니다. 이 요소들 중에서 함께 옮겨야 할께 있는지 고민
// => 얽혀 있는 함수가 여러 개라면 다르느 곳에 미치는 영향이 적은 함수부터 옮기도록 하자

// 2. 선택한 함수가 다형 메서드인지 확인
// => 객체 지향 언어에서는 같은 메서드가 슈퍼 클래스나 서브클래스에도 선언되어 있는지 까지 고려

// 3. 선택한 함수를 타깃 컨텍스트로 복사, 타깃함수가 새로운 터전에 잘 자리잡도록 다듬음
// => 함수 본문에서 소스 컨텍스트의 요소를 사용한다면 해당 요소들을 매개변수로 넘기거나 소스 컨텍스트 자체르 ㄹ참조로 넘겨줌
// -> 함수를 옮기게 되면 새로운 컨텍스트에 어울리는 새로운 이름으로 바꿔줘야할 경우가 많음

// 4. 정적 분석을 수행
// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영
// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정
// 7. 소스 함수를 인라인 할지 고민
// => 소스 함수는 언제까지라도 위임함수로 남겨둘수 있음, 하지만 소스 함수를 호출하는 곳에서 타깃 함수를직접 호출하는데 무리가 없다면 중간 단계는 제거하는 편이 나음

// (1) 중첩 함수를 최상위로 옮기기

function trackSummary(points) {
    const totalTime = calculateTime();
    // const totalDistance = top_calculateDistance(points)
    // const totalDistance = calculateDistance();
    const pace = totalTime/ 60 / totalDistance(points);
    return {
        time : totalTime,
        distance : totalDistance,
        pace : pace
    }
    // function calculateDistance() { // 총 거리 계산
    //     // let result = 0
    //     // for (let i = 1; i < points.length; i++) {
    //     //     result += distance(points[i-1], points[i])
    //     // }
    //     // return result
    //     return top_calculateDistance(points)
    // }

    // function distance(p1, p2) {} // 두 지점의 거리 게산
    // function radians(degrees) {} // 라디안 값으로 계산
    // function calculateTime() {} // 총 시간 계산
}

function top_calculateDistance(points) {
    let result = 0
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i -1], points[i])
    }
    return result;

    function distance(p1, p2) {}
    function radians(degrees) {}
}



// => 함수르르 최상위로 목사하는 것
// 변수 인라인하기

// (2) 다른 클래스로 옮기기

class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge;
        return result
    }

    get overdraftCharge() {
        // if (this.type.isPremium) {
        //     const baseCharge = 10
        //     if (this._daysOverdrawn <= 7) {
        //         return baseCharge
        //     }
        //     else {
        //         return baseCharge + (this._daysOverdrawn -7) * 0.85
        //     }
        // }
        // else {
        //     return this._daysOverdrawn * 1.75;
        // }
        return this.type.overdraftCharge(this.daysOverdrawn)
    }
}


class AccountType {
    overdraftCharge(daysOverdrawn) {
        if (this.isPremium) {
            const baseCharge = 10;
            if (daysOverdrawn <= 7) {
                return baseCharge
            }
            else {
                baseCharge + (daysOverdrawn - 7) * 0.85
            }
        }
        else {
            return daysOverdrawn * 1.75
        }
    }
}