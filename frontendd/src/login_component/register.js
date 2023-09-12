
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.scss';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';



function Signup() {

  const navigate = useNavigate();
  const formRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const images = ['./register/register1.gif', './register/register2.gif', './register/register3.gif'];
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

  const isValid = /@jmangroup\.com$/

      
  const validationReg = async (e) => {

    e.preventDefault()

    const data = {

      name: name,

      email: email,

      password: password,

    };

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {

      toast.error('Please fill in all fields.');

    }

    else if (!passwordRegex.test(password)) {

      // Password doesn't meet the criteria

      toast.error("Password must contain at least 1 capital letter, 1 special character, and be at least 8 characters long.");

      formRef.current.reset()

    }
    else if (password !== repassword) {

      toast.error("Password doesn't match")

      formRef.current.reset()

    }
    else if(!isValid.test(email)){
      toast.error("Enter the organisation mail")
      formRef.current.reset()
    }

    else {
      

      try {
        const response = await axios.post('http://localhost:5000/users/signin', data);
        console.log(response.data)
        if (response.data.message==="response success")
        {
          toast.success("User created successfully")
          setTimeout(()=>{
            navigate('/')
          },3000)
        }
        else if (response.data.message==="user already exists")
        {
          toast.error("user already  exists")
          formRef.current.reset()

        }
        else if (response.data.message==="username or mail id already exists")
        {
          toast.error("Failed to register")
          formRef.current.reset()
        }
        else if(response.data==='not an organisation mail')
        {
          toast.error("Enter the organisation mail")
          formRef.current.reset()
        }
        else if(response.data==='Passoword is weak')
        {
          toast.error("Password must contain atleast 1 uppercase,1 special character,1 numeric character and min 8 characters")
          formRef.current.reset()
        }
      } catch (error) {
        console.log("error i got backend",error);
        toast.error("Failed in register in server")
        formRef.current.reset()
      }


    }

  };




  return (
    <div className="signup-container ">
      <div className="signup-left">
        <img src={images[imageIndex]} alt="Registration GIF" />
      </div>
      <div className="signup-right">
        <form ref={formRef}>
          <ToastContainer />
          <h1>Create an account</h1>
          <div className="input-container">
            <i className="fa-regular fa-user"></i>
            <input name="user_name" type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          </div>
          <div className="input-container">
            <i className="fa-regular fa-envelope"></i>
            <input name="user_email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div className="input-container">
            <i className="fa-solid fa-lock"></i>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div className="input-container">
            <i className="fa-solid fa-lock"></i>
            <input type="password" onChange={(e) => setRepassword(e.target.value)} placeholder="Confirm Password" required />
          </div>
          <div>
            <Link to="/">
              <button className="olduserbutton" type="submit">
                Have an account?
              </button>
            </Link>
            <button type='submit' className="signupbutton" onClick={validationReg}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}



export default Signup;