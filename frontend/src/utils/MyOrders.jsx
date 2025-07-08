import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
            setData(response.data.orders);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
            fetchOrders();
    }, []);

    return (
        <div>
            {!user ? (
                <h2>Kindly login to see orders</h2>
            ) : (
                <div>
                    <h1>My Orders</h1>
                    <ul>
                        {data.map((order, index) => {
                            return (
                                <div key={index}>
                                    <h2>Order {index+1}</h2>
                                    <p>{order.cart.map((item, index) => {
                                        if (index === order.cart.length - 1) {
                                            return item.name + " x " + item.quantity
                                        }
                                        else {
                                            return item.name+ " x " + item.quantity
                                        }
                                    })}</p>
                                    <p>Total Items : {order.cart.length} Total : {order.cartTotal}</p>
                                    <p><strong>{order.status}</strong></p>
                                    <hr />
                                </div>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
