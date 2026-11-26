import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const NewAreaModal = ( {showModal, handleClose, submitAreaData} ) =>{
    const [areaData, setUserData] = useState({
        flag: 'insert area'
    })

    const handelData = (variable, event) => {
         setUserData(prevState=>({
            ...prevState,
            [variable]: event.target.value
        }));
    };


    
    return(
        <Modal size='sm' show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>اضف منطقة جديدة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اسم المنطقة</Form.Label>
                        <Form.Control type="text" onChange={(event)=>handelData('name', event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    الغاء
                </Button>
                <Button variant="primary" onClick={()=>submitAreaData(areaData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default NewAreaModal;
