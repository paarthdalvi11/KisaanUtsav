import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
    const [state, setState] = useState('login');
    
    const toggleState = () => {
        setState(state === 'login' ? 'register' : 'login');
    };

    return (
        <div className="body_sign">
            <div className="state">
                {state === 'login' ? <Login /> : <Register />}
            </div>
            
            <div className="toggle">
                <div className="text">
                    <p>{state === 'login' ? 'Haven\'t registered yet' : 'Already have an account?'}</p>
                    <br></br>
                </div>
                <div className="togglebut">  
                    <button className="togglebutton" onClick={toggleState}>
                        {state === 'login' ? 'Register' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
