import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './index.css'


const Register = () =>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [registerStatus,setRegisterStatus] = useState('')
    const jwtToken = Cookies.get('jwt_token')

    const navigate = useNavigate()
    const onClickLogin = () => {
        navigate('/login')
    }

    useEffect(() => {
        if(jwtToken){
            navigate('/')
        }
    })

    const onSubmitForm = async (e) => {
        e.preventDefault() 
        try{
            const response = await axios.post('http://localhost:4000/register', {
                username: name,
                email: email,
                password: password
                }
            )
            console.log('New User Register', response.data);
            setRegisterStatus('New User Registed');
            if(response.status === 200){
                navigate('/login');
            }

        }catch (err){
            console.log(err)
            setRegisterStatus('failed to register new user/ user already registered');
        }
        
    }
   
    return(
        <div className='register-container d-flex flex-column justify-content-center align-items-center' style={{height:'100vh'}}>
            <h1 style={{textAlign:'center', fontFamily:'Arial'}}>Register</h1>
            <form className='register-form d-flex flex-column justify-content-between align-items-center' onSubmit={onSubmitForm}>
                <div>
                    <input id = 'name' required className='register-input' type='text' onChange={e => setName(e.target.value)} placeholder='Enter name'/>
                </div>
                <div>
                    <input id='email' required className='register-input' type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter email'/>
                </div>
                <div>
                    <input type='password' required className='register-input' id='password' onChange={e => setPassword(e.target.value)} placeholder='Enter Password'/>
                </div>
                <div>
                    <button type='submit' className='btn btn-primary mt-2' style={{width:'10vw'}}>Submit</button>
                </div>
                <p>{registerStatus}</p>
                <p style={{cursor:'pointer', color:'blue'}} onClick={onClickLogin}>login</p>
            </form>
            
        </div>
    )
} 

export default Register 

