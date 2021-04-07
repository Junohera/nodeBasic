async function getUser() {
    try {
        const res = await axios.get('/users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';

        // users의 값들마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).forEach(key => {

            // 태그들을 생성해서 users 객체의 값들을 하나하나 추가하는 동작
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            
            // users 값들 하나하나 옆에 버튼 추가(수정, 삭제)
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {
                const name = prompt('바꿀 이름을 입력하세요');
                if (!name) {
                    return alert("이름을 반드시 입력하셔야합니디ㅏ");
                }
                try {
                    await axios.put('/user/' + key, { name });
                    getUser();
                } catch (err) {
                    console.error('err =>', err);
                }
            })
        });
    } catch (err) {
        console.error('err =>', err);
    }
};

window.onload = getUser;

// form이 submit될 때 실행될 함수 지정
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = e.target.username.value;
    console.log('name =>', JSON.stringify(name, undefined, 2));
    if (!name) {
        return alert('이름을 입력하세요');
    }

    try {
        await axios.post('/user', {
            name
        });
        getUser();
    } catch (err) {
        console.error(err);
    }
});