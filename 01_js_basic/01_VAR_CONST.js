/**
 * 브라우저에서는 ES2015(ES6) 버전을 기준으로 하므로 var로 변수선언을 많이 사용했지만,
 * 이후부터는 const || let 변수를 많이 사용.
 */

var x = 3;
console.log('x =>', JSON.stringify(x, undefined, 2));
x = '홍길동';
console.log('x =>', JSON.stringify(x, undefined, 2));

const y = 3; // 초기값이 반드시 있어야 하며, 이후 변경이 불가(= 불변성)
console.log('y =>', JSON.stringify(y, undefined, 2));
// y = '홍길동'; // 에러 - const변수는 재할당이 불가능

// var & const
// - 블록스코프 : var는 ({}, 지역변수)와 상관없이 값이 접근 불가능
if (true) {
    var a = 3;
}
console.log('a =>', JSON.stringify(a, undefined, 2));

if (true) {
    const b = 3;
}
console.log('b =>', JSON.stringify(b, undefined, 2));
// 한번 초기화된 값은 변경할 수 없고, 상수선언 초기화가 없어도 에러발생
const a1 = 0;
a1 = 0; // error

let b1=0;
b1 = 1; //정상

const c; // error
                                                                                                                                                                                                                                                                                                                                                                                                                    