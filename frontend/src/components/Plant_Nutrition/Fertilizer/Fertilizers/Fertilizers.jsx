import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FertilizerItem from '../FertilizerItem/FerilizerItem';
import './Fertilizers.css'

const Fertilizer = () => {
    const [fertilizers, setFertilizers] = useState([]);
    const userData = localStorage.getItem('currentUser');
    const user = userData ? JSON.parse(userData) : null;

    const notifyError = (msg) => toast.error(msg, { position: 'top-center' });
    const notifyWarning = (msg) => toast.warn(msg, { position: 'top-center'})
    const notifySuccess = (msg) => toast.success(msg, { position: 'top-center' });
    const fetchFertilizers = async () => {
        try {
            const response = await axios.get('http://localhost:3500/getAllFertilizers');
            setFertilizers(response.data);
        } catch (error) {
            notifyError(error.message);
        }
    };

    useEffect(() => {
        fetchFertilizers();
    }, []);

    const addToCart = async (fertilizer, quantity) => {
        try {
            if (user) {
                const response = await axios.post('http://localhost:3500/addToCart', {
                    username: user.username,
                    name: fertilizer.name,
                    type: "fertilizer",
                    quantity: quantity,
                });
                if (response.data.length === 0) {
                    <h1>Cart is empty</h1>
                }
                console.log(`${response.data} added to cart`);
                notifySuccess(`${fertilizer.name} added to cart successfully`);
            }
            else {
                notifyWarning('Login to add items to Cart')
            }
            // navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    };

    const addToWishList = async (fertilizer) => {
        try {
            if (user){
                const res = await axios.post('http://localhost:3500/addToWishlist', {
                    username: user.username,
                    name: fertilizer.name,
                    type : "fertilizer"
                });
                notifySuccess(`${fertilizer.name} added to wishlist successfully`);
            }
            else {
                notifyWarning('Login to add items to Wishlist')
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className='mainclass'>
            <ul className="products">
                {fertilizers.map((fertilizer, index) => (
                    <li key={index}>
                        <FertilizerItem
                            fertilizer={fertilizer}
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

export default Fertilizer;
