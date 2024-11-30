document.addEventListener("DOMContentLoaded", function () {
    // 스와이퍼 초기화
    var swiper = new Swiper(".wrap", {
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: "auto",
        spaceBetween: 50,
        loop: true,
        centeredSlides: true,
        speed: 1000,
        direction: "horizontal",
        effect: "coverflow",
        coverflowEffect: {
            rotate: 50,
            stretch: -100,
            depth: 400,
            modifier: 1,
            slideShadows: false,
        },
    });

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    fetch("/json/data.json") 
        .then((response) => response.json())
        .then((data) => {
            const filteredData = data.filter((item) => item.category === category);

            const swiperWrapper = document.querySelector(".swiper-wrapper");
            swiperWrapper.innerHTML = ""; 

            filteredData.forEach((item) => {
                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");

                slide.innerHTML = `
                <div class="inner">
                    <div class="con">
                        <img src="/ingredient-img/${item.image}" alt="${item.name}">
                        <h2>${item.name}</h2>
                        <p>${item.effect}</p>
                    </div>
                </div>
            `;

                slide.addEventListener("click", () => {
                    const name = slide.querySelector("h2").textContent;
                    localStorage.setItem("selectedIngredient", name); 
                    window.location.href = "/html/product.html";
                });

                swiperWrapper.appendChild(slide);
            });

            swiper.update(); // 스와이퍼 업데이트
        })
        .catch((error) => console.error("Error fetching data:", error));
});
