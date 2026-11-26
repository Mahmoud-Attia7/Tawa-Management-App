import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const ModifyAreaModal = ( { area, showModal, handleClose, updateAreaData} ) =>{
    const [areaData, setAreaData] = useState({
        flag: 'update area'
    })

    useEffect ( ()=>{
        setAreaData(prevState => ({
            ...prevState,
            ...area
        }));
    }, [area])
    
    const handelData = (variable, event) => {
        setAreaData(prevState=>({
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
                        <Form.Control type="text" value={areaData.name} onChange={(event)=>handelData('name', event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    الغاء
                </Button>
                <Button variant="primary" onClick={()=>updateAreaData(areaData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ModifyAreaModal;
