// importing_necessary_packages
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer,toast } from 'react-toastify';
//import './training.css';

function History() {
    // debugger
    const [tableData, setTableData] = useState();
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const handlerestore = async (itemId) => {
        console.log("dfnajkfnajndfajknfafa,",itemId)
        const id=itemId
        try {
            const response = await axios.post(`http://localhost:5000/users/restore`,{id});
            console.log(response.data.message)
            if (response.data.message==='Training restored successfully') {
                
                const updatedTableData = tableData.filter(item => item.id !== itemId);
                setTableData(updatedTableData);
                toast.success("Training restored succesfully")
                setTimeout(()=>{
                    window.location.reload()
                },1500)
            } else {
                console.log('Error deleting item');
            }
        } catch (error) {
            console.log('Error deleting item:', error);
        }
    };
   
    const fetchData = async () => {
        // debugger
        try {
            
            const response = await axios.get('http://localhost:5000/users/deleted_trainings');
             
            console.log("trssasdfg",response.data.data)
            if (response.status === 200) {
                setTableData(response.data.data);
                console.log(tableData,"<<<<<<<<<>>>>>>>>>>>>>>>>>>")
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
        <ToastContainer/>
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
            {/* <div id="mySidenav" className="sidenav">
            </div> */}
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
                            {console.log("anvanjdkvndajkvn",tableData)}
                           {tableData? tableData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.training_name}</td>
                                    <td>{item.trainer}</td>
                                    <td>{item.domain}</td>
                                    <td>{(item.startdate).split('T')[0]}</td>
                                    <td>{new Date((item.startdate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                    <td>{(item.enddate).split('T')[0]}</td>
                                    <td>{new Date((item.enddate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                    
                                    <td>{(item.initial_seats)-(item.no_of_seats)}</td>
                                    <td>{item.no_of_seats}</td>
                                    <td><button onClick={() => handlerestore(item.id)}><i class="fa-solid fa-trash"></i></button></td>
                                    
                                </tr>
                     )) :""}
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

export default History;
