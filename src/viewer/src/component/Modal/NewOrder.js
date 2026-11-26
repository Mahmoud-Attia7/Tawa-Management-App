import { Modal, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useUser } from '../UserContext';

const NewOrderModal = ({ userAuthenticateData, userBranches, showModal, handleClose, submitOrderData }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isMarriageRequest, setIsMarriageRequest] = useState(false);

    const [newOrderData, setNewOrderData] = useState({
        'reference': '',
        'branchID': '',
        'branchName': '',
        'clientName': '',
        'clientNumber': '',
        'isWidding': false,
        'employeeName': userAuthenticateData.employeeName,
        'guestNumber': 1,
        'selectedDate': '',
        'userID': userAuthenticateData.userID,
        'flag': 'insert order'
    });

    const handelData = (variable, event) => {
        if(variable == 'branchID'){
            const branch = userBranches.find(obj=>(obj => obj['name'] == event.target.value))
            if (branch){
                setNewOrderData((prevState)=>({
                    ...prevState,
                    [variable]: branch['branchID']
                }));
                handelData ('branchName', event)
            } 
        }
        else{
            setNewOrderData((prevState)=>({
                ...prevState,
                [variable]: event.target.value
            }));
        } 
   };

    const handleSelectedDateChange = (event) => {
        setNewOrderData((prevState) => ({
            ...prevState,
            selectedDate: event.target.value
        }));
    };

    const handleCheckboxChange = (event) => {
        setNewOrderData((prevState) => ({
            ...prevState,
            isWidding: event.target.checked
        }));
        if (event.target.checked === false) {
            setNewOrderData((prevState) => ({
                ...prevState,
                guestNumber: 1
            }));
        }
        setIsMarriageRequest(event.target.checked);
    };

    const handleSubmit = () => {
        // Validation
        if (!newOrderData.reference || !newOrderData.branchID || !newOrderData.clientName || !newOrderData.clientNumber || !newOrderData.selectedDate) {
            alert('قم بادخال جميع البيانات.');
            return;
        }

        // Client name validation
        const nameRegex = /^[\u0600-\u06FF\sA-Za-z]+$/;
        if (!nameRegex.test(newOrderData.clientName)) {
            alert('اسم العميل يجب أن يحتوي على أحرف فقط.');
            return;
        }


        // Client number validation
        const numberRegex = /^\d+$/;
        if (!numberRegex.test(newOrderData.clientNumber)) {
            alert('رقم العميل يجب ان يكون مكون من ارقام فقط.');
            return;
        }
        else if (newOrderData.clientNumber.length !== 10 || !newOrderData.clientNumber.startsWith('05')) {
            alert('رقم الهاتف يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام');
            return;
        }

        // Submit data
        submitOrderData(newOrderData);
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className='text-end'>طلب جديد</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="reference">
                        <Form.Label className='d-flex justify-content-end'>رقم فوديكس المرجعي</Form.Label>
                        <Form.Control type="text" placeholder="Enter reference" onChange={(e) => handelData('reference', e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="branchID">
                        <Form.Label className='d-flex justify-content-end'>اختر الفرع</Form.Label>
                        <Form.Control as='select' onChange={(e) => handelData('branchID', e)} required>
                            <option>اختر الفرع</option>
                            {userBranches && userBranches.map((userBranch) => (
                                <option key={userBranch.id}>{userBranch.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="clientName">
                        <Form.Label className='d-flex justify-content-end'>اسم العميل</Form.Label>
                        <Form.Control className="mb-3" type="text" placeholder="ادخل اسم العميل" onChange={(e) => handelData('clientName', e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="clientNumber">
                        <Form.Label className='d-flex justify-content-end'>رقم العميل</Form.Label>
                        <Form.Control className="mb-3" type="text" placeholder="ادخل رقم العميل" onChange={(e) => handelData('clientNumber', e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="selectedDate">
                        <Form.Label className='d-flex justify-content-end'>تاريخ الاستلام</Form.Label>
                        <Form.Control type='date' onChange={(e) => handleSelectedDateChange(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='d-flex justify-content-end'>هل هو طلب زواج؟</Form.Label>
                        <Form.Check type="checkbox" id="marriage-request-checkbox" label="نعم" onChange={handleCheckboxChange} />
                        {isMarriageRequest && (
                            <>
                                <Form.Label className='d-flex justify-content-end mt-5'>اختر عدد الافراد</Form.Label>
                                <Form.Control as='select' onChange={(e) => handelData('guestNumber', e)} required>
                                    <option>اختر عدد الافراد</option>
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                    <option>150</option>
                                </Form.Control>
                            </>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{
                    handleClose();
                    setNewOrderData(
                       { 'reference': '',
                        'branchID': '',
                        'branchName': '',
                        'clientName': '',
                        'clientNumber': '',
                        'isWidding': false,
                        'employeeName': userAuthenticateData.employeeName,
                        'guestNumber': 1,
                        'selectedDate': '',
                        'userID': userAuthenticateData.userID,
                        'flag': 'insert order'}
                    );
                
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewOrderModal;
