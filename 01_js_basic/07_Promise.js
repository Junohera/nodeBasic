/**
 * Promise
 * * 내용이 실행되었지만 결과를 아직 반환하지 않은 객체
 * * 결과를 사용하고자하는 위치에서 then 키워드와 함께 리턴된 결과를 활용하고
 * * 객체 사용을 마무리
 * ! Resolve() -> then으로 연결
 * ! Reject() -> catch로 연결
 * ! finally -> 성공과 실패 구분없이 반드시 실행하는 영역
 */
const condition = false;

// const promise = new Promise((resolve, reject) => {
//     console.log('promise');
//     if (condition) {
//         resolve('성공');
//     } else {
//         reject('실패');
//     }
// });
// const promise1 = () => new Promise((resolve, reject) => {
//     console.log('promise1');
//     if (condition) {
//         resolve('성공');
//     } else {
//         reject('실패');
//     }
// });

// promise
// .then(res => console.log(res))
// .catch(err => console.log(err));

// const promises = [];
// const promise1 = () => new Promise((resolve, reject) => {
//     console.log('promise1');
//     setTimeout(resolve, 4000, '200');
// });
// const promise2 = () => new Promise((resolve, reject) => {
//     console.log('promise2');
//     setTimeout(resolve, 2000, '300');
// });
// const promise3 = () => new Promise((resolve, reject) => {
//     console.log('promise3');
//     setTimeout(resolve, 500, 'foo');
// });
// promises.push(promise1);
// promises.push(promise2);
// promises.push(promise3);

// Promise.all(promises.map(v => v())).then((values) => {
//   console.log(values);
// });

// Promise.all(promises.map(v => v())).then((value) => {
//     console.log(value);
// });

// const pm = () => new Promise((resolve, reject) => {
//     condition
//         ? setTimeout(resolve, 5000, 'SUCCESS')
//         : setTimeout(reject, 5000, 'FAIL');
// })

// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');
// console.log('딴짓');

// pm().then(message => {
//         console.log('message =>', JSON.stringify(message, undefined, 2));
//     })
//     .catch(message => {
//         console.error('message =>', message);
//     })
//     .finally(() => {
//         console.log('!!!!!!!!!!!!!!!!!!!!!!!! finally');
//     });

const printString = (string, callback) => {
    var time = Math.floor(Math.random() * 10000) + 1;
    setTimeout(() => {
        console.log(string + " " + time);
        callback();
    }, time);
}

const printAll = () => {
    return new Promise((resolve, reject) => {
        printString("A", () => {
            printString("B", () => {
                printString("C", () => {
                    resolve("ABC complete");
                })
            })
        });    
    });
};
printAll()
    .then(res => console.log(res))
    .finally(() => {
        console.log('finally');
    })