import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Icon} from '@iconify/react';
import {toast} from "react-toastify";

const RatingModal = ({children, show, user, handleStarSubmit,modalTitle, handleShow, handleClose}) => {


    return (
        <>

            <div onClick={handleShow}>
                <Icon

                    icon="ic:sharp-star-border"
                    className='text-danger'
                    fontSize={40}/> {user ? 'Leave a rating' : 'login to rate'}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleStarSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RatingModal