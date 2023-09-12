import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validationReg = async (e) => {
    e.preventDefault();

    if(email.trim() !== '' && password.trim() !== ''){
      try{
        const response = await axios.post('http://localhost:3001/api/login', {
          email,
          password,
        });
        console.log("adminstatus",response.data.user.isadmin)
        const adminStatus=response.data.user.isadmin
        console.log("response from backend",response.data.message);
        if(response.data.message==='Login successful.' && adminStatus===0)
        {
          toast.success("Login successful")
          setTimeout(()=>{
            navigate('/userform')
          },3000)
        }
        else if(response.data.message==='Login successful.' && adminStatus===1)
        {
          toast.success(" Admin Login successful")
          setTimeout(()=>{
            navigate('/admin_training')
          },3000)
        }

       
      } catch (error) {
        console.error('Sign-in error:', error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <ToastContainer />
        <img src="login.png" alt="Login" className="imagefirst"/>
        <img src="Login-logo-signup.92ae013a.png" className="pngimg"/>
      </div>
      <div className="login-right">
        <form onSubmit={validationReg}>
        <h1 className="heading">Welcome Back :)</h1><br/>
          <div className="login-input-container">
            <i className="fa-regular fa-envelope"></i>  
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="login-input-container">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="buttons">
            <Link to="/signup">
              <button className="oldloginbutton">New User?</button>
            </Link>
            <button className="loginbutton" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
