function first() {
    second(); // 2 callstack에 두번째로 저장되는 주소
    console.log('첫번째');
}
function second() {
    third(); // 3 callstack에 세번째로 저장되는 주소
    console.log('두번째');
}
function third() {
    console.log('세번째');
}

first(); // 1 callstack에 최초 저장되는 주소
// 결론 1: callstack에 함수호출로 인해 분기되는 지점의 주소가 이동하는 순서는 쌓여서 돌아올때 반대의 순서로 돌아옴.

function longRunningTask() {
    console.log('작업 끝');
};
console.log('시작');
longRunningTask();
console.log('다음 작업');
// 시작-작업끝-다음작업 의 순서는 절대 바뀌지 않습니다.