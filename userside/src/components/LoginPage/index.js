import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import axios from 'axios';
import './index.css';

const Login = () => {
    const [user, setUser] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { updateUser } = useUser();
    
    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const onChangeUser = (e) => {
        setUser(e.target.value);
    };

    const onChangePassword = (e) => {
        setPasswd(e.target.value);
    };

    const setCookiesAndNavigateToHome = (token) => {
        Cookies.set('jwt_token', token,{ expires: 30 });
        Cookies.set('user_name',user,{ expires: 30 });
        navigate('/', { state: { user } });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/', {
                name: user,
                password: passwd
            });

            setError(null);
            const getToken = response.data.token;

            if (response.status === 200) {
                setCookiesAndNavigateToHome(getToken);
                updateUser(user);
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Failed to log in. Please check your username and password.');
        }
    };

    return (
        <div className="main-container">
            <h1 className='text-align-center pb-2' style={{ fontSize: '25px', fontFamily: 'Arial' }}>Login Page</h1>
            <div className="form-container">
                <form className="form" onSubmit={onSubmitForm}>
                    <div>
                        <input 
                            id="username" 
                            onChange={onChangeUser} 
                            value={user} 
                            type="text" 
                            className="user-input" 
                            placeholder="Username"
                        /> 
                    </div>
                    <div>
                        <input 
                            id="password" 
                            onChange={onChangePassword} 
                            value={passwd} 
                            type="password" 
                            className="user-input" 
                            placeholder="Password"
                        /> 
                    </div>
                    <div className="btn-container d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <div className='pt-2'>
                    {error && <p className="error-message">{error} For new user <a href='/register'>sign_in</a></p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
