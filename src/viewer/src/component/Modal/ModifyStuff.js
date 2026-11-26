import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const ModifyStuffModal = ( { stuff, showModal, handleClose, submitStuffData } ) =>{
    const [stuffData, setStuffData] = useState({
        flag: 'update stuff'
    })

    useEffect ( ()=>{
        setStuffData(prevState => ({
            ...prevState,
            ...stuff
        }));
    }, [stuff])

    const handelData = (variable, event) => {
        setStuffData(prevState=>({
            ...prevState,
            [variable]: event.target.value
        }));
    };


    
    return(
        <Modal size='sm' show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>تعديل فئة منتجات</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اسم الفئة</Form.Label>
                        <Form.Control type="text" value={stuffData.name} onChange={(event)=>handelData('name', event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    الغاء
                </Button>
                <Button variant="primary" onClick={()=>submitStuffData(stuffData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ModifyStuffModal;
