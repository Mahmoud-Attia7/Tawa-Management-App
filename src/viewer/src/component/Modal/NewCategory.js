import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const NewCategoryModal = ( {showModal, handleClose, submitCategoryData} ) =>{
    const [categoryData, setCategoryData] = useState({
        flag: 'insert category'
    })

    const handelData = (variable, event) => {
        setCategoryData(prevState=>({
            ...prevState,
            [variable]: event.target.value
        }));
    };


    
    return(
        <Modal size='sm' show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>اضف فئة منتجات جديدة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اسم الفئة</Form.Label>
                        <Form.Control type="text" onChange={(event)=>handelData('name', event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    الغاء
                </Button>
                <Button variant="primary" onClick={()=>submitCategoryData(categoryData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default NewCategoryModal;
