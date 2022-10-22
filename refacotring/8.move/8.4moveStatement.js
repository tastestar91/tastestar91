emitPhotoData(outStream, person.photo)

function emitPhotoData(outStream, photo) {
    outStream.write('')
    outStream.write('')
}
// =>
emitPhotoData(outStream, person.photo)
outStream.write(``)

function emitPhotoData(outStream, photo){
    outStream.write()
}

// 절차
// 호출자가 한두 개 뿐이고 피호출 함수도 간단한 단순한 상황이면, 피호출 함수의 처음 줄을 잘라내어 호출자로 복사해 넣습니다.
// 더 복잡한 상황에서는 이동하지 않길 원하는 모든 문자을 함수로 추출한 다음 검색하기 쉬운 임시 이름을 지어줍니다
// 원래함수를 인라인합니다
// 추출된 함수의 이름을 원래 함수의 이름으로 변경한다


function renderPerson(outStream, person) {
    outStream.write(``)
    renderPhoto(outStream, person.photo)
    emitPhotoData(outStream, person.photo)
}

