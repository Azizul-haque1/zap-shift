import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInUser, setLoading, } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()


    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                navigate(location?.state || '/')
                setLoading(false)
            })

            .catch(error => {
                setLoading(false)
                console.log(error);
            })



    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome Back</h3>
            <p className='text-center'>Please login</p>
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email"
                        {...register('email', { required: true })}
                        className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>
                        Email is required
                    </p>}
                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        className="input" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500'>Passowrd is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must  be 6 characters of  longer</p>}
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>New to Zap Shift <Link to='/register' className='text-blue-500 underline'>Register</Link></p>
            </form>
            <SocialLogin />
        </div>
    );
};

export default Login;