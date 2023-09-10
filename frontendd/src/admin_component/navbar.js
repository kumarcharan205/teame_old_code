import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Complaint from "../user_component/complaint";

function Navbar() {
    return (
        <>
            <div className="sidebar">
                <h2 className='welcomeAdmin'> Welcome <br></br>Admin</h2>
                <Complaint />
                <div className="logout-btn-div">
                    <Link to='/'>  <button className='logOut'>Logout <i class="logout fa-solid fa-arrow-right-from-bracket"></i></button></Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;