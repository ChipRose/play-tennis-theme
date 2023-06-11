import Swiper, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination]);

const sliderSelector = '.slider';

const sliderOptions = {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: true,
  spaceBetween: 10,
};

new Swiper(sliderSelector, sliderOptions);

