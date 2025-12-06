import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure()
    const riderModalRef = useRef()
    const [selecetedParcel, setSelectedParcel] = useState(null)

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending_pickup')
            return res.data
        }
    })

    // todo: invvalidate query after assigning a rider
    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selecetedParcel?.senderDistrict, 'available'],
        enabled: !!selecetedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selecetedParcel.senderDistrict}&workStatus=available`);
            return res.data
        }
    })

    const opneRiderModal = (parcel) => {
        setSelectedParcel(parcel)
        riderModalRef.current.showModal()
    }

    const handleAssingRider = (rider) => {
        const assignRiderInfo = {
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
            parcelId: selecetedParcel._id,
            trackingId: selecetedParcel.trackingId,
        }
        console.log(assignRiderInfo);

        axiosSecure.patch(`/parcels/${selecetedParcel._id}`, assignRiderInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close()
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Rider status is set to ${status} `,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })

    }
    return (
        <div>

            <h2 className="text-4xl py-10 px-10">Assign Riders {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SI</th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td><button onClick={() => opneRiderModal(parcel)} className="btn btn-primary text-black">Find Rider</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Riders:  {riders.length}</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SI</th>
                                    <th>Name</th>
                                    <th>Cost</th>
                                    <th>Job</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    riders.map((rider, i) => <tr>
                                        <th>{i + 1}</th>
                                        <td>{rider.name}</td>
                                        <td>{rider.cost}</td>
                                        <td>{rider.email}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAssingRider(rider)}
                                                className="btn-primary btn text-black">Assing Rider</button>
                                        </td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;