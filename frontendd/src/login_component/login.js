import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formref = useRef()

  const validationReg = async (e) => {
    e.preventDefault();
    debugger;
    const isValid = /@jmangroup\.com$/.test(email);
    if (!isValid) {
      console.log('invalid')
      toast.error("Enter the organisation mail")
      formref.current.reset()
    }
    else {
      if (email.trim() !== '' && password.trim() !== '') {
        try {
          const response = await axios.post('http://localhost:5000/users/', {
            email,
            password,
          });
          console.log("response from backend", response.data.message);
          if (response.data.message === 'User logged') {
            toast.success("Login successful")
            setTimeout(() => {
              navigate('/userform',{state:{user_id:response.data.data}})
            }, 3000)
          }
          else if (response.data.message === 'Admin logged') {
            console.log("admin authenticate")
            toast.success(" Admin Login successful")
            setTimeout(() => {
              navigate('/admin_training')
            }, 3000)
          }
          else if(response.data ==='invaild mail')
          {
            toast.error("Enter the organisation mail")
            formref.current.reset()
          }
          else if(response.data==='Passoword is weak')
          {
            toast.error("Password must contain atleast 1 uppercase,1 special character,1 numeric character and min 8 characters")
          }
        }

        catch (error) {
          console.error('Sign-in error:', error);
        }

      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <ToastContainer />
        <img src="/login/login3.png" alt="Login" />
      </div>
      <div className="login-right">
        <h1 className="h1">Welcome Back :)</h1>
        <form onSubmit={validationReg}>
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
