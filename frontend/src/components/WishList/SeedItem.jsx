import React from 'react';

const SeedItem = ({ item, removeFromWishlist }) => {
    return (
        <div className='item-card'>
            <h3 className='item-name'>{item.name}</h3>
            <div className="specs">
                <p><b>Seed Type: </b>{item.seedType}</p>
                <p><b>Price: </b>₹{item.price}</p>
            </div>
            <div className="buttonContainer">
                <button className="removeBtn" onClick={() => removeFromWishlist(item.name, 'seed')}>Remove</button>
            </div>
        </div>
    );
};

export default SeedItem;
