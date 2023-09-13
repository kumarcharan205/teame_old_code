import React, { useState, useEffect } from 'react'
import Users from './Users';
import './style.css'
import { useLocation } from 'react-router-dom';
import Navbar from '../user_component/usernavbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import View_trainings from './view_trainings';


function UserForm() {

    const [searchQuery, setSearchQuery] = useState('');
    
    const [userdata, setUserdata] = useState([]);
   
    const [traindata, setTraindata] = useState([])
    const [id, setId] = useState('')
    const location = useLocation()
    const { user_id } = location.state
    console.log(user_id, "using location ")


    const getUserdata = async () => {
        try {

            setId(user_id)
            const req = await fetch(`http://localhost:5000/users/get/${user_id}`);
            const resData = await req.json();
            if (resData.length > 0) {
                const initialUserdata = resData.map(user => ({ ...user }));
                setUserdata(initialUserdata);
              

            }
        } catch (e) {
            console.log(e);
        }
    }
    const getregisteredUserdata = async () => {
        try {

            setId(user_id)
            const req = await fetch(`http://localhost:5000/users/view_trainings/${user_id}`);
            const resData = await req.json();
            if (resData.length > 0) {
                const initialUserdata = resData.map(user => ({ ...user }));
                setTraindata(initialUserdata);
                
              

            }
        } catch (e) {
            console.log(e);
        }
    }



    useEffect(() => {
        getUserdata();
        getregisteredUserdata();
    }, []);

    const handleRegister = async (index) => {
        const updatedUsersData = [...userdata];
        const userData = updatedUsersData[index];
      
        if (userData.no_of_seats > 0) {
            const confirmation = window.confirm('Do you want to register?');

            if (confirmation) {
                userData.no_of_seats -= 1;
                userData.register = true
                try {
                    // POST request to your server to insert the user data into a separate table
                    const reg_train = await axios.post('http://localhost:5000/users/register', {
                        training_id: userData.id,
                        user_id: id,//static
                    }).then((response) => {

                        console.log(response.data.message)
                    }).catch((e) => {
                        console.log(e)
                    })
                    const updatedUsersData = [...userdata];
                    updatedUsersData[index] = userData;
                    updatedUsersData.splice(index, 1);
                    toast.success("Registeration successful")
                    setTimeout(()=>{
                        window.location.reload()
                    },2000)
                    setUserdata(updatedUsersData);
                } catch (error) {
                    toast.error('Error registering user:', error);
                }
            }

        }
    };

    const handleUnregister = async (index) => {
        const updatedUsersData = [...traindata]; 
        const userData = updatedUsersData[index];
        

        const confirmation = window.confirm('Do you want to register?');

        if (confirmation) {
           
            try {
                const unregister = await axios.put('http://localhost:5000/users/unregister', {
                    training_id: userData.id,
                    user_id: id
                })
                const updatedUsersData = [...traindata];
                updatedUsersData[index] = userData;
                updatedUsersData.splice(index, 1);
                toast.info("Training unregistered successfully")
                setTraindata(updatedUsersData)
                setTimeout(()=>{
                    window.location.reload()
                },1500)
            } catch (error) {
                console.log("error from db")
            }
        }
    }

    return (
        <div>
            <div className="for w-100">
                <div className="container-fluid">
                    <Navbar />
                    <ToastContainer />
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
                                            <input
                                                id='search'
                                                type="text"
                                                className="search form-control"
                                                placeholder=" &#x1F50D; Search Trainings by Training name"
                                                value={searchQuery}
                                                onChange={e => setSearchQuery(e.target.value)}></input>
                                        </div>

                                        <div className="table-responsive table-responsive-sm">
                                            <table className="table table-hover table-bordered results" id="allTrainings">
                                                <thead>
                                                    <tr>
                                                        {/* <th>S.No</th> */}
                                                        {/* <th >Domain Name</th> */}
                                                        <th >Domain Name</th>
                                                        <th >Training Name</th>
                                                        <th>Trainer</th>
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
                                                    <Users usersData={userdata} searchQuery={searchQuery} handleRegister={handleRegister} />
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
                                        <div className="table-responsive table-responsive-sm">
                                            <table className="table table-hover table-bordered results" id="allTrainings">
                                                <thead>
                                                    <tr>
                                                        {/* <th>S.No</th> */}
                                                        {/* <th >Domain Name</th> */}
                                                        <th >Domain Name</th>
                                                        <th >Training Name</th>
                                                        <th>Trainer</th>
                                                        <th >Start Date </th>
                                                        <th >Start Time</th>
                                                        <th >End Date</th>
                                                        <th >End Time</th>
                                                        <th > UnEnroll</th>
                                                    </tr>
                                                    <tr className="warning no-result">
                                                        <td colspan="4"><i className="fa fa-warning"></i> No result</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <View_trainings usersData={traindata} handleRegister={handleUnregister} />
                                                </tbody>
                                            </table>
                                        </div>
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