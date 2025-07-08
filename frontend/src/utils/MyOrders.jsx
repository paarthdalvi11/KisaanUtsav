import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MyOrders.css';


const MyOrders = () => {
    const userData = localStorage.getItem('currentUser');
    const user = userData ? JSON.parse(userData) : null;
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3500/userorders', {
                params: {
                    username: user.username,
                },
            });
            console.log(response);
            setData(response.data.orders || []);
        } catch (err) {
            console.log("Error fetching orders:", err.message);
        }
    };

    useEffect(() => {
        if (user) fetchOrders();
    }, [user]);

    return (
        <div style={{ padding: "1rem" }}>
            {!user ? (
                <h2>Kindly login to see orders</h2>
            ) : (
                <div className='order-container'>
                    <h1>My Orders</h1>
                    {data.length === 0 ? (
                        <p>No orders found</p>
                    ) : (
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                            {data.map((order, index) => (
                                <li key={index} style={{ marginBottom: "1.5rem" }}>
                                    <h2>Order {index + 1}</h2>
                                    <p>
                                        {(order.cartItems || []).map((item, i) => (
                                            <span key={i}>
                                                {item.name} x {item.quantity}
                                                <br />
                                                {i !== order.cartItems.length - 1 && " "}

                                            </span>
                                        ))}
                                    </p>
                                    <br />
                                    <p><b>Total Items: {order.cartItems?.length || 0}</b></p>
                                    <p><b>Total: ₹{order.cartTotal ?? "N/A"}</b></p>
                                    <p><b>Status: {order.status ?? "Pending"}</b></p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
