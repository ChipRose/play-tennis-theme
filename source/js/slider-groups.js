import Swiper, { Navigation, Pagination, Controller } from 'swiper';
import 'swiper/css/bundle';

Swiper.use([Navigation, Pagination, Controller]);

const mainSliderSelector = '.groups-slider__images-block';
const navSliderSelector = '.groups-slider__descriptions-block';

const sliderImage = document.querySelector(mainSliderSelector);
const sliderDescription = document.querySelector(navSliderSelector);

if (sliderImage && sliderDescription) {
  const mainSliderOptions = {
    navigation: {
      nextEl: '#swiper-groups-button-next',
      prevEl: '#swiper-groups-button-prev',
    },
    pagination: {
      el: '#swiper-groups-pagination',
      clickable: true,
    },
    loop: true,
    spaceBetween: 10,
  };

  const mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

  const navSliderOptions = {
    loop: true,
    spaceBetween: 10,
  };

  const navSlider = new Swiper(navSliderSelector, navSliderOptions);

  mainSlider.controller.control = navSlider;
  navSlider.controller.control = mainSlider;
}
