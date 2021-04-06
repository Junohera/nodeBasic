/**
 * num1 2000
 * num2 3
 * text `${num1}}원짜리 모자를 ${num2}개 구입하여, ${num1*num2}원을 지출하였습니다`
 * 
 * 상품번호, 상품명, 판매가격, 원가의 멤버변수값을 전달인수로 전달받아 객체를 생성하는 생성자함수
 * 멤버 함수 : [
 *      getPrice(): 가격 리턴
 *      getCost(): 원가 리턴
 *      toString(): 모든 내용 출력
 * ]
 * 
 * 위에서 만든 생성자에 프로토타입을 이용하여, 원가와 판매가격으로 마진(이익)을 리턴해주는 getMargin() 멤버 함수를 추가하세요
 * 만든 생성자 함수를 함수이름을 변경한 새로운 생성자에, 내부의 멤버함수들을 화살표함수로 변경
 * 
 * 생성자 함수없이 위 문제의 멤버를 모두 갖고 값을 초기화한 객체를 만드세요 멤버함수 포함
 * 만든 객체에 멤버함수 getMargin()을 추가하세요
 * 
 * Promise객체에 k변수(미리선언하고 초기화된)에 들어있는 값이 짝수? resolve("짝수입니다") : reject("홀수입니다")
 * 
 * 위 Promise를 이용해서 연속 .then으로 짝수입니다를 3번 출력하도록 작성
 */

const num1 = 2000;
const num2 = 3;
const text = `${num1}원짜리 모자를 ${num2}개 구입하여, ${num1*num2}원을 지출하였습니다`;

console.log(text);

function Product(pnum, pname, price, cost) {
    this.pnum = pnum;
    this.pname = pname;
    this.price = price;
    this.cost = cost;

    this.getPrice = () => price;
    this.getCost = () => cost;
    this.toString = () => {
        let members = Object.keys(this);
        members = members.filter(v => {
            let type = typeof this[v];
            if (type !== "undefined" && type !== "function") return v;
        });

        return members.map(v => v + " : " + this[v]).join(', ');
    };
    this.toString2 = () => {
        console.log(`pnum: ${pnum},  pname: ${pname},  price: ${price},  cost: ${cost}`);
    };
}

Product.prototype.getMargin = function() {
    return this.getPrice() - this.getCost();
}

function Product2(pnum, pname, price, cost) {
    this.pnum = pnum;
    this.pname = pname;
    this.price = price;
    this.cost = cost;
};
new Product(1, '상품명', 1000, 100).toString2();
const p = new Product(1, '상품명', 1000, 100);
console.log(p.toString());
console.log(p.getMargin());
p.toString2();
const p2 = {
    pnum : 2,
    pname : '상품명2',
    price : 3000,
    cost : 1000,
    getPrice : function() {return this.price;},
    getCost : function() {return this.cost;},
    toString : function() {
        let members = Object.keys(this);
        members = members.filter(v => {
            let type = typeof this[v];
            if (type !== "undefined" && type !== "function") return v;
        });

        return members.map(v => v + " : " + this[v]).join(', ');
    },
};
p2.getMargin = function() {
    return this.getPrice() - this.getCost();
};
console.log(p2.toString());
console.log(p2.getMargin());

const number = 30;

const promise1 = () => new Promise((resolve, reject) => {
    if (number % 2 == 0) {
        console.log("짝수입니다");
        resolve();
    } else {
        console.error("홀수입니다");
        reject();
    }
});

promise1()
    .then(res => promise1(res))
    .then(res => promise1(res))
    .catch(err => console.log(err));