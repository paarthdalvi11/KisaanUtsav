import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './placeOrder.css';

const PlaceOrder = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const usenavigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        usenavigate('/signup')
    }
    const nottifyError = (msg) => toast.error(msg, { position: 'top-center'})       

    const fetchData = async () => {
        try {
            const cartItemsResponse = await axios.get('http://localhost:3500/getCart', {
                params : {
                    username : user.username
                }
            });
            console.log(cartItemsResponse);
            setCartItems(cartItemsResponse.data || []);

            const cartTotalResponse = await axios.get('http://localhost:3500/getCartTotal', {
                params : {
                    username : user.username
                }
            });
            console.log(cartTotalResponse);
            setCartTotal(cartTotalResponse.data || 0);
        } catch (error) {
            nottifyError(error.message);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const [formData, setFormData] = useState({ 
        username: user.username,
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        phone_number: ''
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const placeOrderHandler = async (e) => {
        e.preventDefault()
        try {
            const addResponse = await axios.post('http://localhost:3500/addaddress', {
                username: formData.username,
                address_line1: formData.address_line1,
                address_line2: formData.address_line2,
                city: formData.city,
                state: formData.state,
                postal_code: formData.postal_code,
                phone_number: formData.phone_number
            });
            console.log(addResponse); 

            const orderResponse = await axios.post('http://localhost:3500/order', {
                username : user.username,
                cartItems : cartItems,
                cartTotal : cartTotal
            })
            console.log(orderResponse);
            if (orderResponse.data.success) {
                const { session_url } = orderResponse.data
                window.location.replace(session_url)
            }
            else {
                nottifyError('Error occured')
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    // useEffect(() => {
    //     if(cartItems.length === 0) {
    //         usenavigate('/cart')
    //     }
    // })
    return (
        <div>
            <h1>Place Your Order</h1>
            <div className='contain'>
                <form onSubmit={placeOrderHandler}>
                    <label htmlFor="address_line1">Address Line 1:</label>
                    <input
                        type="text"
                        id="address_line1"
                        name="address_line1"
                        value={formData.address_line1}
                        onChange={onChangeHandler}
                        required
                    />

                    <label htmlFor="address_line2">Address Line 2:</label>
                    <input
                        type="text"
                        id="address_line2"
                        name="address_line2"
                        value={formData.address_line2}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={onChangeHandler}
                        required
                    />

                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={onChangeHandler}
                        required
                    />

                    <label htmlFor="postal_code">Postal Code:</label>
                    <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={onChangeHandler}
                        required
                    />

                    <label htmlFor="phone_number">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={onChangeHandler}
                        required
                    />
                    

                    <button style={{ display : 'flex', justifyContent : 'center', alignItems : 'center'}} type="submit">Place Order</button>
                </form>
                <div className='summary'>
                {cartItems && cartTotal && (
                    <div>
                        {cartItems.map((item, index) => (
                            <li key={index}>{item.name} ({item.quantity}) : ₹{item.price * item.quantity}</li>
                        ))}
                        <h3>Cart Total: ₹{cartTotal}</h3>
                    </div>
                )}
            </div>
            </div>
            

            <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} />

        </div>
    );
};

export default PlaceOrder;
