import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Complaint from "../user_component/complaint";

function Adminnavbar() {
    return (
        <>
            <div className="sidebar">
                <h4 className='welcomeAdmin'> Welcome <br></br><strong>User</strong></h4>
                {/* <Complaint /> */}
                <div className="logout-btn-div">
                    <Link to='/'>  <button className='logOut'>Logout <i class="logout fa-solid fa-arrow-right-from-bracket"></i></button></Link>
                </div>
            </div>
        </>
    )
}

export default Adminnavbar;