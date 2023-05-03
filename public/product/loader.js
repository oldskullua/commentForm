(() => {

    const url = new URL(location.toString());
    const commentUrl = new URL(location.toString());

    url.pathname = '/api' + url.pathname; // https://hostname[:port]/api/product/:id
    commentUrl.pathname = '/api' + commentUrl.pathname + 'comments'; // https://hostname[:port]/api/product/:id/comment

    // Це відправляє комент з форми
    function sendComment(event) {
        event.preventDefault();
        const url = commentUrl;
        commentUrl.search = '';
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                rating: document.getElementById('rating').value,
                description: document.getElementById('message').value,
            })
        })
            .then(response => response.json())
            .then(data => updateCommentList())
    }
    // Це створює структуру коменту
    function createComment(item) {
        return `
            <div class="row">
                <div class="col-1"> <p class="display-1">${item.rating}</p> </div>
                <div class="col">
                    <div class="row">
                        <div class="col g-0">
                            <div class="row text-primary">
                                <div class="col d-flex align-items-baseline h5">
                                    <p class="mx-2">${item.name}</p>
                                    <p class="mx-2 h6">${item.email}</p>
                                </div>
                                <p class="col">${new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div class="row"> <p class="col"> ${item.description} </p> </div>
                </div>
            </div>
        `;
    }
    // Це завантажує коменти на сторінку
    function updateCommentList() {
        const url = commentUrl;
        url.search = null;
        const sortByRating = document.getElementById('sortByRating').checked;
        console.log(sortByRating);
        url.search = new URLSearchParams({
            sortBy: sortByRating ? 'rating' : 'createdAt',
            order: "descending",
            limit: 10
        })
        fetch(url)
            .then(response => response.json())
            .then(items => {
                console.log(items);
                const list = document.getElementById('comment-list');
                list.innerHTML = '';
                items.forEach(item => {
                    let element = document.createElement('li');
                    element.setAttribute('class', "list-group-item");
                    element.innerHTML = createComment(item);
                    list.appendChild(element);
                }); 
            });
    }

    // повісити обробник на форму
    document.getElementById('feedbackForm').addEventListener('submit', sendComment);
    // повісити обробник на checkbox, щоб при зміні - коменти завантажувались знову
    document.getElementById('sortByRating').addEventListener('change', updateCommentList);
    // загрузка інфи про товар
    fetch(url)
        .then(response => {
            if (response.status == 200) return response.json()
            throw { status: response.status };
        })
        .then(json => {
            document.getElementById('productName').innerHTML = json.name;
            document.getElementById('productPrice').innerHTML = json.price + " грн./кг";
        })
        .catch(error => console.error);
    
    // Загрузка 10 комментів
    updateCommentList();
})();