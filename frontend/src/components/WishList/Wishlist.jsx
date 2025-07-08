import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FertilizerItem from "./FertilizerItem.jsx";
import SeedItem from "./SeedItem.jsx";
import PesticideItem from "./PesticideItem.jsx";
import Loading from '../../utils/Loading.jsx'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Set initial loading state
    const [user, setUser] = useState(null); // State to store user data
    const notifyError = (msg) => toast.error(msg, { position: 'top-center' });
    const notifyWarning = (msg) => toast.warn(msg, { position: 'top-center'})
    const notifySuccess = (msg) => toast.success(msg, { position: 'top-center' });
    const fetchData = async () => {
        try {
            const userData = localStorage.getItem("currentUser");
            const user = userData ? JSON.parse(userData) : null;
            if (!user) {
                throw new Error("User data not found in localStorage");
            }

            setUser(user); // Set the user data to state

            const response = await axios.get("http://localhost:3500/getWishlist", {
                params: {
                    username: user.username
                }
            });
            console.log(response);
            setWishlist(response.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error.message);
        } finally {
            setIsLoading(false); // Update loading state after data fetch
        }
    };

    const removeFromWishlist = async (name, type) => {
        try {
            const response = await axios.delete('http://localhost:3500/removeWishlist', {
                data : {
                    username: user.username,
                    name : name,
                    type : type
                }
            });
            console.log(response.data.message);
            // notifySuccess(`${name} removed from wishlist`)
            notifySuccess(response.data.message)
            fetchData(); // Refresh cart after removing item
        } catch (error) {
            notifyError('Error removing item from wishlist')
            console.error('Error removing item from wishlist:', error.response);
        }
    };

    const clearWishlist = async () => {
        try {
            await axios.delete('http://localhost:3500/clearWishList', {
                data : {
                    username: user.username
                }
            });
            setWishlist([])
            notifySuccess('Wishlist cleared succesfully')
            fetchData(); // Refresh cart after clearing
        } catch (error) {
            notifyError('Error while clearing wishlist')
            console.error('Error clearing cart:', error.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="main">
            <h1>Wishlist</h1>
            {user ? (
                isLoading ? (
                    <p style={{ display : "flex" , justifyContent : "center", alignItems : "center"}}><Loading/></p>
                ) : wishlist.length > 0 ? (
                    <ul className="item-container">
                        {wishlist.map((wishListItem, index) => (
                            wishListItem.type === 'seed' ? (
                                <SeedItem key={index} item={wishListItem} removeFromWishlist={removeFromWishlist}/>
                            ) : wishListItem.type === 'fertilizer' ? (
                                <FertilizerItem key={index} item={wishListItem} removeFromWishlist={removeFromWishlist}/>
                            ) : (
                                <PesticideItem key={index} item={wishListItem} removeFromWishlist={removeFromWishlist}/>
                            )
                        ))}
                        <button className="clearCart" onClick={clearWishlist}>Clear Wishlist</button>
                    </ul>
                ) : (
                    <p className="empty">No Items in The Wishlist</p>
                )
            ) : (
                <h2>Kindly Sign up To See The Wishlist</h2>
            )}
            <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} />

        </div>
    );
};

export default Wishlist;
