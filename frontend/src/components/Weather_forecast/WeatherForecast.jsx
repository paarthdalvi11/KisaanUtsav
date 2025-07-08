import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WeatherForecast.css'; // Changed CSS file name to match convention

const WeatherForecast = () => {
    const [seedName, setSeedName] = useState('');
    const [date, setDate] = useState('');
    const [soilType, setSoilType] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    const formatResponse = (response) => {
        const paragraphs = response.split("\n\n");
        
        return paragraphs.map((paragraph, index) => {
            const lines = paragraph.split("\n");
            const formattedLines = lines.map(line => line.replace(/\*/g, ""));
            return formattedLines.join(" ");
        }).join("\n\n");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!seedName || !date) {
            setError('Please enter both the seed name and date.');
            return;
        }

        const selectedDate = new Date(date);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
            setError('To proceed, please select a date that has already passed');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3500/weatherResponse', {
                seedName: seedName,
                date: date,
                location: user.location ,
                type: user.soilType || soilType
            });
            setResult(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-forecast"> 
            {
                !user ? 
                    <h2>Kindly login to use this feature</h2>
                : (
                    <>
                        <h2>Weather Forecast</h2>
                        <form onSubmit={handleSubmit} className="weather-form"> 
                        <div className='weather-format'>
                            <div className='weather-input1'>

                                <div className="input-group"> 
                                    <label htmlFor="seedName" className="label">Name of the Seed:</label> 
                                    <input
                                        type="text"
                                        id="seedName"
                                        value={seedName}
                                        onChange={(e) => setSeedName(e.target.value)}
                                        className="input" 
                                    />
                                </div>

                                <div className="input-group"> 
                                    <label htmlFor="date" className="label">Date of Plantation:</label> 
                                    <input
                                        type="date"
                                        id="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="input" 
                                    />
                                </div>

                                <div className="input-group"> 
                                    <label htmlFor="soilType" className="label">Type of Soil:</label> 
                                    <select
                                        id="soilType"
                                        value={soilType}
                                        onChange={(e) => setSoilType(e.target.value)}
                                        className="input" 
                                    >
                                        <option value="">Select Soil Type</option>
                                        <option value="Alluvial">Alluvial</option>
                                        <option value="Black">Black</option>
                                        <option value="Red and Yellow">Red and Yellow</option>
                                        <option value="Laterite">Laterite</option>
                                        <option value="Arid">Arid</option>
                                        <option value="Forest and Mountain">Forest and Mountain</option>
                                        {/* Add more options as needed */}
                                    </select>
                                    {/* <p className="subtext">Get the solution for another soil type other than {user.soilType}</p>  */}
                                </div>

                            </div>
                            <div>
                                <button type="submit" className="buttonsol" disabled={loading}>
                                    Generate Solution
                                </button> 
                            </div>
                        </div>
                        </form>
                        {loading && <p>Generating Solution...</p>} 
                        {result && <div className="response">{formatResponse(result)}</div>} 
                        {error && <p className="error">{error}</p>} 
                    </>
                )
            }
        </div>
    );
};

export default WeatherForecast;