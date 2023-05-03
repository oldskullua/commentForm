(() => {
    function constructOneItem(product) {
        return `
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h6 class="card-subtitle">${product.price}</h6>
            </div>
            <div class="card-footer text-body-secondary d-flex">
                <div>
                    <i class="bi bi-chat-left-text"></i>
                </div>
                <span class="mx-2">125</span>
            </div>
        `
    };
    window.addEventListener('load', () => {
        fetch('/api/products?' + new URLSearchParams({
            pageSize: 10
        }), {
            method: 'get',
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            throw {status: response.status};
        }).then(json => {
            const main = document.getElementsByTagName('main')[0];
            json.forEach(item => {
                let element = document.createElement('a');
                element.classList.add('card', 'm-2', 'z-2', 'text-dark', 'text-decoration-none');
                element.setAttribute('style', 'width: 25rem; height: 16rem');
                element.innerHTML = constructOneItem(item);
                element.href = `/product/${item.id}?` + new URLSearchParams({
                    pageSize: 10
                });
                main.appendChild(element);//.addEventListener('click', () => openProductCard(item.id));
            });
            
        })
        .catch(error => {
            console.error(error);
        })
    });
})();