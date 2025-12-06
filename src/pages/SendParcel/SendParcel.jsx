import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { register, handleSubmit, control,
        // formState: { errors } 
    } = useForm()

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()

    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })
    // console.log(regions);
    // console.log(regionsDuplicate);

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts;
    }


    const handleSendParcel = (data) => {
        console.log(data);
        const isDocument = data.parcelType === 'document'
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;

        let cost = 0;
        const parcelWeight = parseFloat(data.parcelWeight)
        console.log(parcelWeight);

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150
            }
            else {
                const minimunCost = isSameDistrict ? 110 : 150
                const extraWeight = parcelWeight - 3
                const extracharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minimunCost + extracharge

            }
        }

        console.log('cost', cost);
        data.cost = cost;


        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.insertedId) {
                            // navigate('/dashboard/my-parcels')

                            // Swal.fire({
                            //     position: "top-end",
                            //     icon: "success",
                            //     title: "Parcel has created, Please pay",
                            //     showConfirmButton: false,
                            //     timer: 2500
                            // });
                            console.log('d');

                        }
                    })
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });


    }


    return (
        <div>
            <h2 className="text-5xl font-bold">Add Parcel</h2>

            <form className='mt-12 p-4 text-black' onSubmit={handleSubmit(handleSendParcel)}>

                {/* parcel type  */}
                <div className="">
                    <label class="label mr-4">
                        <input type="radio" {...register('parcelType')} value='document'
                            className="radio" defaultChecked />
                        Document</label>
                    <label class="label">
                        <input type="radio" {...register('parcelType')} value='non-document'
                            className="radio" />
                        Non-Document</label>


                </div>

                {/* parcel info : name, weight */}
                <div className="grid grid-cols-1  md:grid-cols-2 gap-4 my-8 ">
                    <fieldset class="fieldset">
                        <label class="label">Parcel Name</label>
                        <input type="text"
                            {...register('parcelName')}
                            class="input w-full"
                            placeholder="Parcel Name" />


                    </fieldset>
                    <fieldset class="fieldset">
                        <label class="label">Parcel Weight</label>
                        <input type="text"
                            {...register('parcelWeight')}
                            class="input w-full"
                            placeholder="Parcel Weight" />


                    </fieldset>

                </div>


                {/* tow column */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* sender Details */}
                    <fieldset class="fieldset">
                        <h4 className="text-2xl font-semibold">Sender Details</h4>

                        {/* Sender Name */}
                        <label class="label">Sender Name</label>
                        <input type="text"
                            defaultValue={user?.displayName}
                            {...register('senderName')}
                            class="input w-full"
                            placeholder="Sender Name" />

                        {/* Sender Email */}
                        <label class="label">Sender Email</label>
                        <input type="email"
                            defaultValue={user?.email}
                            {...register('senderEmail')}
                            class="input w-full"
                            placeholder="Sender Email" />

                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((region, i) => <option key={i} value={region}>{region}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender districts</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d} >{d}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* sender address */}
                        <label class="label mt-4">Sender Address</label>
                        <input type="text"
                            {...register('senderAdress')}
                            class="input w-full"
                            placeholder="Sender Adress" />

                        {/* sender phone no */}
                        <label class="label mt-4">Sender Phone No</label>
                        <input type="text"
                            {...register('senderPhoneNo')}
                            class="input w-full"
                            placeholder="Sender Phone No" />


                    </fieldset>

                    {/* recevier Details */}
                    <fieldset class="fieldset">
                        <h4 className="text-2xl font-semibold">Recevier Details</h4>

                        {/* Recevier Name */}
                        <label class="label">Recevier Name</label>
                        <input type="text"
                            {...register('recevierName')}
                            class="input w-full"
                            placeholder="Recevier Name" />

                        {/* Recevier email */}
                        <label class="label">Recevier Email</label>
                        <input type="email"
                            {...register('recevierEmail')}
                            class="input w-full"
                            placeholder="Recevier Email" />

                        {/* Receiver region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Regions</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((region, i) => <option key={i} value={region}>{region}</option>)
                                }
                            </select>
                        </fieldset>





                        {/* Receiver District */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver District</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* recevier address */}
                        <label class="label mt-4">Recevier Address</label>
                        <input type="text"
                            {...register('recevierAdress')}
                            class="input w-full"
                            placeholder="Recevier Adress" />

                        {/* recevier phone no */}
                        <label class="label mt-4">Recevier Phone No</label>
                        <input type="text"
                            {...register('recevierPhoneNo')}
                            class="input w-full"
                            placeholder="Recevier Phone No" />


                    </fieldset>
                </div>

                <button type='submit' className='btn btn-primary text-black'>Send Parcel</button>
            </form>
        </div>
    );
};

export default SendParcel;