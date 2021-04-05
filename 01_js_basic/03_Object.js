// 1. 객체의 생성 - key(요소) : 멤버 변수
var product = {
    name: '냉장고'
    , 제조사 : '한국'
}

console.log(product);
console.log(product['제조사']);
console.log('product =>', JSON.stringify(product, undefined, 2));

var object = {
    useNumber : 273,
    useString : '문자열',
    useBoolean : true,
    useArray : [52, 385, 103, 58,],

    method: function() {
        console.log('멤버 함수를 실행합니다');
    },
}
console.log(object.method());

const person = {
    name : '홍길동',
    eat: function(food) {
        console.log(
            `${this.name}이/가 ${food}을/를 먹었습니다.`
        );
        console.log("음식 : " + food);
    }, 
};

var product = {
    name: 'Eclipse & Tomcat',
    price: 'Free',
    language: '한국어',
    supportOS:'win32/64',
    subscription: true,
};

console.log(person.name)
person.eat('스파게티');

for (var key in product) {
    var output = `${key} : ${product[key]}}`
    console.log(output);
}

var student = {
    이름: '홍길동',
    국어: 92,
    수학: 98,
    영어: 96,
    과학: 98,
};

// - in : 해당 키가 객체 안에 있는지 확인
var output = '';
output += "'이름' in student: " + ('이름' in student) + '\n';
output += "'성별' in student: " + ('성별' in student) + '\n';
console.log(output);

// - with : 복잡하게 사용해야하는 코드를 짧게 줄여주는 키워드

    var student = {
        이름 : '홍길동',
        국어 : 92,
        수학 : 98,
        영어 : 96,
        과학 : 98,
    };

    // 사용하지 않은 경우
        var write = '';
        write += '이름 : ' + student.이름 + '\n';
        write += '국어 : ' + student.국어 + '\n';
        write += '수학 : ' + student.수학 + '\n';
        write += '영어 : ' + student.영어 + '\n';
        write += '과학 : ' + student.과학 + '\n';
        console.log(write);

    // 사용한 경우
        var write = '';
        with(student) {
            write += '이름 : ' + 이름 + '\n';
            write += '국어 : ' + 국어 + '\n';
            write += '수학 : ' + 수학 + '\n';
            write += '영어 : ' + 영어 + '\n';
            write += '과학 : ' + 과학 + '\n';
        }
        console.log(write);

// 5. 객체의 속성 추가와 제거
// - 동적 속성 추가/제거 : 처음 객체 생성하는 시점 이후에 객체의 속성을 추가하거나
// 제거할 수 있습니다.

// 빈 객체를 생성
var student = {};

// 객체 생성 이후 동적으로 속성(멤버변수)를 추가할 수 있습니다.
student.이름 = '홍길동';
student.취미 = '악기';
student.특기 = '프로그래밍';
student.장래희망 = '훌륭한 프로그래머';
for (var key in student) {
    var output = `${key} : ${student[key]}`;
    console.log(output);
}
console.log('student =>', JSON.stringify(student, undefined, 2));

// 동적으로 메서드 추가
student.toString  = function() {
    console.log("toString=========");
    for (var key in this) {
        if (key != 'toString') {
            console.log(key + ' : ' + this[key]);
        }
    }
}
student.toString();

delete(student.장래희망);
student.toString();

function Student(name, korean, math, english, science) {
    this.name = name;
    this.korean = korean;
    this.math = math;
    this.english = english;
    this.science = science;

    this.getSum = () => (this.korean +this.math +this.english +this.science);
    this.getAvg = () => (this.getSum() / 4);
    this.toString = () => console.log(this.name + ' :       ' + this.getSum() + ',    ' + this.getAvg());
}

var obj1 = new Student('홍길동', 85, 90, 95, 100);
console.log('   이름        총점    평균');
obj1.toString();

/**
 * prototype
 * * 생성자 함수를 사용해 생성된 객체가 공통으로 가지는 공간
 * * 자바스크립트의 모든 함수는 변수 prototype을 갖습니다
 * * prototype은 객체
 * * 모든 함수에 존재하는 프로토타입은 객체의 생성자로 사용할 때 용도가 확실해집니다
 */

function Student(name, korean, math, english, science) {
    this.name = name;
    this.korean = korean;
    this.math = math;
    this.english = english;
    this.science = science;   
}
Student.prototype.getSum = function() {
    return (this.korean +this.math +this.english +this.science);
};
Student.prototype.getAvg = function() {
    return (this.getSum() / 4);
};
Student.prototype.toString = function() {
    return console.log(this.name + ' :       ' + this.getSum() + ',    ' + this.getAvg());
};

std = new Student('홍길동', 88, 99, 77, 66);
std.toString();

/**
 * instanceof
 * * instance : 생성자 함수를 통해 만들어진 객체
 * * 해당 객체가 어떠한 생성자 함수를 통해 생성됬는지를 확인할 때 사용하는 키워드
 */
function Student(name) {
    this.name = name;
}
var std2 = new Student('홍길동');
console.log(std2 instanceof Student);
console.log(std2 instanceof Number);
console.log('std2 =>', JSON.stringify(std2, undefined, 2));

/**
 * inheritance
 */
function Rectangle(w, h) {
    this.width = w;
    this.height = h;
    this.getWidth = () => this.width;
    this.getHeight = () => this.height;
    this.setWidth = value => this.width = value;
    this.setHeight = value => this.height = value;
};
Rectangle.prototype.getArea = function() {
    return this.getWidth() * this.getHeight();
} 

var rectangle = new Rectangle(5, 7);
rectangle.setWidth(8);
console.log('AREA : ' + rectangle.getArea());

function Square(length) {
    this.base = Rectangle;
    this.base(length, length);
}
// prototype도 복사
Square.prototype = Rectangle.prototype;

var rectangle = new Rectangle(5, 7);
var square = new Square(5);

console.log(rectangle.getArea());
console.log(square.getArea());

/**
 * Object 객체
 * * toString() 메서드
 * * 객체를 문자열로 변환할 때 자동으로 호출
 */
var object = new Object();
console.log(object);
console.log(object.toString());
// - toString() override
var student = {
    name: '홍길동',
    grade: '고등학교 1학년',
    toString: function() {
        return this.name + " : " + this.grade;
    }
};
console.log("---------");
console.log(student);