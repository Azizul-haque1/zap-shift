import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAlert from '../../../hooks/userAlert';

const AssignedDeliveries = () => {
    const showAlert = useAlert()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`)
            return res.data
        }
    })

    const handleStatusUpdate = (parcel, status) => {

        const message = `Parcel status updated with ${status.replaceAll('_', ' ')}`
        console.log(message);
        const statusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId,
        }
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    showAlert({
                        title: message,
                    })

                }
            })
            .catch(err => console.log(err))

    }
    return (
        <div>
            <h2 className="text-4xl">Parcel pending pickup</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Confirm</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>
                                    {
                                        parcel.deliveryStatus === 'driver_assigned' ? (

                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(parcel, 'rider_arriving')}
                                                    className="btn btn-primary text-black mr-2">Accept</button>
                                                <button className="btn btn-warning text-black">Reject</button></>

                                        ) : <span className='font-bold'>{parcel.deliveryStatus} </span>
                                    }

                                </td>
                                <td>

                                    <button
                                        onClick={() => handleStatusUpdate(parcel, 'parcel_picked_up')}
                                        className="btn btn-primary text-black mr-2">Mark as picked up</button>

                                    <button
                                        onClick={() => handleStatusUpdate(parcel, 'parcel_delivered')}
                                        className="btn btn-primary text-black mr-2">Mark as delivered</button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AssignedDeliveries;