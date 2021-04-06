function longRunningTask() {
    console.log('작업 끝');
};
console.log('시작');
// 두번째 지정한 시간뒤에 첫번째 함수 호출
setTimeout(longRunningTask, 2000);
console.log('다음 작업');