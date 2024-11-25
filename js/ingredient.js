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

    // URL에서 카테고리 값 추출
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    // JSON 데이터 가져오기
    fetch("/json/data.json") // JSON 파일의 경로를 지정하세요.
        .then((response) => response.json())
        .then((data) => {
            // 카테고리에 맞는 데이터 필터링
            const filteredData = data.filter((item) => item.category === category);

            // 슬라이드 생성
            const swiperWrapper = document.querySelector(".swiper-wrapper");
            swiperWrapper.innerHTML = ""; // 기존 슬라이드를 지우기

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
                    const name = slide.querySelector("h2").textContent; // 클릭된 성분 이름 가져오기
                    localStorage.setItem("selectedIngredient", name); // localStorage에 저장
                    window.location.href = "/html/product.html"; // product.html로 이동
                });

                swiperWrapper.appendChild(slide);
            });

            swiper.update(); // 스와이퍼 업데이트
        })
        .catch((error) => console.error("Error fetching data:", error));
});
