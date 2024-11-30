var swiper = new Swiper('.swiper-container', {
    effect: 'fade', 
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000, 
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
