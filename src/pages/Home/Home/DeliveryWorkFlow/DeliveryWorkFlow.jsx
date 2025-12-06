import React from 'react';
import trakingParcel from '../../../../assets/live-tracking.png'
import safeDelivery from '../../../../assets/safe-delivery.png'


const DeliveryWorkFlow = () => {
    return (
        <div>
            <div className="mt-24 grid-cols-1 grid gap-6 py-20 border-y border-dashed">
                <div className=" flex items-center  gap-10
                p-8 bg-white rounded-4xl font-bold">
                    <div className="image border-r border-dashed p-2">
                        <img src={trakingParcel} alt="" />

                    </div>
                    <div className="content">
                        <h2 className="text-2xl text-secondary mb-2">Live Parcel Tracking</h2>
                        <p className='text-normal text-[#606060]'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>

                    </div>
                </div>
                <div className=" flex items-center  gap-10
                p-8 bg-white rounded-4xl font-bold">
                    <div className="image border-r border-dashed p-2">
                        <img src={safeDelivery} alt="" />

                    </div>
                    <div className="content">
                        <h2 className="text-2xl text-secondary mb-2">100% Safe Delivery</h2>
                        <p className='text-normal text-[#606060]'>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time..</p>

                    </div>
                </div>
                <div className=" flex items-center  gap-10
                p-8 bg-white rounded-4xl font-bold">
                    <div className="image border-r border-dashed p-2">
                        <img src={safeDelivery} alt="" />

                    </div>
                    <div className="content">
                        <h2 className="text-2xl text-secondary mb-2">24/7 Call Center Support</h2>
                        <p className='text-normal text-[#606060]'>
                            Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.
                        </p>

                    </div>
                </div>


            </div>

        </div>
    );
};

export default DeliveryWorkFlow;