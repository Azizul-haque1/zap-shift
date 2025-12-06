import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import rider from '../../assets/agent-pending.png'
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {

    const { register, handleSubmit, control,
        // formState: { errors } 
    } = useForm()

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()

    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const region = useWatch({ control, name: 'region' });

    // console.log(regions);
    // console.log(regionsDuplicate);

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts;
    }

    const handleRiderApplication = (data) => {
        console.log(data)
        // submit application
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your application has been submitted. We will reach to you in 40 days",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

            })



    }

    return (
        <div className='py-20 bg-white px-24 rounded-4xl mt-8 '>
            <h2 className="text-6xl font-bold ">Be a  Rider</h2>
            <p className='mt-2 w-3/5 text-gray-500'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className="flex items-center justify-between">
                <form className='w-full flex-1' onSubmit={handleSubmit(handleRiderApplication)}>
                    <h4 className="text-2xl font-semibold">  Tell us about yourself</h4>
                    <div className="flex gap-4 w-full justify-between">
                        <fieldset class="fieldset w-full">
                            {/*   Name */}
                            <label class="label">  Name</label>
                            <input type="text"
                                defaultValue={user?.displayName}
                                {...register('name')}
                                class="input w-full"
                                placeholder="  Name" />


                            {/*  region */}
                            <fieldset className="fieldset ">
                                <legend className="fieldset-legend">  Regions</legend>
                                <select {...register('region')} defaultValue="Pick a Region" className="select w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((region, i) => <option key={i} value={region}>{region}</option>)
                                    }
                                </select>
                            </fieldset>


                            {/*   Email */}
                            <label class="label">  Email</label>
                            <input type="email"
                                defaultValue={user?.email}
                                {...register('email')}
                                class="input w-full"
                                placeholder="  Email" />
                        </fieldset>
                        <fieldset class="fieldset w-full">


                            {/*   Nid */}
                            <label class="label">  NID No</label>
                            <input type="text"
                                {...register('nid')}
                                class="input w-full"
                                placeholder="  Nid" />


                            {/*  districts */}
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">  districts</legend>
                                <select {...register('district')} defaultValue="Pick a district" className="select w-full">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtsByRegion(region).map((d, i) => <option key={i} value={d} >{d}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/*  phone no */}
                            <label class="label">  Phone No</label>
                            <input type="text"
                                {...register('phoneNo')}
                                class="input w-full"
                                placeholder="  Phone No" />

                        </fieldset>
                    </div>


                    <button className="btn text-white btn-primary mt-10 w-full">Submit</button>
                </form>

                <div className="flex-1 w-full">
                    <img src={rider} alt="" />

                </div>

            </div>

        </div>
    );
};

export default Rider;