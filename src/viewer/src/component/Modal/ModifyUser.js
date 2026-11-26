
import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const ModifyUserModal = ( { user, showModal, handleClose, submitUserData, saveUserData} ) =>{
    const [userData, setUserData] = useState({
        ...user,
        userPassword: '',
        flag: 'update'
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
                <Modal.Title>تعديل بيانات المستخدم</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اسم الموظف</Form.Label>
                        <Form.Control type="text" value={userData.employeeName} onChange={(event)=>handelData('employeeName', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">كلمة السر</Form.Label>
                        <Form.Control type="password" placeholder="اتركها فارغة للإبقاء على كلمة السر الحالية" value={userData.userPassword} onChange={(event)=>handelData('userPassword', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">رقم الهاتف</Form.Label>
                        <Form.Control type="text" value={userData.phoneNumber} onChange={(event)=>handelData('phoneNumber', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">البريد الالكتروني</Form.Label>
                        <Form.Control type="text" value={userData.email} onChange={(event)=>handelData('email', event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    الغاء
                </Button>
                <Button variant="primary" onClick={()=>saveUserData(userData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModifyUserModal;