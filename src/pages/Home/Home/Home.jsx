import React from 'react';
import Banner from '../Banner/Banner';
import HowItWork from '../HowItWork/HowItWork';
import OurServices from '../OurServices/OurServices';
import Brands from '../Brands/Brands';
import DeliveryWorkFlow from './DeliveryWorkflow/DeliveryWorkFlow';
import Reviews from '../Reviews/Reviews';
import Forbidden from '../../../components/Forbidden/Forbidden';



const reviewsePromise = fetch('/reviews.json').then(res => res.json())

const Home = () => {
    return (
        <div className='mt-8'>
            <Banner />
            <HowItWork />
            <OurServices />
            <Brands />
            <DeliveryWorkFlow />
            <Reviews reviewsePromise={reviewsePromise} />
        </div>
    );
};

export default Home;