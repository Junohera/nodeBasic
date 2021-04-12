// 댓글 로딩
async function getComment(id) {
    try {
        const res = await axios.get(`/comments?${id}`);
        const comments = res.data;

        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';

        comments.forEach(comment => {
            const row = document.createElement('tr');
            let td = null; 

            td = document.createElement('td');
            td.textContent = comment.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = comment.User.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);

            tbody.appendChild(row);
        })
    } catch (e) {
        console.error('e =>', e);
    }
}

// 모든 사용자 조회 후 화면에 표시
// await 함수 실행이 있으므로 async로 만듭니다.
async function getUser() {
    try {
        // users의 get방식으로 모든 사용자 정보를 조회하여 res에 저장
        const res = await axios.get('/users');
        
        // 이름을 users로 바꿔쓰기 위해 변수만들고 대입합니다.
        const users = res.data;

        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        
        // users에 담긴 user 데이터 갯수만큼 데이터를 추가합니다.
        // users 변수에 담긴 한사람의 데이터가 user 변수에 인원수만큼 담기면서
        // function이 실행됩니다.
        users.map(function(user) {
            // tr 태그 추가
            const row = document.createElement('tr');
            // 현재행을 클릭하면 현재 사용자의 댓글들을 로딩하고 하단에 표시하는 이벤트리스너 설정
            row.addEventListener('click', () => {
                getComment(user.id); // 현재아이디로 댓글 조회하는 함수추가 예정
            });
            // 현재 행에 대한 사용자 정보를 td에 나눠 표시
            let td = document.createElement('td');
            td.textContent = user.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(td);
            tbody.appendChild(row);
        });
    } catch (e) {
        console.error(e);
    }
};

// id가 user-form 인 폼의 submit이 실행될 때,
document.getElementById('user-form').addEventListener(
    'submit',
    async e => {
        e.preventDefault();
        const name = e.target.username.value;
        const age = e.target.age.value;
        const married = e.target.married.checked;

        if (!name) {return alert('이름을 입력하세요');}
        if (!age) {return alert('나이를 입력하세요');}

        try {
            // post로 전송하고, 함수가 리턴되면 현재 자리에서 다음이 실행됩니다.
            // 사용자 추가의 기능만 실행, 되돌아오는 값은 없습니다.
            await axios.post('/users', {
                name,
                age,
                married,
            });
            // 추가된 사용자정보를 포함하여 모든 사용자의 데이터를받아 화면에 표시하려면
            // 별도의 실행이 필요합니다. 여기서는 별도의 함수를 만들고 호출하는 방식으로 진행합니다.
            getUser();
        } catch (e) {
            console.error(e);
        }
        
        // 사용자 추가 - 사용자 정보 표시 등의 동작을 마치고, 사용자 추가폼의 입력란들은
        // 다음 추가를 위해 다 비워줍니다.

        e.target.username.value = '';
        e.target.age.value = '';
        e.target.married.checked = false;
    }
);

// id가 comment-list인 폼의 submit이 실행될 때,
document.getElementById('comment-list').addEventListener(
    'submit',
    async e => {
        e.preventDefault();

        const userid = e.target.userid.value;
        const comment = e.target.comment.value;

        if (!userid) {
            return alert('아이디를 입력하세요');
        }
        if (!comment) {
            return alert('댓글을 입력하세요');
        }

        try {
            await axios.post('/comments', { userid, comment });
            getComment(userid);
        } catch (e) {
            console.error(e);
        }

        e.target.userid.value = '';
        e.target.comment.value = '';
    },
);