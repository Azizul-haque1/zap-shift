import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React from 'react';

const About = () => {
    return (
        <div className='mt-10  bg-white py-20 rounded-4xl px-24 '>
            <div className="border-b pb-12 border-gray-300">
                <h3 className="text-4xl font-extrabold mt-20 mb-4 ">About Us</h3>
                <p className='text-base-300'> Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

            <div className="">
                <TabGroup>
                    <TabList className='flex gap-4 px-3 py-3'>
                        <Tab
                            className="rounded-full px-3 py-1 text-sm/6 font-semibold not-data-focus:text-secondary 
                            focus:not-data-focus:outline-none  data-focus:text-white data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-secondary data-selected:data-hover:bg-secondary data-selected:text-white"
                        >Story


                        </Tab>
                        <Tab
                            className="rounded-full px-3 py-1 text-sm/6 font-semibold not-data-focus:text-secondary 
                            focus:not-data-focus:outline-none  data-focus:text-white data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-secondary data-selected:data-hover:bg-secondary data-selected:text-white"
                        >Mission</Tab>
                        <Tab
                            className="rounded-full px-3 py-1 text-sm/6 font-semibold not-data-focus:text-secondary 
                            focus:not-data-focus:outline-none  data-focus:text-white data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-secondary data-selected:data-hover:bg-secondary data-selected:text-white"
                        >Success</Tab>
                        <Tab
                            className="rounded-full px-3 py-1 text-sm/6 font-semibold not-data-focus:text-secondary 
                            focus:not-data-focus:outline-none  data-focus:text-white data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-secondary data-selected:data-hover:bg-secondary data-selected:text-white"
                        >Team & Others</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                            <p>We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                            <p>We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                            <p>We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                        </TabPanel>
                        <TabPanel>Content 2</TabPanel>
                        <TabPanel>Content 3</TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>


        </div>
    );
};

export default About;