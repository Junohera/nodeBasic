// 09_promise의 다른 형태

// 실패가능성이 있는 동작을 실행하고 결과를 갖고 있다가,
// 결과가 필요한 순간 객체의 이름을 불러 꺼내쓸 수 있는 객체
const condition = false;
const promise = new Promise((resolve, reject) => {
    if (condition) resolve('성공');
    else reject('실패');
});

async function abcd() {
    // promise 결과값을 꺼내서 result에 대입
    // await : promise의 비동기실행을 기다리다가 필요할때 꺼내기 위한 키워드
    // await은 반드시 async로 만들어진 함수안에서 사용해야합니다.
    try {
        const result = await new Promise((resolve, reject) => {
            if (condition) resolve('성공');
            else reject('실패');
        });;
        console.log(result);
    } catch (e) {
        console.error('e =>', JSON.stringify(e, undefined, 2));
    }
};

abcd();

/*
promise
    .then(message => console.log(message))
    .catch(error => console.error(error))
    .finally(() => console.log('always ...'));
*/

const promise2 = new Promise((resolve, reject) => {
    resolve('첫번째 resolve');
});

// 연속된 프로미스에는 적합하지않지만, 단건처리는 가능.(=> 전부 프로미스로 쓰면 되는데 개취해야하니까... 알고만있자. )
async function thenfunc() {
    try {
       const result2 = await promise2;
        console.log(resolve);
        return "번째 resolve"; // 두번째 리졸브 호출
    } catch (e) {
        console.error(e);
    }
};
thenfunc();

thenfunc()
    .then(result2 => {
        console.log(result2);
    })
    .catch(error => {
        console.error(error);
    });