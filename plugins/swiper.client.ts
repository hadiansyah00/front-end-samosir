import { Swiper, SwiperSlide } from "swiper/vue";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Swiper,
      SwiperSlide,
    },
  };
});
