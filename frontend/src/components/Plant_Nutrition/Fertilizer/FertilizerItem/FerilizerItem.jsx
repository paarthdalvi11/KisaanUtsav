import React, { useState } from 'react';
import './FertilizerItem.css';

const FertilizerItem = ({ fertilizer, addToCart, addToWishList }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        setSelectedQuantity(value > 0 && Number.isInteger(value) ? value : 1);
    };
    
    
    return (
        <div className="fertilizer-container">
            <h3 className="fertilizer-name">{fertilizer.name}</h3>
            <p className="fertilizer-price"><strong>Price: </strong>₹ {fertilizer.price}</p>
            <p className="fertilizer-product-price"><strong>Total Price: </strong>₹ {fertilizer.price * selectedQuantity}</p>
            <p className="fertilizer-desc">{fertilizer.disc}</p>
            <p className="fertilizer-weight"><strong>Weight: </strong>{fertilizer.weight} kg</p>
            <input
                type="number"
                min="1"
                max={10}
                value={selectedQuantity}
                onChange={handleQuantityChange}
                className="fertilizer-quantity"
            />
            <button onClick={() => addToCart(fertilizer, selectedQuantity)} className="fertilizer-btn">Add To Cart</button>
            <button onClick={() => addToWishList(fertilizer)} className="fertilizer-btn">Add to Wishlist</button>
        </div>
    );
};

export default FertilizerItem;
