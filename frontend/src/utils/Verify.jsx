import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loading from './Loading'
import axios from 'axios'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    console.log(success, orderId);
    const navigate = useNavigate()

    const verifyPayment = async (req, res) => {
        const response = await axios.post('http://localhost:3500/verifyorder', {
            success : success,
            orderId : orderId
        })
        console.log(response);
        if(response.data.success) {
            navigate('/myorders')
        }
        else {
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])
    return (
        <div>
            <Loading/>
        </div>
    )
}

export default Verify