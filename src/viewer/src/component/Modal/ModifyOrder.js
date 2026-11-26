import { Modal, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useUser } from '../UserContext';

const ModifyOrderModal = ({ order, userBranches, showModal, handleClose, submitOrderData }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isMarriageRequest, setIsMarriageRequest] = useState(false);
    const { userAuthenticateData } = useUser();

    const [modifyOrderData, setModifyOrderData] = useState({
        ...order,
        'flag': 'update order'
    });

    const handelData = (variable, event) => {
        if(variable == 'branchID'){
            const branch = userBranches.find(obj=>(obj => obj['name'] == event.target.value))
            if (branch){
                setModifyOrderData((prevState)=>({
                    ...prevState,
                    [variable]: branch['branchID']
                }));
                handelData ('branchName', event)
            } 
        }
        else{
            setModifyOrderData((prevState)=>({
                ...prevState,
                [variable]: event.target.value
            }));
        } 
   };

    const handleSelectedDateChange = (event) => {
        setModifyOrderData((prevState) => ({
            ...prevState,
            submition_date: event.target.value
        }));
    };

    const handleCheckboxChange = (event) => {
        setModifyOrderData((prevState) => ({
            ...prevState,
            is_widding: event.target.checked
        }));
        if (!event.target.checked) {
            setModifyOrderData((prevState) => ({
                ...prevState,
                guest_number: 1
            }));
        }
        setIsMarriageRequest(event.target.checked);
    };

    const handleSubmit = () => {
        // Validation
        if (!modifyOrderData.Reference || !modifyOrderData.branchID || !modifyOrderData.client_name || !modifyOrderData.client_number || !modifyOrderData.submition_date) {
            alert('قم بادخال جميع البيانات.');
            return;
        }

        // Client name validation
        const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;
        if (!nameRegex.test(modifyOrderData.client_name)) {
            alert('اسم العميل يجب أن يحتوي على أحرف فقط.');
            return;
        }

        // Client number validation
        const numberRegex = /^\d+$/;
        if (!numberRegex.test(modifyOrderData.client_number)) {
            alert('رقم العميل يجب أن يحتوي على أرقام فقط.');
            return;
        }
        else if (modifyOrderData.client_number.length !== 10 || !modifyOrderData.client_number.startsWith('05')) {
            alert('رقم الهاتف يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام');
            return;
        }
        
        // Submit data
        submitOrderData(modifyOrderData);
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className='text-end'>تعديل الطلب</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="reference">
                        <Form.Label className='d-flex justify-content-end'>رقم فوديكس المرجعي</Form.Label>
                        <Form.Control type="text" placeholder="Enter reference" value={modifyOrderData.Reference} onChange={(e) => handelData('Reference', e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="branchID">
                        <Form.Label className='d-flex justify-content-end'>اختر الفرع</Form.Label>
                        <Form.Control as='select' value={modifyOrderData.branchName} onChange={(e) => handelData('branchName', e)} required>
                            <option>اختر الفرع</option>
                            {userBranches && userBranches.map((userBranch) => (
                                <option key={userBranch.id}>{userBranch.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="clientName">
                        <Form.Label className='d-flex justify-content-end'>اسم العميل</Form.Label>
                        <Form.Control className="mb-3" type="text" placeholder="ادخل اسم العميل" value={modifyOrderData.client_name} onChange={(e) => handelData('client_name', e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="clientNumber">
                        <Form.Label className='d-flex justify-content-end'>رقم العميل</Form.Label>
                        <Form.Control className="mb-3" type="text" placeholder="ادخل رقم العميل" value={modifyOrderData.client_number} onChange={(e) => handelData('client_number', e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="selectedDate">
                        <Form.Label className='d-flex justify-content-end'>تاريخ الاستلام</Form.Label>
                        <Form.Control type='date' value={modifyOrderData.submition_date} onChange={(e) => handleSelectedDateChange(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='d-flex justify-content-end'>هل هو طلب زواج؟</Form.Label>
                        <Form.Check type="checkbox" id="marriage-request-checkbox" label="نعم" checked={modifyOrderData.is_widding} onChange={handleCheckboxChange} />
                        {isMarriageRequest && (
                            <>
                                <Form.Label className='d-flex justify-content-end mt-5'>اختر عدد الافراد</Form.Label>
                                <Form.Control as='select' value={modifyOrderData.guest_number} onChange={(e) => handelData('guest_number', e)} required>
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
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModifyOrderModal;
