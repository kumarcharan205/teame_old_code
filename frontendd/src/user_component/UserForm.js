import React, { useState, useEffect } from 'react'
import Users from './Users';
import './style.css'
import { useLocation } from 'react-router-dom';
import Navbar from '../admin_component/navbar';


function UserForm() {
    const location = useLocation()
    const user = location.state
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
                    <Navbar />
                    <React.Fragment>
                        <div class="form-group pull-right">
                            <input id='search' type="text" class="search form-control" placeholder="What you looking for?"></input>
                        </div>
                        <span class="counter pull-right"></span>
                        <table class="table table-hover table-bordered results" id="allTrainings">
                            <thead>
                                <tr>
                                    {/* <th>S.No</th> */}
                                    <th >Domain Name</th>
                                    <th >Training Name</th>
                                    <th >Start Date </th>
                                    <th >Start Time</th>
                                    <th >End Date</th>
                                    <th >End Time</th>
                                    <th >Domain Name</th>
                                    <th >Available Seats</th>
                                    <th ></th>
                                </tr>
                                <tr className="warning no-result">
                                    <td colspan="4"><i className="fa fa-warning"></i> No result</td>
                                </tr>
                            </thead>
                            <tbody>
                                <Users usersData={userdata} />
                            </tbody>
                        </table>
                    </React.Fragment >
                </div>
            </div>
        </div>
    );
}

export default UserForm;