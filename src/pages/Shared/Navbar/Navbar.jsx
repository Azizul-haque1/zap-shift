import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { FaArrowRight } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useAuth()
    const links = <>
        <li><NavLink>Services</NavLink></li>
        <li><NavLink to='/send-parcel'>Send Parcel</NavLink></li>
        <li><NavLink to='/rider'>Be a Rider</NavLink></li>
        <li><NavLink to='/coverage'>Coverage Areas</NavLink></li>
        {

            user && <>
                <li><NavLink to='/dashboard/my-parcels'>My Parcels</NavLink></li>
                <li><NavLink to='/dashboard/'>Dashboard</NavLink></li>
            </>
        }
        <li><NavLink to='/about'>About Us</NavLink></li>
    </>

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error);
            })

    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                        {links}
                    </ul>
                </div>
                <span className="btn btn-ghost text-xl">
                    <Logo />
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}

                </ul>
            </div>
            <div className="navbar-end">

                {
                    user ? <a onClick={handleLogOut} className="btn">Log Out</a>
                        : <Link to='/login' className="btn">Login</Link>
                }


                <div className=' ml-3 flex items-center '>
                    <Link to='/rider' className="btn  rounded-xl  bg-primary text-sm font-bold">Be A Rider</Link>
                    <div className="h-11 w-11 bg-[#1F1F1F] flex items-center justify-center rounded-full" >
                        <FaArrowRight className='text-primary -rotate-45' />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;