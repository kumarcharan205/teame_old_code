// importing_necessary_packages

import './style.scss'
import React, { useState,useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import View_training from '../viewTraining/view_trainings';
import Archieve from '../archieveTrainings/archieve';
import Navbar from '../navigationBar/adminnavbar';
import { ToastContainer,toast} from 'react-toastify';
// import Swal from 'sweetalert2';


function MyFormModal(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [training, setTraining] = useState({
        training_name: '',
        trainer: '',
        skill: '',
        description: '',
        domain: 'Full Stack', // Default domain value
        seats: 1, // Default seats value
    });
    const formRef=useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/admin', training, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.message==='response success') {
                toast.success("Training created")
                setTimeout(() => {
                    formRef.current.reset()
                    window.location.reload()    
                }, 1500);
                
            } else {
                toast.error('Set training failed');
                formRef.current.reset()
            }
        } catch (error) {
            toast.error('Registering error:', error);
            formRef.current.reset()
        }
    };

    return (
        <>

<ToastContainer/>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Training Schedule
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="train">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col-xs" >

                                    <form onSubmit={handleSubmit} ref={formRef}>

                                        <div className="form-group">
                                            <label for="trainingName">Training Name <span className='reqfield'> * </span></label>
                                            <input
                                                type="text"
                                                id="trainingName"
                                                placeholder="Training Name"
                                              
                                                onChange={(e) => setTraining({ ...training, training_name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="trainer">Trainer <span className='reqfield'> * </span></label>
                                            <input
                                                type="text"
                                                id="trainer"
                                                placeholder="Trainer"
                                                
                                                onChange={(e) => setTraining({ ...training, trainer: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="skillTitle">Skill Title <span className='reqfield'> * </span></label>
                                            <input
                                                type="text"
                                                id="skillTitle"
                                                placeholder="Title"
                                               
                                                onChange={(e) => setTraining({ ...training, skill: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="description">Description</label>
                                            <textarea
                                                id="description"
                                                placeholder="Leave a comment here"
                                                
                                                onChange={(e) => setTraining({ ...training, description: e.target.value })}
                                                
                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label for="domain">Domain <span className='reqfield'> * </span></label>
                                            <select
                                                id="domain"
                                               
                                                onChange={(e) => setTraining({ ...training, domain: e.target.value })}
                                                required
                                            >
                                                <option value="Full Stack">Full Stack</option>
                                                <option value="Data">Data</option>
                                                <option value="Consulting">Consulting</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="startDate">Start Date <span className='reqfield'> * </span></label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => {
                                                    setStartDate(date);
                                                    setTraining({ ...training, startDate: date });
                                                }}
                                                dateFormat="Pp"
                                                showTimeSelect
                                                timeFormat="p"
                                                minDate={new Date()}
                                                required
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label for="endDate">End Date <span className='reqfield'> * </span></label>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => {
                                                    setEndDate(date);
                                                    setTraining({ ...training, endDate: date });
                                                }}
                                                dateFormat="Pp"
                                                showTimeSelect
                                                timeFormat="p"
                                                minDate={new Date()}
                                                required
                                            />
                                            
                                        </div>
                                        <div className="form-group">
                                            <label for="seats">No of Seats <span className='reqfield'> * </span></label>
                                            <input
                                                type="number"
                                                id="seats"
                                                placeholder="Seats"
                                                min="1"
                                                max="99"
                                               
                                                onChange={(e) => setTraining({ ...training, seats: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className='end'> 
                                        <Button type="submit" className="button_" name="Submit">
                                            Submit
                                        </Button>
                                        <Button className="close" onClick={props.onHide}>
                                            Close
                                        </Button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>





                    <Modal.Footer>


                    </Modal.Footer>


                </Modal.Body>
            </Modal >
        </>
    );
}

export default function Admin_training() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className='maincontent'>
                <div className="container mt-5">
                    <Navbar/>
                    <div className="row">

                        {/* Main Content */}
                        <div className="col-lg-9">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="card cards">
                                            <div className="card-header">
                                                <h3>New Training</h3>
                                            </div>
                                            <div className="card-body">
                                                <p className='card-text'>"Effortlessly create and customize training sessions for your team's growth and development needs"</p>
                                                <Button className='schedule' variant="primary" onClick={() => setModalShow(true)}>
                                                    Schedule  <i className="fa-regular fa-calendar"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3>Trainings</h3>
                                            </div>
                                            <div className="card-body">
                                                <p className='card-text'>"Easily view and manage scheduled training sessions to keep your team's learning on track."</p>

                                                <View_training />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3> History</h3>
                                            </div>
                                            <div className="card-body">
                                                <p className='card-text'>"Access deleted training records and perform resets as needed for seamless course management."</p>

                                                <Archieve />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <MyFormModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>

        </>
    )
}
