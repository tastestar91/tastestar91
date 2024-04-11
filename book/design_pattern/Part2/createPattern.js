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

let Prize = (() => {
    function Prize(name) {
        this.name = name
    }
    return Prize
})
Westeros.Prize = Prize

let Tournament = (() => {
    function Tournament() {
    }
    return Tournament
})
Westeros.Tournament = Tournament

// 서로 다른 토너먼트를 생성하는 두 개의 빌더

let LannisterTournamentBuilder = (() => {
    function LannisterTournamentBuilder () {}
    LannisterTournamentBuilder.prototype.build = () => {
        let tournament = new Tournament()
        tournament.events.push(new Event('envet'))
        tournament.events.push(new Event('esadf'))
        tournament.attendees.push(new attendee('asdf'))
        tournament.prizes.push(new Prize('Gold'))
        tournament.prizes.push(new Prizze('more gold'))
        return tournament
    }
    return LannisterTournamentBuilder
})()

let BaratheonTournamentBuilder = (() => {
    function BaratheonTournamentBuilder() {}
    BaratheonTournamentBuilder.prototype.build = () => {
        let tournament = new Tournament()
        tournament.events.push(new Event('envet'))
        tournament.events.push(new Event('esadf'))
        tournament.attendees.push(new attendee('asdf'))
        tournament.prizes.push(new Prize('Gold'))
        tournament.prizes.push(new Prizze('more gold'))
        return tournament
    }
    return BaratheonTournamentBuilder
})()


// 3. 팩토리 메소드

//추상 팩토리 패턴은 관련성을 갖는 클래스들의 집합을 생성, 빌더는 복합 객체를 만듬

let WateryGod = (() => {
    function WateryGod() {}
    WateryGod.prototype.prayTo = () {}
    return WateryGod
})()

let GodFactory = (() => {
    function GodFactory() {}
    GodFactory.Build = (godName) => {
        if (godName === 'watery') {
            return new WateryGod()
        }
    }
})

let GodDeterminant =(() => {
    function GodDeterminant(religionName, prayerPurpose) {
        this._religionName= religionName
        this._prayerPurpose = prayerPurpose
    }
    return GodDeterminant
})()

let Prayer = (() => {
    function Prayer() {}
    Prayer.prototype.pray = (godName) => {
        GodFactory.Build(godName).prayTo()
    }
    return Prayer
})

// 4. 단일체


// 5. 프로토타입
// 자바스크립트 상속을 지원하는데 사용되는 메커니즘

function clone(source, destination) {
    for (let attr in source.prototype) {
        destination.prototype[attr] = source.prototype[attr]
    }
}


// 클래스 내에서 복사본을 반환하는데 사용하도로 구십게 변경 가능
let Lannister = (() => {
    Lannister.prototype.clone = () => {
        let clone = new Lannister()
        for (let attr in this) {
            clone[attr] = this[attr]
        }
        return close
    }
    return Lannister
})()

// 복잡한 객체르르 단지 한번만 생성하고 약간의 변화가 있는 다수의 객체로 복사 될 수 있도록 허용
// 가급적 new를 사용하자