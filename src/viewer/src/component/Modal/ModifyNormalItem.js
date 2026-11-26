import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

const NormalItemModal = ({ status, hours, isBranch, showModal, handleClose, modifyItemData, handleFileChange, submitModifiedItem})=>{
    const [notVisiable, setIsvisiable] = useState(false);
    const [normalItem, setNormalItem] = useState(modifyItemData);

    useEffect(() => {
        setNormalItem(modifyItemData);
    }, [modifyItemData]);


    const handleEditQuantityChange = (event) => {
        setNormalItem(prevState => ({
            ...prevState,
            quantity: event.target.value
        }));
    };

  
    
    return(
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>اضافات</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">الكمية</Form.Label>
                        <Form.Control type="text" value={normalItem.quantity} onChange={handleEditQuantityChange} disabled={(isBranch && hours &&  !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable} />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                        <Form.Label>قم باضافت ملف</Form.Label>
                        <Form.Control type="file" onChange={(event) => handleFileChange(event.target.files[0])} disabled={(isBranch && hours &&  !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}  />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    الغاء
                </Button>
               {(isBranch && hours) == 1 && <Button variant="primary" onClick={()=>{submitModifiedItem(normalItem)}}>
                    حفظ
                </Button>}
            </Modal.Footer>
        </Modal>
    );

};

export default NormalItemModal;