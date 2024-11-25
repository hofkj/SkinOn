document.addEventListener('DOMContentLoaded', () => {
    const selectedIngredient = localStorage.getItem('selectedIngredient'); // 저장된 성분 이름 가져오기
    document.querySelector('.name').textContent = selectedIngredient; // 이름 표시

    fetch('/json/products.json') // JSON 파일 불러오기
        .then(response => response.json())
        .then(productData => {
            // 성분 이름으로 데이터 필터링
            const filteredProducts = productData.filter(item => item.ingredient === selectedIngredient);

            const cardsContainer = document.querySelector('.cards-container');
            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="/product-img/${product.ingredient}/${product.img}" alt="${product.brand}">
                    <div class="card-content">
                        <h3>${product.brand}</h3>
                        <p>${product.category}</p>
                    </div>
                `;
                cardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
