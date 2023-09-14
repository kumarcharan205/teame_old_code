// importing_necessary_packages
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Complaint from '../../user_component/complaint'

function Adminnavbar() {
    const navigate= useNavigate();
    const handleLogout = ()=> {
        localStorage.removeItem('adminjwtToken')
        navigate('/')
    }
    return (
        <>
            <div className="sidebar">
                <p className='welcomeAdmin'> Welcome <br/><strong>Admin</strong></p>
            
                {/* <Complaint /> */}
                <div className="logout-btn-div">
                    <button className='logOut' onClick={handleLogout}>Logout <i class="logout fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
            </div>
        </>
    )
}

export default Adminnavbar;