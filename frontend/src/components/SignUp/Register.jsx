import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Login from './Login';
import Loading from '../../utils/Loading.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import './Register.css';

const Register = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [retypePass, setRetypePass] = useState('');
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const notifyError = (msg) => toast.error(msg, { position: 'top-center' });
    const notifyWarning = (msg) => toast.warn(msg, { position: 'top-center'})
    const notifySuccess = (msg) => toast.success(msg, { position: 'top-center' });

    const isPassMatch = (pass, rePass) => {
        if (pass !== rePass) {
            setPass('');
            setRetypePass('');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !email || !pass){
            return;
        }
        
        if (!isPassMatch(pass, retypePass)){
            notifyWarning('Password and confirm password should be same')
            return;
        }

        const user = {
            firstName : firstName,
            lastName : lastName,
            location : location || 'India',
            email: email,
            username: username,
            password: pass
        };

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3500/register', user);
                notifySuccess(`${user.username} has been registered`)
                console.log(response + '\nregistered');
                setUsername('');
                setEmail('');
                setPass('');
                setRetypePass('');
                setLocation('')
                setFirstName('')
                setLastName('')
                setLoading(false);
        } catch (error) {
            notifyError("Couldn't register user");
            setLoading(false);
        }
    };

    return (
        <div className='full'>
            <form className='page'>
                {/* <label htmlFor="firstName">First name:</label> */}
                <div className='name-input'>
                    <input  
                        placeholder='First Name:'
                        required
                        type='text'
                        id='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='input1'
                        title='Enter your first name'
                    />
                    {/* <label htmlFor="username">Username:</label> */}
                    <input  
                        placeholder='Last Name:'
                        required
                        type='text'
                        id='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='input1'
                        title='Enter your last name'
                    />
                </div>
                {/* <label htmlFor="username">Username:</label> */}
                    <input  
                    placeholder='Username:'
                    required
                    type='text'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='input1'
                    title='Enter your username'
                />
                {/* <label htmlFor="email">Email:</label> */}
                <input  
                    placeholder='Email:'
                    required
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='input1'
                    title='Enter your email'
                />
                {/* <label htmlFor="location">Location:</label> */}
                <input  
                    placeholder='Location:'
                    required
                    type='text'
                    id='location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className='input1'
                    title='Enter your location'
                />
                {/* <label htmlFor="pass">Password:</label> */}
                <div className='password-input'>
                    <input
                        placeholder='Password:'
                        required
                        type='password' 
                        id='pass'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className='input1'
                        title='Enter password'
                    />
                    {/* <label htmlFor="retype-pass">Confirm Password:</label> */}
                    <input
                        placeholder='Confirm Password:'
                        required
                        type='password' 
                        id='retype-pass'
                        value={retypePass}
                        onChange={(e) => setRetypePass(e.target.value)}
                        className='input1'
                        title='Enter password to confirm'
                    />
                </div>
                <button className='regbutton' type='submit' onClick={handleSubmit}>Register</button>
            </form>
            {loading && <Loading />}
            <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} />
        </div>
    );
};

export default Register;