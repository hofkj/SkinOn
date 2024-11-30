document.addEventListener('DOMContentLoaded', () => {
    const selectedIngredient = localStorage.getItem('selectedIngredient'); 
    document.querySelector('.name').textContent = selectedIngredient; 

    fetch('/json/products.json') 
        .then(response => response.json())
        .then(productData => {
            const ingredientData = productData.find(item => item.name === selectedIngredient);

            if (ingredientData) {
                document.querySelector('.effect').textContent = ingredientData.effect;
                document.querySelector('.detail').textContent = ingredientData.detail;
                document.querySelector('.effect-img img').src = `/ingredient-img/${ingredientData.image}`;
            }

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
