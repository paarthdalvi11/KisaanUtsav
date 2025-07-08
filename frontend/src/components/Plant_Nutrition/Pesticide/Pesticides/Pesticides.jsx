import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PesticideItem from '../PesticideItem/PesticideItem';
import './Pesticides.css'

const Pesticide = () => {
    const [pesticides, setPesticides] = useState([]);
    const userData = localStorage.getItem('currentUser');
    const user = userData ? JSON.parse(userData) : null;

    const notifyError = (msg) => toast.error(msg, { position: 'top-center' });
    const notifyWarning = (msg) => toast.warn(msg, { position: 'top-center'})
    const notifySuccess = (msg) => toast.success(msg, { position: 'top-center' });

    const fetchPesticides = async () => {
        try {
            const response = await axios.get('http://localhost:3500/getAllPesticides');
            setPesticides(response.data);
        } catch (error) {
            notifyError(error.message);
        }
    };

    useEffect(() => {
        fetchPesticides();
    }, []);

    const addToCart = async (pesticide, quantity) => {
        try {
            if (user) {
                const response = await axios.post('http://localhost:3500/addToCart', {
                    username: user.username,
                    name: pesticide.name,
                    type: "pesticide",
                    quantity: quantity,
                });
                if (response.data.length === 0) {
                    <h1>Cart is empty</h1>
                }
                console.log(`${response.data} added to cart`);
                notifySuccess(`${pesticide.name} added to cart successfully`);
            }
            else {
                notifyWarning('Login to add items to Cart')
            }
            // navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    };

    const addToWishList = async (pesticide) => {
        try {
            if (user){
                const res = await axios.post('http://localhost:3500/addToWishlist', {
                    username: user.username,
                    name: pesticide.name,
                    type : "pesticide"
                });
                notifySuccess(`${pesticide.name} added to wishlist successfully`);
            }
            else {
                notifyWarning('Login to add items to Wishlist')
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className='pesticidemain'> 
            <ul className='arrange_pesti'>
                {pesticides.map((pesticide, index) => (
                    <li key={index}>
                        <PesticideItem
                            pesticide={pesticide}
                            addToCart={addToCart}
                            addToWishList={addToWishList}
                        />
                    </li>
                ))}
            </ul>
            <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} />
        </div>
    );
};

export default Pesticide;
