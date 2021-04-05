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