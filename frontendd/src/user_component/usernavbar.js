import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Complaint from "../user_component/complaint";

function Usernavbar() {
    return (
        <>
            <div className="sidebar">
            <p className='welcomeAdmin'> Welcome <br/><strong>User</strong></p>
                <Complaint />
                <div className="logout-btn-div">
                    <Link to='/'>  <button className='logOut'>Logout <i class="logout fa-solid fa-arrow-right-from-bracket"></i></button></Link>
                </div>
            </div>
        </>
    )
}

export default Usernavbar;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './UserNavbar.css'; // Make sure to import your CSS file for styling
// import Complaint from "../user_component/complaint";

// function Usernavbar() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true); // By default, show sidebar on larger screens

//     useEffect(() => {
//         // Function to handle window resize event
//         const handleResize = () => {
//             if (window.innerWidth <= 767) {
//                 setIsSidebarOpen(false); // Close sidebar on small screens
//             } else {
//                 setIsSidebarOpen(true); // Show sidebar on larger screens
//             }
//         };

//         // Add a resize event listener
//         window.addEventListener('resize', handleResize);

//         // Initialize the layout based on the initial window width
//         handleResize();

//         // Clean up the event listener when the component unmounts
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//             {window.innerWidth <= 767 && (
//                 <div className="hamburger" onClick={toggleSidebar}>
//                     <div className={`bar ${isSidebarOpen ? 'open' : ''}`}></div>
//                     <div className={`bar ${isSidebarOpen ? 'open' : ''}`}></div>
//                     <div className={`bar ${isSidebarOpen ? 'open' : ''}`}></div>
//                 </div>
//             )}
//             <h2 className='welcomeAdmin'>Welcome User</h2>
//             <Complaint />
//             {/* ... Your other sidebar content */}
//             <div className="logout-btn-div">
//                 <Link to='/'>
//                     <button className='logOut'>Logout <i className="logout fa-solid fa-arrow-right-from-bracket"></i></button>
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default Usernavbar;

