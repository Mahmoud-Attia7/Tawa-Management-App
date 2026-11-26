import { Modal, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';


const NewUserModal = ( {showModal, handleClose, submitUserData} ) =>{
    const [userData, setUserData] = useState({
        employeeName: '',
        password: '',
        phoneNumber: '',
        email: '',
        flag: 'insert'
    })

    const handelData = (variable, event) => {
         setUserData(prevState=>({
            ...prevState,
            [variable]: event.target.value
        }));
    };


    
    return(
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>اضف مستخدم جديد</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اسم الموظف</Form.Label>
                        <Form.Control type="text" onChange={(event)=>handelData('employeeName', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">كلمة السر</Form.Label>
                        <Form.Control type="password" onChange={(event)=>handelData('password', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">رقم الهاتف</Form.Label>
                        <Form.Control type="text" onChange={(event)=>handelData('phoneNumber', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">البريد الالكتروني</Form.Label>
                        <Form.Control type="text" onChange={(event)=>handelData('email', event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    الغاء
                </Button>
                <Button variant="primary" onClick={()=>submitUserData(userData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default NewUserModal;
