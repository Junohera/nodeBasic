document.getElementById('update-form').addEventListener('submit', e => {
    e.preventDefault();

    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    const pwd2 = e.target.pwd2.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;

    if (!userid) return alert('userid');
    if (!pwd) return alert('pwd');
    if (!pwd2) return alert('pwd2');
    if (pwd !== pwd2) return alert('diff pwd');
    if (!name) return alert('name');
    if (!phone) return alert('phone');
    if (!email) return alert('email');

    e.target.submit()
});