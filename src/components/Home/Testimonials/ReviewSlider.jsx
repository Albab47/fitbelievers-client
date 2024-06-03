import { IoMdQuote } from "react-icons/io";
import reviews from "../../../../public/reviews.json";
import { Avatar } from "flowbite-react";

const ReviewSlider = () => {
  return (
    <swiper-container
      class="mySwiper"
      pagination="true"
      navigation="true"
      loop="true"
      autoplay-delay="5000"
      pagination-clickable="true"
      space-between="30"
      breakpoints={JSON.stringify({
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      })}
    >
      {reviews.map((review, idx) => (
        <swiper-slide key={idx}>
          <div className="relative p-8 rounded-lg bg-gray-50">
            <p className="leading-loose text-gray-500 dark:text-gray-400">
            “{review.content}”
            </p>

            <div className="flex items-center mt-8 -mx-2">
              <Avatar rounded />

              <div className="mx-2">
                <h1 className="font-semibold text-gray-800 dark:text-white">
                  {review.name}
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {review.designation}
                </span>
              </div>
            </div>

            <div className="absolute z-30 left-0 right-0 m-auto -bottom-5 drop-shadow-xl bg-white size-12 flex items-center justify-center rounded-full">
              <IoMdQuote className="text-primary size-8" />
            </div>
          </div>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default ReviewSlider;
