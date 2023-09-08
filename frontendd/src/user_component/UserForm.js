import React, { useState, useEffect } from 'react'
import Users from './Users';
import { useLocation } from 'react-router-dom';
function UserForm() {

    const location=useLocation()
    const user=location.state
    console.log(user)
    const [userdata, setUserdata] = useState([]);
    const getUserdata = async () => {
        try {
            const req = await fetch("http://localhost:3001/users");
            const resData = await req.json();
            if (resData.length > 0) {
                setUserdata(resData);
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getUserdata();
    }, []);

    
    return (
        <div>
            <div class="for w-100">
                <div class="container-fluid">
                    <div class="row flex-nowrap">
                        <div class=" col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ background: 'linear-gradient(#19105b, #472067, #7c3375, #FF6196)' , width:"10%" }}>
                            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                    <li class="nav-item text-white">
                                        <a class="nav-link align-middle px-0">
                                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline text-white">Hello User</span>
                                        </a>

                                    </li>
                                </ul>
                                <hr />
                            </div>
                        </div>
                        <React.Fragment>
                            <div class=" p-3 overflow-auto" style={{ height: '100vh' }}>
                                <div className="App">
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-md-8'>
                                            <table className='table' style={{ marginTop: '10%'}}>
                                                    <thead className="table bg-primary bg-midnight-blue" >
                                                        <tr >
                                                            <th>Sno</th>
                                                            <th>Domain Name</th>
                                                            <th>Training Name</th>
                                                            <th>Start Date</th>
                                                            <th>End Date</th>
                                                            <th>Available Seats</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <Users usersData={userdata} />
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>
                        </React.Fragment>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserForm;