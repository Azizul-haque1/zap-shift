import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserAltSlash, FaUserShield } from "react-icons/fa";
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('')

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`)
            return res.data;
        }
    })


    const handleMakeAdmin = user => {
        const roleInfo = {
            role: 'admin'
        }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${user.displayName} maked as an admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    const handleRemoveAdmin = user => {
        const roleInfo = {
            role: 'user'
        }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${user.displayName} Remove form admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    return (
        <div>
            <h2 className="text-4xl">Manage Users: {users.length}</h2>

            {/* search bar */}
            <div className="py-10">
                <p>Search text: {searchText}</p>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        onChange={(e) => setSearchText(e.target.value)}
                        className="grow"
                        placeholder="Search User" />

                </label>


            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SI
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, i) => <tr>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName || ''}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role}
                                </td>
                                <td>

                                    {
                                        user.role === 'admin' ?
                                            <button
                                                onClick={() => handleRemoveAdmin(user)}
                                                className='btn bg-red-400 text-white'>
                                                <FaUserAltSlash />
                                            </button>
                                            : <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className='btn bg-green-500 text-white'>
                                                <FaUserShield />

                                            </button>

                                    }


                                </td>
                                <th>
                                    actions
                                </th>
                            </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UsersManagement;