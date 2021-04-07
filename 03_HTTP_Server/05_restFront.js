async function getUser() {
    try {
        const res = await axios.get('/users'); // get method로 /users 요청
        const users = res.data; // 요청에 대한 응답값(key : value)
        const list = document.getElementById('list');
        list.innerHTML = '';

        // users의 값별로 화면에 추가표시 및 이벤트 연결
        Object.keys(users).forEach(key => {
            console.log('key =>', JSON.stringify(key, undefined, 2));
            
            // 태그들을 생성해서 users 객체의 값들을 하나하나 추가하는 동작
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];

            // 수정버튼
            const edit = document.createElement('button');
            edit.textContent = 'edit';
            edit.addEventListener('click', async () => {
                const name = prompt('바꿀 이름을 입력하세요');
                if (!name) {
                    return alert("이름을 반드시 입력하셔야합니다");
                }
                try {
                    await axios.put('/user/' + key, { name });
                    getUser();
                } catch (err) {
                    console.error('err =>', err);
                }
            });

            // 삭제버튼
            const remove = document.createElement('button');
            remove.textContent = 'del';
            remove.addEventListener('click', async () => {
                if(confirm('삭제하시겠습니까?')) {
                    try {
                        await axios.delete('/user/' + key);
                        getUser();
                    } catch (err) {
                        console.error('err =>', err);
                    }
                } else {
                    // nothing...
                }
            });

            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
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
        e.target.username.value = '';
    } catch (err) {
        console.error(err);
    }
});