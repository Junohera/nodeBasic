async function getBoard_list() {
    try {
        const res = await axios.get('/board');
        console.log(res.data);
        const tbody = document.querySelector('#board-list, tbody')

        const fields = [
            "id",
            "subject",
            "text",
            "writer",
            "created_at",
        ];

        let td = null;
        res.data.forEach(v => {
            const row = document.createElement('tr');
            
            fields.forEach(field => {
                td = document.createElement('td');
                td.textContent = v[field];
                if (field === "subject") {
                    td.addEventListener('click', e => {
                        e.preventDefault();
                        location.href=`/board/${v.id}`;
                    })
                }
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        
    } catch (e) {
        console.error('e =>', e);
    }
}

getBoard_list();