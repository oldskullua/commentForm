(() => {
    const commentUrl = new URL(location.toString());
    commentUrl.pathname = '/api' + commentUrl.pathname + '/comments'; // https://hostname[:port]/api/product/:id/comment
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
            .then(response => response.text())
            .then(text => {
                const list = document.getElementById('comment-list');
                list.innerHTML = text
            });
    }
    // Це відправляє комент на сервер
    function sendComment(event) {
        event.preventDefault();
        const data = {};
        const formData = new FormData(event.target);
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        const url = commentUrl;
        commentUrl.search = '';
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status == 200)
                    updateCommentList();
                else 
                    throw response.json()
            })
            .catch(resdata => {
                console.log(resdata);
            })
    }

    window.addEventListener('load', () => {
        updateCommentList();
        document.getElementById('sortByRating').addEventListener('change', updateCommentList);
        document.getElementById('comment-form').addEventListener('submit', sendComment);
    });

})();