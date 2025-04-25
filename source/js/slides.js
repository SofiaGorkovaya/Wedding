document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.cong__content');
    const dots = document.querySelectorAll('.cong-page__number');
  
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = +dot.dataset.index;
  
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
  
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === index);
        });
      });
    });
});

const pages = document.querySelectorAll('.cong-page__number');
  const slides = document.querySelectorAll('.cong__content');
  const container = document.querySelector('.cong__slides');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    pages.forEach((page, i) => {
      page.classList.toggle('active', i === index);
    });

    // Измеряем новую высоту активного слайда
    const activeSlide = slides[index];
    const newHeight = activeSlide.offsetHeight;
    container.style.height = newHeight + 'px';
  }

  // Инициализация
  window.addEventListener('DOMContentLoaded', () => {
    const activeSlide = document.querySelector('.cong__content.active');
    container.style.height = activeSlide.offsetHeight + 'px';
  });

  pages.forEach(page => {
    page.addEventListener('click', () => {
      const index = parseInt(page.dataset.index);
      showSlide(index);
    });
});