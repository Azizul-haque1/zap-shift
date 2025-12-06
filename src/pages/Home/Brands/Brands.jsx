import React from 'react';
import 'swiper/css';
import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';


const brandsLogs = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people];


const Brands = () => {
    return (
        <div className="">
            <h1 className='text-3xl font-bold mt-24 mb-10 text-center'>We've helped thousands of sales teams</h1>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false
                }}
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                translate='yes'
                grabCursor={true}
                modules={[Autoplay]}
            >
                {
                    brandsLogs.map((logo, index) => <SwiperSlide key={index}>
                        <img src={logo} alt="" />
                    </SwiperSlide>)
                }
            </Swiper>


        </div>
    );
};

export default Brands;