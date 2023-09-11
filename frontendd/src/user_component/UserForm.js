import React, { useState, useEffect } from 'react'
import Users from './Users';
import './style.css'
import { useLocation } from 'react-router-dom';
import Navbar from '../user_component/usernavbar';


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
            <div className="for w-100">
                <div className="container-fluid">
                    <Navbar />
                    <React.Fragment>
                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        <strong>Available Trainings </strong>
                                    </button>
                                </h2>

                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">
                                        <div className="form-group pull-right">
                                            <input id='search' type="text" className="search form-control" placeholder=" &#x1F50D; Search Trainings"></input>
                                        </div>
                                        {/* <span className="counter pull-right"></span> */}
                                        <div className="table-responsive table-responsive-sm">
                                        <table className="table table-hover table-bordered results" id="allTrainings">
                                            <thead>
                                                <tr>
                                                    {/* <th>S.No</th> */}
                                                    {/* <th >Domain Name</th> */}
                                                    <th >Training Name</th>
                                                    <th >Domain Name</th>
                                                    <th >Start Date </th>
                                                    <th >Start Time</th>
                                                    <th >End Date</th>
                                                    <th >End Time</th>

                                                    <th >Available Seats</th>
                                                    <th >Enroll</th>
                                                </tr>
                                                <tr className="warning no-result">
                                                    <td colspan="4"><i className="fa fa-warning"></i> No result</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <Users usersData={userdata} />
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion accordion-flush " id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <strong>Registered Trainings</strong>
                                    </button>
                                </h2>

                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">

                                        <table className="table table-hover table-bordered results" id="allTrainings">
                                            <thead>
                                                <tr>
                                                    {/* <th>S.No</th> */}
                                                    {/* <th >Domain Name</th> */}
                                                    <th >Training Name</th>
                                                    <th >Domain Name</th>
                                                    <th >Start Date </th>
                                                    <th >Start Time</th>
                                                    <th >End Date</th>
                                                    <th >End Time</th>

                                                    <th >Available Seats</th>
                                                    <th > UnEnroll</th>
                                                </tr>
                                                <tr className="warning no-result">
                                                    <td colspan="4"><i className="fa fa-warning"></i> No result</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <Users usersData={userdata} />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment >
                </div>
            </div>
        </div>
    );
}

export default UserForm;