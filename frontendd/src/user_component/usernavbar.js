import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Complaint from "../user_component/complaint";
import Cookies from 'js-cookie';

function Usernavbar() {
    const navigate=useNavigate();
    const handleLogout = ()=> {
        Cookies.remove('jwtToken'); 
        navigate('/')
    }
    return (
        <>
            <div className="sidebar">
                <p className='welcomeAdmin'> Welcome <br/><strong>User</strong></p>
                <Complaint />
                <div className="logout-btn-div">
                    <button className='logOut' onClick={handleLogout}>Logout <i class="logout fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
            </div>
        </>
    )
}

export default Usernavbar;