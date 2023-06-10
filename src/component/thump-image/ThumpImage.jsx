import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./thumpImage.scss";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ThumpImage({ images }) {
   const [thumbsSwiper, setThumbsSwiper] = useState(null);
   console.log(images);
   return (
      <>
         {images && (
            <>
               <Swiper
                  style={{
                     "--swiper-navigation-color": "#fff",
                     "--swiper-pagination-color": "#fff",
                  }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{
                     swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                           ? thumbsSwiper
                           : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
               >
                  {images.map((image, i) => (
                     <SwiperSlide key={image.id}>
                        <img src={image.imgUrl} alt="" />
                     </SwiperSlide>
                  ))}
               </Swiper>
               <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={1}
                  slidesPerView={5}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
               >
                  {images.map((image, i) => (
                     <SwiperSlide key={image.id}>
                        <img src={image.imgUrl} alt="" />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </>
         )}
      </>
   );
}
