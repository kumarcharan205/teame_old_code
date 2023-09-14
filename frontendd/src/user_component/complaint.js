import React, { useState } from "react";
import './style.scss'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import { useRef } from 'react';



export default function Complaint() {
    const form = useRef();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = () => {
        setShowModal(true);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_203o8iw', 'template_o91f0iq', form.current, '9rndwk3q5_ec5AzuH').then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
    }

    return (
        <>
            <button className="complaint" onClick={handleShow}>
                Request <i class="fa-regular fa-thumbs-up"></i>
            </button>
            <Modal show={showModal} onHide={handleClose} className="complaint">
                <form ref={form} onSubmit={sendEmail}>
                        <div className="column">
                            <label>Name <span className='reqfield'> * </span></label>
                            <input className="complaintname" type="text" name="user_name" required/>
                        </div>
                        <div className="column">
                            <label>Email <span className='reqfield'> * </span></label>
                            <input className="complaintemail" type="email" name="user_email" required/>
                        </div>
                    <div className="row">
                        <label>Message <span className='reqfield'> * </span></label>
                        <textarea className="complaintmessage" name="message" required/>
                    </div>
                    <div className="row">
                        <input type="submit" value="Send" />
                    </div>
                </form>

            </Modal>
        </>
    );
}



