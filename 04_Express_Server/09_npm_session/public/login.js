document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();

    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;

    if (!userid) return alert('userid');
    if (!pwd) return alert('pwd');

    try {
        const res = await axios.post('member/login', { userid, pwd });
        const mem = res.data;
        let m = document.getElementById('msg');

        if (mem.userid === userid && mem.pwd === pwd) {
            location.href = '/main';
        } else if (mem.userid === userid && mem.pwd !== pwd) {
            m.innerHTML = '비밀번호를 확인하세요';
        } else {
            m.innerHTML = '아이디를 확인하세요';
        }
    } catch (e) {
        console.error(e);
    }
})