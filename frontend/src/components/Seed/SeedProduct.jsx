import React, { useState } from 'react';
import './Seed.css'; // Import CSS file

const SeedProduct = ({ seed, addToCart, addToWishList, handleConfirmAddress }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [addressConfirmed, setAddressConfirmed] = useState(true);

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        setSelectedQuantity(value > 0 && Number.isInteger(value) ? value : 1);
    };
    // const handleQuantityChange = (value) => {
    //     setSelectedQuantity((prevQuantity) => {
    //         const newValue = prevQuantity + value;
    //         if (newValue >= 1 && newValue <= 10) {
    //             return newValue;
    //         } else if (newValue < 1) {
    //             return 1;
    //         } else {
    //             return 10;
    //         }
    //     });
    // };
    
    return (
        <div className="seed-container">
            <h3 className="seed-name">{seed.name}</h3>
            <p className="seed-type"><strong>Type:</strong> {seed.type}</p>
            <p className="seed-price"><strong>Price:</strong> {seed.price}</p>
            <p className="seed-total"><strong>Total Price:</strong> {seed.price * selectedQuantity}</p>
            <p className="seed-distributor">
                <strong>Distributed by:</strong> {seed.distributer ? seed.distributer : 'No distributor added'}
            </p>
            <input
                type="number"
                min="1"
                max={10}
                value={selectedQuantity}
                onChange={handleQuantityChange}
                className="seed-quantity"
            />
            <div className="btn-container">
                <button onClick={() => addToCart(seed, selectedQuantity)} className="seed-btn">Add To Cart</button>
                <button onClick={() => addToWishList(seed)} className="seed-btn">Add to Wishlist</button>
            </div>
        </div>
    );
};

export default SeedProduct;