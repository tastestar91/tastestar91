// 구조적 프로그래밍 뵘-야코피니 이론
// 서브 프로그램의 순차 실행
// 두 개의 서브 프로그램으 ㅣ조건부 실행
// 조건이 참이 될 때까지 하나의 서브 프로그램을 반복 실행


// 객체지향 언어 구조 클래스 서브 클래스 올레-요한 달, 키르스텐 니가드


var functionObject = {
    greeting : "hello World",
    doThings : function() {
        console.log(this.greeting)
    }
}
// this 식별자를 사용, 이를 사용하는 함수의 소유자에 바인딩 뙈있음
// 하지만 함수가 객체의 외부에서 선언되었다면 전역 객체를 참조

var target = document.getElementById("someId")
target.addEventListener("click", () => {
    console.log(this)
}, false) // target값을 가짐


// 객체는 클래스와 동일하지않음, 객체는 클래스의 인스턴스 
// 복수의 functinoObject 생성할려고 하면 오류 발생

//repl모듈에서 오류, read-execute-print loop 모듈 
var ThingDoer = () => {
    this.greeting = "hello World"
    this.doThings = () => {
        console.log(this.greeting)
        this.doOtherThings()
    }
    this.doOtherThings = () => {
        console.log(this.greeting.split(""))
    }
}
var instance = new ThingDoer();
instance.doThings() // hello world




//---------------------------------------
// 프로토 타입 구축

// 복수의 객체를 생성하는데는 많은 메모리를 필요로함

// 이미정의된 객체를 변경하는 방법 '몽키 패치'
var Castle = (name) => {
    this.name = name
    this.build = ( ) => {
        console.log(this.name)
    }
}

var instance1 = new Castle('winter')
var instance2 = new Castle('fall')
instance1.build = () => { console.log('summer')}
instance1.build() // summer
instance2.build() // fall

// 객체가 생성될 떄 객체의 정의는 프로토 타입에 상속
// 함수만이 프로토타입에 할당될 수 있음

var Castle = (name) => {
    this.name = name
}

Castle.prototype.build = () => {
    console.log(this.name)
}

var instance = new Castle('winter')
Castle.prototype.build = function () {
    console.log(this.name.replace("winter", "summer"))
}
instance.build() // summer 출력

// Object.create
// 프로토타입을 기반으로 새로운 객체를 생성할 수 있음
// 생성된 객체에 추가 필드를 설명하는 propertiesObject 파라미터를 전달할 수도 이음
// writable : 이필드는 쓰기 가능 여부를 지시
// configurable : 파일이 객체로부터 제거될 수 있는지, 생성 후에 추가적인 구성을 지원하는지 여부 지시
// enumerable : 객체의 속성을 열거하는 동안 속성이 나열될 수 있는지를 확인
// value : 필드의 기본값

// ------------------
// 상속

let Castle = () => {}
Castle.prototype.build = () => {    console.log('Castle')   }

let Winterfell = () => {}
Winterfell.prototype.build = Castle.prototype.build
Winterfell.prototype.addGodsWood = () => {}
let winterfell = new Winterfell();
winterfell.build() // Castle 출력



// ------------------
// 모듈
// 객체를 전역 네임스페이스에 연결
let Westeros = Westeros || {}
Westeros.Structures = Westeros.Structures || {}
Westeros.Structures.Castle = (name) => {
    console.log('Castle')
}
Westeros.Structures.Castle.prototype.Build = () => {
    console.log('Sex')
}

let summerfell = new Westeros.Structures.Castle("wintterfell")
summerfell.Build();

let Other = (() => {
    function Castle(name) {
        this.name = name;
    }
    Castle.prototype.Build = () => {
        console.log('Castle')
    }
    return Castle
}) ()

Westeros.Structures.Castle = Castle;

let BaseStructure = (() => {
    function BaseStructure() {
    }
    return BaseStructure
})()
Structures.BaseStructure = BaseStructure
// 노출 모듈 패턴
// 클래스와 모듈 

class Castle extends Westeros.Structures.BaseStructure {
    constructor (name, allegience) {
        super(name)
    }
    Build() {
        super.Build()
    }
}

