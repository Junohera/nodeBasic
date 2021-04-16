async function getBoard_list() {
    try {
        const res = await axios.get('/board');
        const tbody = document.querySelector('#board-list, tbody')
        tbody.innerHTML='';

        const fields = [
            "id",
            "readCount",
            "realfilename",
            "subject",
            "text",
            "writer",
            "created_at",
            "delete",
        ];

        let td = null;
        let a = null;
        let span = null;
        
        if (res.data.length === 0) {
            const row = document.createElement('tr');
            td = document.createElement('td');
            td.textContent = '작성된댓글이 없습니다';
            td.setAttribute('colspan', 6);
            row.appendChild(td);
            tbody.appendChild(row);
        } else {
            res.data.forEach(v => {
                const row = document.createElement('tr');
                
                fields.forEach(field => {
                    td = document.createElement('td');
    
                    if (field === "realfilename") {
                        let img = document.createElement('img');
                        img.setAttribute('src', `/uploads/${v[field]}`);
                        img.setAttribute('width', '50px');
                        td.appendChild(img);
                    } 
                    else if (field === 'delete') {
                        let button = document.createElement('button');
                        if (document.getElementById('sessionid').value === v['writer']) {
                            button.addEventListener('click', async e => {
                                e.preventDefault();
                                axios.delete(`/board/${v['id']}`)
                                .then(res => {
                                    console.log('res =>', JSON.stringify(res, undefined, 2));
                                    getBoard_list();
                                });
                            })
                        } else {
                            button.setAttribute('disabled', 'true');
                        }
                        button.textContent = '삭제';
                        td.appendChild(button);
                    }
                    else {
                        td.textContent = v[field];
                    }
                    
                    if (field === 'subject') {
                        span = document.createElement('span');
                        span.setAttribute('style', 'color:red');
                        span.textContent = `[${v['Replies'].length}]`;
                        td.appendChild(span);
                        td.addEventListener(
                            'click', e => {
                                e.preventDefault();
                                
                                location.href=`/board/${v['id']}`;
                            }
                        );
                        td.setAttribute('style', 'cursor: pointer');
                    }
                    
                    if (field === "created_at") {
                        td.textContent = (() => {
                            return v[field].split('T')[0];
                        })();
                    }
                    row.appendChild(td);
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
                });
                tbody.appendChild(row);
            });
        }
        
    } catch (e) {
        console.error('e =>', e);
    }
}

getBoard_list();