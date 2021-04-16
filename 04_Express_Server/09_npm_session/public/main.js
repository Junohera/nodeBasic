async function getBoard_list() {
    try {
        const res = await axios.get('/board');
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
        let span = null;
        res.data.forEach(v => {
            const row = document.createElement('tr');
            
            fields.forEach(field => {
                td = document.createElement('td');

                td.textContent = v[field];

                if (field === 'subject') {
                    span = document.createElement('span');
                    span.setAttribute('style', 'color:red');
                    span.textContent = `[${v['Replies'].length}]`;
                    td.appendChild(span);
                }
                
                if (field === "created_at") {
                    td.textContent = (() => {
                        return v[field].split('T')[0];
                    })();
                }
                row.appendChild(td);
                row.setAttribute('style', 'cursor: pointer');

                row.addEventListener(
                    'mouseenter', e => {
                        e.target.style.backgroundColor = "yellow";
                    }
                );
                row.addEventListener(
                    'mouseleave', e => {
                        e.target.style.backgroundColor = "white";
                    }
                );
                row.addEventListener(
                    'click', e => {
                        e.preventDefault();
                        location.href=`/board/${v['id']}`;
                    }
                );
            });
            tbody.appendChild(row);
        });
        
    } catch (e) {
        console.error('e =>', e);
    }
}

getBoard_list();