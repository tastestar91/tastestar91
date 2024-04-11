// 컬렉션 캡슐화하기

class Person {
    get courses() { return this._courses}
    set courses(aList) { return this._courses = aList}
}

// =>

class Person2 {
    get courses() { return this._courses}
    addCourse(aCourse) {  }
    removeCourse(aCourse) {}
}

// 1. 아직 컬렉션을 캡슐화하지 않았다면 '변수 캡슐화학'부터 함
// 2. 컬렉션에 원소를 추가/제거하는 함수를 추가
// 3. 정적 검사를 수행
// 4. 컬렉션을 참조하는 부분을 모두 찾음, 컬렉션의 변경자를 호출하는 코두가 모두 앞에서 추가한 추가/제거 함수를 호출하도록 수정
// 5. 컬렉션 케터를 수정해서 원본 내용을 수정할 수 없는 읽기 전용 프락시나 복제본을 반환하게 함

class Person3 {
    constructor(name) {
        this._name = name
        this._courses = [];
    }
    get name () { return this._name;}
    set courses () { return this._courses}
    set courses(aList) { this._courses = aList;}
}

class Course {
    constructor(name, isAdvanced) {
        this._name = name
        this._isAdvacned = isAdvanced;
    }
    get name() { return this._name;}
    get isAdvanced() { return this._isAdvacned }
}


numAdvancedCourses = aPerson.courses.filter(c => c.isAdvanced).length

const basicCourseName = readBasicCourseName(filename);
aPerson.courses = basicCourseName(name => new Course(name, false))

// 제대로 캡슐화하기 위해서 클라이언트가 수업을 하닜ㄱ 추가하고 제거하는 멧드 추가

class Person {
    addCourse(aCourse) {
        this._courses.push(aCourse)
    }
    removeCourse(aCourse, fnIfAbsent = () => { throw new RangeError(); }) {
        const index = this._courses.indexOf(aCourse);
        if (index === -1) fnIfAbsent();
        else this._courses.splice(index, 1)
    }
}   
// 컬렉션의 변경자를 호출하던 코드를 모두 찾아서 방금 추가한 메서드를 사용하도록 바꿈
for (const name of readBasicCourseName(filename)) {
    aPerson(new Course(name, false))
}

