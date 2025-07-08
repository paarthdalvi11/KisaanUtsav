import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './utils/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Login from './components/SignUp/Login';
import Register from './components/SignUp/Register';
import Seeds from './components/Seed/Seeds';
import Plant_Nutrition from './components/Plant_Nutrition/Plant_Nutrition';
import WeatherForecast from './components/Weather_forecast/WeatherForecast';
import Kisan_Care from './components/Kisan_Care/Kisan_Care';
import About from './utils/About/About';
import Cart from './components/Cart/Cart';
import Wishlist from './components/WishList/Wishlist';
import Header from './utils/Header/Header';
import ImagePrompt from './utils/ImagePrompt/ImagePrompt';
import PlaceOrder from './utils/PlaceOrder';
import Verify from './utils/Verify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyOrders from './utils/MyOrders';

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <main className='main-frame-spj'>
                <Header/>
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/image-upload" element={<ImagePrompt />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/seeds" element={<Seeds />} />
                    <Route path="/weather-forecast" element={<WeatherForecast />} />
                    <Route path="/kisan-care" element={<Kisan_Care />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/plant-nutrition" element={<Plant_Nutrition />} />
                    <Route path="/cart/order" element={<PlaceOrder />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/myorders" element={<MyOrders />} />
                </Routes>
            </main>
        </QueryClientProvider>
    );
}

export default App;
