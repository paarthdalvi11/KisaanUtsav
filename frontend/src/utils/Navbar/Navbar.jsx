import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ setSearchTerm }) => {
    const location = useLocation();
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = () => {
        setSearchTerm(searchInput);
    };

    return (
        <div className="left-navbar">
            <ul className='navbar'>
                <NavItem to="/seeds" currentPath={location.pathname}>Seeds</NavItem>
                <NavItem to="/weather-forecast" currentPath={location.pathname}>Weather Forecast</NavItem>
                <NavItem to="/plant-nutrition" currentPath={location.pathname}>Plant Nutrition</NavItem>
                <NavItem to="/kisan-care" currentPath={location.pathname}>Kisan Care</NavItem>
                <NavItem to="/image-upload" currentPath={location.pathname}>Diseases</NavItem>
            </ul>
        </div>
    );
};

const NavItem = ({ to, currentPath, children }) => {
    const isActive = to === currentPath;
    return (
        <li className={`border ${isActive ? 'active' : ''}`}>
            <Link to={to}>{children}</Link>
        </li>
    );
};

export default Navbar;
