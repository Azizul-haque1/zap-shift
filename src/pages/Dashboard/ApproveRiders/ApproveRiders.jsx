import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure()
    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data
        }
    })


    const updateRiderStatus = (rider, status) => {
        const updateInfo = {
            status: status,
            email: rider.email,

        }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Rider status is set to ${status} `,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    refetch()
                }
            })
            .catch(error => console.log(error))
    }

    const handleApproval = rider => {
        updateRiderStatus(rider, 'approved')

    }

    const handleRejection = rider => {
        updateRiderStatus(rider, 'rejected')
    }
    return (
        <div>
            <h2 className='text-4xl font-bold'>  Riders Pending Approvval :{riders.length}
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SI</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            riders.map(rider => <tr key={rider._id}>
                                <th>1</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>
                                <td>
                                    <p
                                        className={`${rider.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}
                                    >  {rider.status}</p>


                                </td>
                                <td>{rider.workStatus}</td>

                                <td>
                                    <button
                                        // onClick={() => handleApproval(rider)}
                                        className="btn">
                                        <FaEye></FaEye>

                                    </button>
                                    <button
                                        onClick={() => handleApproval(rider)}
                                        className="btn">
                                        <FaUserCheck />

                                    </button>
                                    <button
                                        onClick={() => handleRejection(rider)}
                                        className="btn">
                                        <IoPersonRemoveSharp />

                                    </button>
                                    <button className="btn">
                                        <FaTrashCan />

                                    </button>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;