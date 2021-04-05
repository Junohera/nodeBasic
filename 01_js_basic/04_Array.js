/**
 * Array
 * * 다양한 자료를 하나의 범주안에 넣고, 인덱싱을 이용해 컨트롤하는 변수
 */
var array = [
    273, 
    'string',
    true,
    function() {},
    {},
    [150, 170],
];
console.log(array[0]);
console.log(array[1]);
console.log(array[2]);
console.log(array[3]);
console.log(array[4]);
console.log(array[5]);
console.log(array);
console.log(...array);
console.log('array =>', JSON.stringify(array, undefined, 2));

var arr = ['a', 'b', 'c'];
console.log(arr);

arr.push('d'); // 맨 끝에
console.log(arr);
arr.unshift('d'); // 맨 앞에
console.log(arr);
arr.splice(2, 0, 'B'); // index 2 ('b')의 위치에 요소를 추가
console.log(arr);
var arr = ['a', 'b', 'c', 'd'];
arr.splice(2, 0, 'C', 'D'); // index 2의 위치에 2개의 요소를 추가
console.log(arr);

arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// 배열의 마지막 요소 제거
var popped = arr.pop(); // 제거한 요소를 반환 받을 수 있음
console.log(arr);
console.log(popped);

arr =['a', 'b', 'c', 'e', 'f'];
// 배열의 첫번째 요소를 제거
var shifted = arr.shift(); // 제거한 요소를 반환 받을 수 있음
console.log(arr);
console.log(shifted);

var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// index2부터 1개의 요소('c')를 제거
arr.splice(2, 1);
console.log(arr);
// index2에 1개의 요소('c')를 추가
arr.splice(2, 0, 'c');
console.log(arr);

// delete로 배열의 요소를 삭제할 경우, 값은 삭제되고, 공간은 남게된다.
var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
delete arr[1];
console.log(arr);