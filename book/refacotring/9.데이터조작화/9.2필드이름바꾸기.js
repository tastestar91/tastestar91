// rename Field

class Organization {
    get name() {}
}
//=>
class Organization {
    get title() {}
}

// 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드를 수정한 후에 테스트
// 레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화
// 캡슐화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정
// 생성자의 매개변수 중 필드와 이름이 겹치는게 있다면 함수 선언 바꾸기로 결정
// 접근자들의 이름 바꿔줌

const organization = { name : '애크미 구스베라', country : 'GB'}

// 타이틀을 바꾸고 싶음 레코드를 캡슐화

class Organization {
    constructor (data) {
        this._name = data.name
        this._country = data.country
    }
    get name() { return this._name }
    set name(aString) { this._name = aString}
    get country() { return this._country }
    set country(aCountryCode) { this._country = aCountryCode}
}

// 별도의 필드를 정의하고 생성자와 접근자에서 둘을 구분해 사용

class Organization2 {
    constructor (data) {
        this._title = (data.title !== undefined) ? data.title : data.name
        this._country = data.country
    }
    get name() { return this._title }
    set name(aString) { this._title = aString}
    get country() { return this._country }
    set country(aCountryCode) { this._country = aCountryCode}
}


class Organization3 {
    constructor (data) {
        this._title = data.title
        this._country = data.country
    }
    get title() { return this._title }
    set title(aString) { this._title = aString}
    get country() { return this._country }
    set country(aCountryCode) { this._country = aCountryCode}
}

