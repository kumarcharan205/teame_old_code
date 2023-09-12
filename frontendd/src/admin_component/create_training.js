import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './style.scss'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import View_training from './view_trainings';
import Archieve from './archieve';
import Navbar from './adminnavbar';
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

    const handleSubmit = async (e) => {
        console.log("abcd check", startDate, endDate)
        console.log("working", training);
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/data', training, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Scheduled training:', response.data);
                // Swal.fire('Training Created Successfully');
            } else {
                console.error('Set training failed');
            }
        } catch (error) {
            console.error('Registering error:', error);
        }
    };

    return (
        <>


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

                                    <form onSubmit={handleSubmit}>

                                        <div className="form-group">
                                            <label for="trainingName">Training Name</label>
                                            <input
                                                type="text"
                                                id="trainingName"
                                                placeholder="Training Name"
                                                value={training.training_name}
                                                onChange={(e) => setTraining({ ...training, training_name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="trainer">Trainer</label>
                                            <input
                                                type="text"
                                                id="trainer"
                                                placeholder="Trainer"
                                                value={training.trainer}
                                                onChange={(e) => setTraining({ ...training, trainer: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="skillTitle">Skill Title</label>
                                            <input
                                                type="text"
                                                id="skillTitle"
                                                placeholder="Title"
                                                value={training.skill}
                                                onChange={(e) => setTraining({ ...training, skill: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="description">Description</label>
                                            <textarea
                                                id="description"
                                                placeholder="Leave a comment here"
                                                lue={training.description}
                                                onChange={(e) => setTraining({ ...training, description: e.target.value })}
                                                
                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label for="domain">Domain</label>
                                            <select
                                                id="domain"
                                                value={training.domain}
                                                onChange={(e) => setTraining({ ...training, domain: e.target.value })}
                                                required
                                            >
                                                <option value="Full Stack">Full Stack</option>
                                                <option value="Data">Data</option>
                                                <option value="Consulting">Consulting</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="startDate">Start Date</label>
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
                                            <label for="endDate">End Date</label>
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
                                            {/* <input
                                                type="date"
                                                id="endDate"
                                                min="<?= date('Y-m-d') ?>"
                                                value={training.endDate}
                                                onChange={(e) => setTraining({ ...training, endDate: e.target.value })}
                                            /> */}
                                        </div>
                                        <div className="form-group">
                                            <label for="seats">No of Seats</label>
                                            <input
                                                type="number"
                                                id="seats"
                                                placeholder="Seats"
                                                min="1"
                                                max="99"
                                                value={training.seats}
                                                onChange={(e) => setTraining({ ...training, seats: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="button_" name="Submit">
                                            Submit
                                        </Button>
                                        <Button className="close" onClick={props.onHide}>
                                            Close
                                        </Button>

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
                                        <div className="card">
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
