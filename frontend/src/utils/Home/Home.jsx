import React, { useEffect, useState, useRef } from 'react';
import './home.css';
import Slider from 'react-slick';
import ImageSlider from '../Slider/Slider';
import Image1 from '../Home/images/icon.jpg';
import Image2 from '../Home/images/image1.jpeg'; 
import Image3 from '../Home/images/image2.jpeg';
import Image4 from '../Home/images/image3.jpeg';


const Home = () => {

    const images = [
        Image1,
        Image2,
        Image3,
        Image4,
        Image2,
        Image3,
        Image1,
        // Add more image URLs here
      ];

  

    return (
       
            <div className="App">
                <div className='heading'>
                    <p className='home-heading1'>Welcome to</p>
                    <p className='home-heading2'>Kisaan Care</p>

                </div>

                <div className='image-slider' style={{padding: "10px"}}>
                    <ImageSlider images={images} />
                </div>
                <div className='content-about-us'>
                    <p className='content-head'>About Us</p>
                    <p style={{fontWeight: '600'}}> This is Kisaan Utsav - Where We Celebrate Farmers and Their Contributions to Society! </p>
<p>
At Kisaan Utsav, we understand the vital role that farmers play in feeding our world. That's why we've dedicated ourselves to empowering farmers with the tools and resources they need to thrive. <br/><br/>

Our platform is designed to streamline the process of purchasing seeds, fertilizers, and pesticides, ensuring that farmers have access to the highest quality products tailored to their specific needs. Through advanced algorithms, we take into account factors such as location, soil type, and geographical considerations to recommend the most suitable products for each individual farmer.<br/><br/>

But we don't stop there. We go beyond merely facilitating transactions; we aim to revolutionize farming practices through innovation and technology. With our integrated weather forecasting system, farmers can make informed decisions about irrigation patterns and pesticide application, maximizing crop yields while minimizing environmental impact.<br/><br/>

One of our standout features is our disease detection and solution service. Farmers can simply upload a photo of their plants, and our AI-powered system will analyze it for signs of disease. In the unfortunate event that a disease is detected, Kisaan Utsav provides tailored solutions and recommendations to help farmers effectively manage and mitigate the issue.<br/><br/>

Additionally, our AI chat feature serves as a virtual agricultural advisor, available 24/7 to answer any farming-related questions or concerns. Whether you're seeking advice on pest control strategies or tips for optimizing soil health, our AI chat is here to provide reliable and personalized assistance.<br/><br/>

At Kisaan Utsav, our mission is to empower farmers with the knowledge and resources they need to succeed. Join us in revolutionizing agriculture and cultivating a brighter future for farming communities worldwide.</p>
                </div>
                <div className='content-mission'>
                    <p className='content-head'>Mission</p>
                    <p style={{fontWeight: '400'}}> At Kisaan Utsav, we believe in honoring the hard work, dedication, and resilience of farmers who toil day in and day out to feed the world. Our mission is not only to provide farmers with the tools and resources they need to succeed but also to celebrate their invaluable contributions to our communities and economies.<br/><br/>
                    
                    Through our dedication to celebrating farmers at Kisaan Utsav and our commitment to our vision, we endeavor to create a more sustainable, equitable, and prosperous future for farming communities worldwide. Join us in honoring the heartbeat of our nations - our farmers! </p>
                </div>

                <div className='content-vision'>
                    <p className='content-head'>Vision</p>
                    <p style={{fontWeight: '400'}}> <b>Empowering Farmers</b>: We envision a future where every farmer has access to the latest technologies, expert advice, and quality agricultural inputs to maximize productivity and profitability.<br/><br/>

<b>Sustainable Agriculture</b>: We are committed to promoting environmentally friendly farming practices that preserve natural resources, promote biodiversity, and safeguard the planet for future generations.<br/><br/>

<b>Community Engagement</b>: We aspire to build a vibrant and inclusive farming community where knowledge sharing, collaboration, and mutual support thrive.<br/><br/>

<b>Technological Innovation</b>: We strive to be at the forefront of agricultural innovation, leveraging cutting-edge technologies such as AI, data analytics, and remote sensing to address the evolving needs and challenges of modern agriculture.<br/><br/>

<b>Farmer Prosperity</b>: We aim to enhance the livelihoods and well-being of farmers by ensuring fair prices, market access, and financial stability, thereby fostering economic growth and prosperity in rural areas.</p>
                </div>
            </div>
  
    );
};


export default Home;