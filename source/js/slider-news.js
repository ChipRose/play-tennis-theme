import Swiper, {  Pagination, Controller } from 'swiper';
import 'swiper/css/bundle';

Swiper.use([ Pagination, Controller]);

const newsSliderSelector = '.news-slider';

const newsSlider = document.querySelector(newsSliderSelector);

if (newsSlider) {
  const newsSliderOptions = {
    pagination: {
      el: '#swiper-news-pagination',
      clickable: true,
    },
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      768: {
        loop: false,
        slidesPerView: 3,
      }
    }
  };
  new Swiper(newsSliderSelector, newsSliderOptions);
}

