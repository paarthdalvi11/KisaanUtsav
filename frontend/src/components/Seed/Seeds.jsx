import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../../utils/Home/Home';
import SeedProduct from './SeedProduct';
// import SeedSellingPage from './SeedSellingPage';
import './Seeds.css';

const Seeds = () => {
    const [seeds, setSeeds] = useState([]);
    const userData = localStorage.getItem('currentUser');
    const user = userData ? JSON.parse(userData) : null;
    // const navigate = useNavigate();

    const notifyError = (msg) => toast.error(msg, { position: 'top-center' });
    const notifyWarning = (msg) => toast.warn(msg, { position: 'top-center'})
    const notifySuccess = (msg) => toast.success(msg, { position: 'top-center' });

    const fetchSeeds = async () => {
        try {
            const response = await axios.get('http://localhost:3500/getAllSeeds');
            console.log(response.data);
            setSeeds(response.data);
        } catch (error) {
            notifyError(error.message);
        }
    };

    useEffect(() => {
        fetchSeeds();
    }, []);

    const addToCart = async (seed, quantity) => {
        try {
            if (user) {
                const response = await axios.post('http://localhost:3500/addToCart', {
                    username: user.username,
                    name: seed.name,
                    type: "seed",
                    quantity: quantity,
                });
                if (response.data.length === 0) {
                    <h1>Cart is empty</h1>
                }
                console.log(`${response.data} added to cart`);
                notifySuccess(`${seed.name} added to cart successfully`);
            }
            else {
                notifyWarning('Login to add items to Cart')
            }
            // navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    };

    const addToWishList = async (seed) => {
        try {
            if (user){
                const res = await axios.post('http://localhost:3500/addToWishlist', {
                    username: user.username,
                    name: seed.name,
                    type : "seed"
                });
                notifySuccess(`${seed.name} added to wishlist successfully`);
            }
            else {
                notifyWarning('Login to add items to Wishlist')
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className='seed-main'>
            <div className='mainbase'>
                <p className='base'>Discover Your Seed Sanctuary</p>
            </div>
            <ul className='products'>
                {seeds.map((seed, index) => (
                    <li key={index}>
                        <div> 
                            <SeedProduct
                                seed={seed}
                                addToCart={addToCart}
                                addToWishList={addToWishList}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} />
        </div>
    );
};

export default Seeds; 