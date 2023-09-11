import React, { useState, useEffect } from 'react';
import Users from './Users';
import { Link, useLocation } from 'react-router-dom';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive'; 

function UserForm() {
 

  const [userdata, setUserdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar open/close state
  const [filteredUserData, setFilteredUserData] = useState(userdata);
  const [id,setId]=useState('')
  const location=useLocation();
  const {user_id}=location.state
  console.log(user_id,"using location ")

  const getUserdata = async () => {
    try {
      setId(user_id)
      const req = await fetch(`http://localhost:5000/users/get/${user_id}`);
      const resData = await req.json();
      if (resData.length > 0) {
        const initialUserdata = resData.map(user => ({ ...user, registered: false }));
        setUserdata(initialUserdata);
        setFilteredUserData(initialUserdata);
        
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    

    getUserdata();
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRegister = async (index) => {
    
    const updatedUsersData = [...userdata];
    const userData = updatedUsersData[index];
    console.log("updatedusedata",updatedUsersData)
    // console.log("userdata",userData)
    if (userData.no_of_seats > 0) {
      // console.log("abcd",userData)
      const confirmation = window.confirm('Do you want to register?');

      if (confirmation) {
        userData.no_of_seats -= 1;
        userData.register=true

      const updatedFilteredUserData = filteredUserData.filter((userData, idx) => idx !== index);
      setFilteredUserData(updatedFilteredUserData);
        
        console.log("Training_ID",userData.id)
        try {
          debugger
          // POST request to your server to insert the user data into a separate table
          const reg_train = await axios.post('http://localhost:5000/users/register', {
            training_id:userData.id,
            user_id:id,//static
        }).then((response) => {
            
            console.log(response.data.message)
        }).catch((e) => {
            console.log(e)
        })
          const updatedUsersData = [...userdata];
          updatedUsersData[index] = userData;
          setUserdata(updatedUsersData);
          console.log('User registered successfully',userData);
        } catch (error) {
          console.error('Error registering user:', error);
        }
      }
      
    }
  };

  return (
    <div>
      <Container fluid className="custom-container">
        <Row className='xyz'>
          {/* Sidebar for mobile screens */}
          {isMobile && (
            <Col xs={2} className={`px-0 sidebar ${isSidebarOpen ? 'open' : ''}`}>
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
                {/* Content for the sidebar */}
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <li className="nav-item text-white">
                    <a className="nav-link align-middle px-0">
                      <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline text-white">Hello User</span>
                    </a>
                  </li>
                </ul>
                <hr />
                <div className="pb-4">
                  <Link to="/login" className="button">Logout</Link>
                </div>
              </div>
            </Col>
          )}

          {/* Hamburger menu for mobile */}
          {isMobile && (
            <Col xs={2} className="hamburger-menu">
              <button className="hamburger-button" onClick={toggleSidebar}>
                <i className={`bi ${isSidebarOpen ? 'bi-x' : 'bi-list'}`}></i>
              </button>
            </Col>
          )}

          {/* Main content for all screens */}
          <Col xs={isMobile ? 10 : 12} md={isMobile ? 12 : 10} xl={12} className="p-0 main-content">
          <div className='container'>
              <div className="pb-3 pt-3 ">
              {/* Search bar */}
              <input
                type="text"
                placeholder="Search by domain name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ marginBottom: '10px' }}
              /></div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='table-responsive' style={{ overflowX: 'auto' }}>
                      <table className='table table-striped'>
                        <thead className="table bg-primary bg-midnight-blue">
                          <tr>
                            {/* <th>Sno</th> */}
                            <th>Domain Name</th>
                            <th>Training Name</th>
                            <th>Trainer Name</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>End Date</th>
                            <th>End Time</th>
                            <th>Available Seats</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <Users usersData={filteredUserData} searchQuery={searchQuery} handleRegister={handleRegister} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserForm;





