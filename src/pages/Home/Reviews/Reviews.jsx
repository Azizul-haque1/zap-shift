import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Reviews = ({ reviewsePromise }) => {
    const reviews = use(reviewsePromise)
    console.log(reviews);
    return (
        <div className='my-10 '>

            <div className="text-center mb-24 ">
                <h3 className="text-3xl text-center">Reviews</h3>
                <p>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '30%',
                    depth: 200,
                    modifier: 1,
                    scale: .75,
                    slideShadows: true,
                }}

                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >

                {reviews.map(review => <SwiperSlide key={review.id}>
                    <ReviewCard review={review} />
                </SwiperSlide>)}

            </Swiper>


        </div>
    );
};

export default Reviews;