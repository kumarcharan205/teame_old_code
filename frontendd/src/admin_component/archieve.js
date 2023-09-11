import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import './training.css';

function Training(props) {
    const [tableData, setTableData] = useState([]);
    const UndoDelete = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:5001/api/delete-training/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Item deleted successfully');
                const updatedTableData = tableData.filter(item => item.id !== itemId);
                setTableData(updatedTableData);
            } else {
                console.error('Error deleting item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/training-data');
                const text = await response.text(); 
                console.log('Response:', text); 
                
                if (response.ok) {
                    console.log('Success')
                    const data = JSON.parse(text); 
                    setTableData(data);
                } else {
                    console.error('Error response:', text);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
   

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
            {/* <div id="mySidenav" className="sidenav">
            </div> */}
            <div className="table-responsive table-responsive-sm">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Trainer</th>
                            <th scope="col">Domain</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">RegisteredUsers</th>
                            <th scope="col">VacanciesLeft</th>
                            <th scope="col"> </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.ProjectName}</td>
                                <td>{item.Trainer}</td>
                                <td>{item.Domain}</td>
                                <td>{item.StartDate}</td>
                                <td>{item.EndDate}</td>
                                <td>{item.RegisteredUsers}</td>
                                <td>{item.VacanciesLeft}</td>
                                <td><button onClick={UndoDelete}><i class="fa-solid fa-trash"></i></button></td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal.Footer>


                </Modal.Footer>


            </Modal.Body>
        </Modal >
        </>
    );
}

// export default Training;
export default function Archieve() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button className='archieve' variant="primary" onClick={() => setModalShow(true)}>
                Archieve  <i class="fa-solid fa-trash-arrow-up"></i>
            </Button>
            <Training
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
