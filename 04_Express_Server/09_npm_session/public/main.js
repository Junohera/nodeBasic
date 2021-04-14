async function getBoard_list() {
    try {
        const res = await axios.get('/board');
        console.log(res.data);
        const tbody = document.querySelector('#board-list, tbody')

        const fields = [
            "id",
            "readCount",
            "subject",
            "text",
            "writer",
            "created_at",
        ];

        let td = null;
        let a = null;
        res.data.forEach(v => {
            const row = document.createElement('tr');
            
            fields.forEach(field => {
                td = document.createElement('td');

                if (field === "subject") {
                    a = document.createElement('a');
                    a.setAttribute('href', `/board/${v.id}`);
                    a.textContent = v[field];
                    td.appendChild(a);
                } else {
                    td.textContent = v[field];
                }
                
                if (field === "created_at") {
                    td.textContent = (() => {
                        return v[field].split('T')[0];
                    })();
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