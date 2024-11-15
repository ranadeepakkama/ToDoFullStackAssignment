import Navbar from "../Navbar";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './index.css';

const UserDetails = () => {
    const [getUser, setUser] = useState({}); 
    const user = Cookies.get('user_name');

    const getUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:4000/userDetails');
            const userList = response.data;
            const filter_user = userList.find(userItem => userItem.username === user); 
            console.log(filter_user)
            setUser(filter_user || {});  
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        if (user) {  
            getUserDetails();
        }
    });  

    

    return (
        <div>
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <h1 style={{ fontFamily: 'Arial' }}>User Details</h1>
                <div className="user-container text-start mt-1">
                    <div>
                        <img 
                            style={{ width: '90px', height: '90px', marginBottom: '5px' }} 
                            src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" 
                            alt='profile' 
                        />
                    </div>
                    <h2 style={{ fontSize: '20px' }}>Name: {getUser.username || 'N/A'}</h2>
                    <p>Email: {getUser.email || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
