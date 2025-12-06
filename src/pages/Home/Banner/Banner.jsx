import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerImage1 from '../../../assets/banner/banner1.png'
import bannerImage2 from '../../../assets/banner/banner2.png'
import bannerImage3 from '../../../assets/banner/banner3.png'
import { FaArrowRight } from 'react-icons/fa';

const Banner = () => {
    return (
        <div>
            <Carousel

            // autoPlay={true}

            // infiniteLoop={true}
            >

                <div className=' relative'>

                    <img src={bannerImage1} />
                    <p className='top-2.5 absolute'></p>


                    <div className=' flex items-center  absolute bottom-1/5  left-1/14'>

                        <button className="btn  rounded-full bg-primary text-xl font-bold">Track Your Parcel</button>
                        <div className="h-11 w-11 bg-[#1F1F1F] flex items-center justify-center rounded-full" >
                            <FaArrowRight className='text-primary -rotate-45' />
                        </div>
                        <button className="btn font-bold ml-4">Be A Rider</button>
                    </div>

                </div>
                <div>
                    <img src={bannerImage2} />

                </div>
                <div>
                    <img src={bannerImage3} />

                </div>
            </Carousel>

        </div>
    );
};

export default Banner;