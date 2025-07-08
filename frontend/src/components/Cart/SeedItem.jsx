import React from 'react';
import './cart.css';

const SeedItem = ({ item, quantity, removeFromCart}) => {
    return (
        <div className='item-card'>
            <h3 className='item-name'>{item.name}</h3>
            <div className="specs">
                <p><strong>Seed Type: </strong>{item.seedType}</p>
                <p><strong>Price: </strong>₹ {item.price}</p>
                <p><strong>Quantity: </strong>{quantity}</p>
                <p><strong>Total: </strong>₹ {item.price * quantity}</p>
            </div>
            <div className="buttonContainer">
                <button className="removeBtn" onClick={() => removeFromCart(item.name)}>Remove</button>
            </div>
        </div>
    );
};

export default SeedItem;
