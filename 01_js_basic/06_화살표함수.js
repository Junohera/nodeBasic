// function1
function add1(x, y) {
    return x + y;
}
console.log(add1(3, 5));

// function2
var add2 = function(x, y) {
    return x + y;
}
console.log(add2(3, 5));

// function3
add3 = (x, y) => {
    return x + y;
}
console.log(add3(3, 5));

// function4
add4 = (x, y) => (x + y);
console.log(add4(3, 5));

function not1(x) {
    return !x;
};
console.log(not1(true));
const not2 = x => !x;
console.log(not2(true));
