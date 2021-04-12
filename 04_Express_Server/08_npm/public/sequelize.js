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