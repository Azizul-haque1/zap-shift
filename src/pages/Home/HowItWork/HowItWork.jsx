import React from 'react';
import { TbTruckDelivery } from 'react-icons/tb';

const HowItWork = () => {
    return (
        <div className='mt-24'>
            <h1 className='text-secondary text-3xl font-extrabold mb-8'>How it Works</h1>


            {/* card */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white space-y-5  p-8 rounded-2xl">
                    <TbTruckDelivery size={50} />
                    <h2 className='text-secondary text-xl font-bold'>Booking Pick & Drop</h2>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className="bg-white space-y-5  p-8 rounded-2xl">
                    <TbTruckDelivery size={50} />
                    <h2 className='text-secondary text-xl font-bold'>Booking Pick & Drop</h2>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className="bg-white space-y-5  p-8 rounded-2xl">
                    <TbTruckDelivery size={50} />
                    <h2 className='text-secondary text-xl font-bold'>Booking Pick & Drop</h2>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className="bg-white space-y-5  p-8 rounded-2xl">
                    <TbTruckDelivery size={50} />
                    <h2 className='text-secondary text-xl font-bold'>Booking Pick & Drop</h2>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>


            </div>

        </div>
    );
};

export default HowItWork;