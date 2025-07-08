import React, { useState } from 'react';
import axios from 'axios';
import './imagePrompt.css';

const ImagePrompt = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        setResponseMessage('');
        console.log('submit');
        if (!selectedFile) {
            console.error('No file selected');
            setError(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await axios.post(
                'http://localhost:3500/generateimageresponse',
                formData
            );
            console.log('Image uploaded successfully:', response.data);
            setResponseMessage(response.data);
        } catch (error) {
            console.log('Error uploading image:');
            console.log(error);
        setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <>
        <h1 className='image-title'>Assess the Well-being of Your Plant</h1>
            <p className='image-subtitle'>Upload a recent photo of your plant</p>
            <div className='image-content'>
                <div className='image-submit'>
                    <form className='image-form' onSubmit={handleSubmit}>
                        

                        <input className='image-input-button' type="file" accept="image/*" onChange={handleFileChange} />
                        <button className='image-button-submit' type="submit">Upload</button>
                        {error && <p className='image-error'>There was an error uploading the image</p>}
                        
                        
                        <div className='image-input-user'>

                        {selectedFile && (
                            <div className="image-container">
                                <img src={URL.createObjectURL(selectedFile)} alt="Uploaded Image" />
                            </div>
                        )}
                        </div>
                    </form>
                </div>
                <div className='image-response'>
                    {loading && <p className='generating'>Generating...</p>}
                    {responseMessage && <p className="response-message">{responseMessage}</p>}
                </div>
            </div>
        </>
    );
    };

export default ImagePrompt