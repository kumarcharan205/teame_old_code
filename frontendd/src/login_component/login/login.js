import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';
import Cookies from 'js-cookie';
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
    else if (email.trim() === '' || password.trim() === '') {
      toast.error('Please fill in all fields.');
    }
    else {
      if (email.trim() !== '' && password.trim() !== '') {
        try {
          const response = await axios.post('http://localhost:5000/users/', {
            email,
            password,
          });
          console.log("response from backend", response.data.message);
          const token = response.data.token;
          if (response.data.message === 'User logged') {
            Cookies.set('jwtToken', token, { expires: 7 });
           
            toast.success("Login successful")
            setTimeout(() => {
              navigate('/userform', { state: { user_id: response.data.data } })
            }, 2000)
          }
          else if (response.data.message === 'Admin logged') {
            console.log("admin authenticate")
            Cookies.set('jwtToken', token, { expires: 7 });
            toast.success(" Admin Login successful")
            setTimeout(() => {
              navigate('/admin_training')
            }, 2000)
          }
          else if (response.data === 'invaild mail') {
            toast.error("Enter the organisation mail")
            formref.current.reset()
          }
          else if (response.data === 'Passoword is weak') {
            // toast.error("Wrong credentials")
            formref.current.reset()
          }
        }

        catch (error) {
          toast.error('Invalid credentials');

        }

      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <ToastContainer />
        <img src="login_bg.png" alt="Login" className="imagefirst" />
        <img src="Login-logo-signup.92ae013a.png" className="pngimg" />
      </div>
      <div className="login-right">
        <form onSubmit={validationReg}>
          <h1 className="heading">Welcome Back :)</h1>
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
