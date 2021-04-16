document.getElementById('board-form').addEventListener('submit', async e => {
    e.preventDefault();

    const subject = e.target.subject.value;
    const text = e.target.text.value;
    const writer = e.target.writer.value;
    const image = e.target.image.value;

    if (!subject) return alert('subject');
    if (!text) return alert('text');
    try {
        const formData = new FormData();
                formData.append('image', e.target.image.files[0]);
                formData.append('subject', e.target.subject.value);
                formData.append('text', e.target.text.value);
                formData.append('writer', e.target.writer.value);
        const res = await axios.post('/board/addboard', formData);
        console.log('res =>', JSON.stringify(res, undefined, 2));
        location.href='/main';
    } catch (e) {
        console.log(e);
        alert(e);
    }
});

function setPreview(event) {
    var reader = new FileReader();
    const previewBox = document.querySelector("div#preview");
    previewBox.innerHTML = '';
    reader.onload = function(event) {
        var img = document.createElement("img");
        img.setAttribute("src", event.target.result);
        previewBox.appendChild(img);
    };
    reader.readAsDataURL(event.target.files[0]);
};


document.getElementById('preview').addEventListener('click', e => {
    document.getElementById('imagefile').click();
});