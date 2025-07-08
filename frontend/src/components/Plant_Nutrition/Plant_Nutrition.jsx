import React, { useState } from 'react';
import Fertilizer from './Fertilizer/Fertilizers/Fertilizers';
import Pesticide from './Pesticide/Pesticides/Pesticides';
import './Plant_Nutrition.css';

const Plant_Nutrition = () => {
    const [tab, setTab] = useState('fertilizer');
    const [clickedButton, setClickedButton] = useState(null);

    const toggleTab = (page) => {
        setTab(page);
        setClickedButton(page);
    };

    return (
        <div className='butcontain'>

            <div className='plant-heading1'>
                {tab === 'fertilizer' ? <p>Fertilizers: Nourish Your Plants</p> : <p>Pesticides: Protect Your Plants</p>}
            </div>

            <div className='something'>
                <button 
                    className={`plantbut ${clickedButton === 'fertilizer' ? 'clicked' : ''}`} 
                    onClick={() => toggleTab('fertilizer')}
                >
                    Fertilizers
                </button>
                <button 
                    className={`plantbut ${clickedButton === 'pesticide' ? 'clicked' : ''}`} 
                    onClick={() => toggleTab('pesticide')}
                >
                    Pesticides
                </button>
            </div>

            <div className='present'>
                {tab === 'fertilizer' ? <Fertilizer /> : <Pesticide />}
            </div>
        </div>
    );
};

export default Plant_Nutrition;
