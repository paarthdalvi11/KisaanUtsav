import React, { useState } from 'react';
import './PesticideItem.css'

const PesticideItem = ({ pesticide, addToCart, addToWishList }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        setSelectedQuantity(value > 0 && Number.isInteger(value) ? value : 1);
    };
    
    
    return (
        <div className="pesticide-product">
            <h3 className="pesticide-product-name">{pesticide.name}</h3>
            <p className="pesticide-product-price"><strong>Price: </strong>₹ {pesticide.price}</p>
            <p className="pesticide-product-price"><strong>Total Price: </strong>₹ {pesticide.price * selectedQuantity}</p>
            <p className="pesticide-product-desc">{pesticide.disc}</p>
            <p className="pesticide-product-weight"><strong>Weight: </strong>{pesticide.weight} kg</p>
            <input
                type="number"
                min="1"
                max={10}
                value={selectedQuantity}
                onChange={handleQuantityChange}
                className="pesticide-product-quantity"
            />
            <button onClick={() => addToCart(pesticide, selectedQuantity)} className="pesticide-product-btn">Add To Cart</button>
            <button onClick={() => addToWishList(pesticide)} className="pesticide-product-btn">Add to Wishlist</button>
        </div>
    );
};

export default PesticideItem;
