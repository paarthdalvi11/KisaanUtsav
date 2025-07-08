import React, { useState } from 'react'; // Import useState from React
import './Header.css';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Navbar from '../Navbar/Navbar'

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false); // Use useState hook
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setShowDropdown(false);
        window.location.reload(); 
    };

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div className='container'>
            <div className='body'>
                <div style={{ display: "flex" }}>
                    <div className='head'>
                        <Link to='/'>
                            <img src="icon.jpg" alt="Description of the image" className='title' />
                        </Link>
                    </div>
                    <div className='left'>
                        <Navbar />
                    </div>
                    <div className='search-bar'>
                        <input className='inputser' type="text" placeholder="Search" />
                    </div>
                    <div className="search1" id="cart">
                        <Link to='/cart'>
                            <FaCartPlus className='search' />
                        </Link>
                    </div>
                    <div className="search1" id="wishlist">
                        <Link to='/wishlist'>
                            <FaHeart className='search' />
                        </Link>
                    </div>
                    <div className="search1" id="login" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        {user ? (
                            <div className="dropdown">
                                <LogoutIcon className='dropdown-logout-logo' title='Logout' />
                                {showDropdown && (
                                    <div className="dropdown-content">
{/* HEAD */}
                                        <Link to={'myorders'}>
                                            <button className='something'>My Orders</button>
                                        </Link>
                                        <button onClick={handleLogout} className='something'>Logout</button>

                                        <button className='dropdown-button' onClick={handleLogout}>Logout</button>
{/* 0f337b19af4adc9a3d52ccb4d2d64720f8596650 */}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to='/signup'>
                                <LoginIcon className='search' title='Login' />
                            </Link>
                        )}
                    </div>
                </div>
                <div className="horizontal-line"></div>
            </div>
        </div>
    );
}

export default Header;
