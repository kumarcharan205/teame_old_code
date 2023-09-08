import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css';

export default function Users() {
    const [usersData, setUsersData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsersData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleRegister = async (index) => {
        const updatedUsersData = [...usersData];
        const userData = updatedUsersData[index];

        if (userData.availableseats > 0 && !userData.registered) {
            const confirmation = window.confirm('Do you want to register?');

            if (confirmation) {
                userData.availableseats -= 1;
                userData.registered = true;
                try {
                    //POST request to your server to insert the user data into a separate table
                    await axios.post('http://localhost:3001/register', userData);

                    
                    const updatedUsersData = [...usersData];
                    updatedUsersData[index] = userData;
                    setUsersData(updatedUsersData);
                    console.log('User registered successfully');
                } catch (error) {
                    console.error('Error registering user:', error);
                }
            }
        }
    };

    const filteredUsersData = usersData.filter(uData =>
        uData.domainname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Search by domain name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ position: 'absolute', top: '50px',width:'20%' }}
            />

            <>
                {
                    filteredUsersData.map((uData, index) => (
                        <tr key={uData.id}>
                            <td>{uData.id} </td>
                            <td>{uData.domainname}</td>
                            <td>{uData.trainingname} </td>
                            <td>{uData.startdate} </td>
                            <td>{uData.enddate} </td>
                            <td>{uData.availableseats} </td>
                            <td className="btn-btn">
                                <button
                                    onClick={() => handleRegister(index)}
                                    className={`btn text-white`}
                                    disabled={uData.availableseats === 0 || uData.registered}
                                >
                                    <span>
                                        {uData.registered ? (
                                            <span style={{ backgroundColor: 'green', padding: '8px',borderRadius:'3px' }}>
                                                Registered
                                            </span>
                                        ) : (
                                            <span style={{ backgroundColor: '#ff6196', padding: '8px',borderRadius:'3px' }}>
                                        Register
                                    </span>

                            
                                        )}
                                </span>
                            </button>
                        </td>

                        </tr>
            ))
                }

        </>
        </React.Fragment >
    );
}