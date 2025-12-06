import React from 'react';
import notFound from '../../assets/notFound.png'
import { Link } from 'react-router';
const NotFound = () => {
    return (
        <div className='mt-24 py-20 flex justify-center  items-center bg-white rounded-4xl'>

            <div className=" text-center ">
                <img src={notFound} alt="" />
                <Link to='/' className='btn btn-primary border-none text-white font-bold'>Go Home</Link>

            </div>
        </div>
    );
};

export default NotFound;