document.getElementById('board-form').addEventListener('submit', async e => {
    e.preventDefault();

    const subject = e.target.subject.value;
    const text = e.target.text.value;
    const writer = e.target.writer.value;

    if (!subject) return alert('subject');
    if (!text) return alert('text');
    try {
        const res = await axios.post('/board/addboard', {
            writer,
            subject,
            text,
        });
        console.log('res =>', JSON.stringify(res, undefined, 2));
        location.href='/main';
    } catch (e) {
        console.log(e);
        alert(e);
    }
});