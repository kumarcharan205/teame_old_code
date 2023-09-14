// importing_necessary_packages

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';

function Training() {
   
    const [tableData, setTableData] = useState();
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const handleDelete = async (itemId) => {
        const training_id = itemId
        try {
            const response = await axios.post(`http://localhost:5000/users/dtrain`, { training_id });
            console.log(response.data.message)
            if (response.data.message === 'Training deleted successfully') {

                const updatedTableData = tableData.filter(item => item.id !== itemId);
                setTableData(updatedTableData);
                toast.success("Training deleted succesfully")
               setTimeout(()=>{
                window.location.reload()
               },1500)
            } else {
                toast.error('Error deleting item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const fetchData = async () => {

        try {

            const response = await axios.get('http://localhost:5000/users/get_trainings');

            if (response.status === 200) {
                setTableData(response.data.data);
            } else {
                console.log('Error response:');
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <ToastContainer />
            <Modal
                show={modalShow}
                onHide={handleClose}
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
                   
                    <div className="main-user">
                        <div className="table-responsive table-responsive-sm">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>

                                        <th scope="col">Project Name</th>
                                        <th scope="col">Trainer</th>
                                        <th scope="col">Domain</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">End Time</th>
                                        <th scope="col">RegisteredUsers</th>
                                        <th scope="col">VacanciesLeft</th>
                                        <th scope="col"> </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData ? tableData.map((item, index) => (
                                        <tr key={index}>

                                            <td>{item.training_name}</td>
                                            <td>{item.trainer}</td>
                                            <td>{item.domain}</td>
                                            <td>{(item.startdate).split('T')[0]}</td>
                                            <td>{new Date((item.startdate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                            <td>{(item.enddate).split('T')[0]}</td>
                                            <td>{new Date((item.enddate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>

                                            <td>{(item.initial_seats) - (item.no_of_seats)}</td>
                                            <td>{item.no_of_seats}</td>
                                            <td><button onClick={() => handleDelete(item.id)}><i class="fa-solid fa-trash"></i></button></td>

                                        </tr>
                                    )) : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal.Footer>


                    </Modal.Footer>


                </Modal.Body>
            </Modal >
            <Button className='schedule' variant="primary" onClick={() => setModalShow(true)}>
                Upcomimg  <i class="fa-solid fa-forward"></i>
            </Button>

        </>
    );
}

export default Training;


