// Swiper.js 초기화
var swiper = new Swiper('.swiper-container', {
    effect: 'fade', // 페이드 전환 효과
    loop: true, // 무한 루프
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000, // 5초마다 자동 슬라이드
    },
    on: {
        slideChangeTransitionEnd: function () {
            const activeSlide = document.querySelector('.swiper-slide-active .banner-content');
            activeSlide.style.opacity = 0;
            activeSlide.style.transform = 'translateY(20px)';
            setTimeout(() => {
                activeSlide.style.opacity = 1;
                activeSlide.style.transform = 'translateY(0)';
            }, 100);
        }
    }
});

// 스크롤에 따른 애니메이션
document.addEventListener('scroll', function () {
    const ingredientsSection = document.querySelector('.ingredients-section');
    const productsSection = document.querySelector('.products-section');
    const blogSection = document.querySelector('.blog-section');

    const fadeInOnScroll = (element) => {
        const rect = element.getBoundingClientRect();
        const screenHeight = window.innerHeight;

        if (rect.top < screenHeight - 100) {
            element.classList.add('fade-in');
        }
    };

    fadeInOnScroll(ingredientsSection);
    fadeInOnScroll(productsSection);
    fadeInOnScroll(blogSection);
});
