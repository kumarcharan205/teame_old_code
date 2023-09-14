import React, { useState, useEffect } from "react";

import './style.scss';

export default function View_trainings({usersData,searchQuery,handleRegister}) {

    // const filteredUsersData = usersData.filter((uData) => {
    // return uData.domain.toLowerCase().includes(searchQuery.toLowerCase())
     
    // })

    return (
        <React.Fragment>

            <>
                {
                    usersData.map((uData, index) => (
                       
                        <tr key={uData.id}>
                            {/* <td>{uData.id} </td> */}
                            <td>{uData.domain}</td>
                            
                            <td>{uData.training_name} </td>
                            <td>{uData.trainer}</td>
                            <td>{(uData.startdate).split('T')[0]} </td>
                            <td>{new Date((uData.startdate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} </td>
                            <td>{(uData.enddate).split('T')[0]}</td>
                            <td>{new Date((uData.enddate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} </td>
                            <td className="btn-btn">
                                <button
                                    onClick={() => handleRegister(index)}
                                    className={`btn text-white`}
                                    disabled={uData.no_of_seats === 0}
                                >
                                    <span>
                                        {/* {uData.registered ? (
                                            <span style={{ backgroundColor: 'green', padding: '8px',borderRadius:'3px' }}>
                                                UnRegister
                                            </span>
                                        ) : ( */}
                                            <span style={{ backgroundColor: '#ff6196', padding: '8px',borderRadius:'3px' }}>
                                        Unenroll
                                    </span>

                            
                                        {/* )} */}
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