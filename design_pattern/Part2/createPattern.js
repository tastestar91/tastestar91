// 클래스와 인스턴스를 생성하는 방법

// 1. 추상 팩토리
//객체 구체적인 유형을 모른 채, 객체의 키트를 생성하는 방법

var KingJoffery = (() => {
    function KingJoffery() {

    }
    KingJoffery.prototype.makeDecision = () => {
    }
    KingJoffery.prototype.marry = () => {
    }
    return KingJoffery
})


var LordTywin = (() => {
    function LordTywin() {

    }
    LordTywin.prototype.makeDecision = () => {
    }
    return LordTywin
})


var LannisteFactory = (() => {
    function LannisteFactory() {

    }
    LannisteFactory.prototype.getKing = () => {
        return new KingJoffery()
    }

    LannisteFactory.prototype.getHandOfTheKing = () => {
        return new LordTywin()
    }
    return LannisteFactory
})


var CourtSession = (() => {
    CourtSession = (abstractFactory) => {
        this.abstractFactory = abstractFactory
        this.COMPLAINT_THRESHOLD = 10;
    }
    CourtSession.prototype.complaintPresented = (complaint) => {

    }
    return CourtSession
})

// 2. 빌더
//클래스의 구축을 단순화하고 사용자가 전문 지식 없이 클래스를 구축할 때 빌더를 사용함

var Event = (() => {
    function Event (name) {
        this.name = name
    }
    return Event
})()
Westeros.Event = Event
// 3. 팩토리 메소드

// 4. 단일체

// 5. 프로토타입
