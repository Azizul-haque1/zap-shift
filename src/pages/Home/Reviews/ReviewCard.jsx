import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, user_photoURL, review: testimonial } = review
    return (
        <div className="max-w-sm rounded-xl shadow-md bg-base-100 p-6 border border-gray-200">
            <FaQuoteLeft className="text-primary text-3xl mb-4" />

            <p className="text-gray-700 leading-relaxed mb-4">
                A posture corrector works by providing support and gentle alignment to
                your shoulders, back, and spine, encouraging you to maintain proper
                posture throughout the day.
            </p>

            <div className="border-t border-dashed my-4"></div>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary">
                    <img className='w-full rounded-full' src={user_photoURL} alt="" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">{userName}</h3>
                    <p className="text-sm text-gray-500">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;