import React from 'react';

const FertilizerItem = ({ item, removeFromWishlist}) => {
    return (
        <div className='item-card'>
            <h3 className="item-name">{item.name}</h3>
            <div className="specs">
                <p><b>Price: </b>₹ {item.price}</p>
                <p><b>Description: </b>{item.discription}</p>
            </div>
            <div className="buttonContainer">
                <button className="removeBtn" onClick={() => removeFromWishlist(item.name, 'fertilizer')}>Remove</button>
            </div>
        </div>
    );
};
    
export default FertilizerItem;
