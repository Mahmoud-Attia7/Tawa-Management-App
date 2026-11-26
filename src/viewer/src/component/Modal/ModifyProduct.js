import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const ModifyProductModal = ( {product, showModal, handleClose, submitProductData, categories} ) =>{

    const [productData, setProductData] = useState({
        ...product,
        flag: 'update product'
    })

    
    const handelData = (variable, event) => {
        setProductData(prevState=>({
            ...prevState,
            [variable]: event.target.value
        }));
        console.log(productData);
    };


    
    return(
        <Modal size='sm' show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>اضف منتح جديد</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اسم المنتج</Form.Label>
                        <Form.Control type="text" value={productData.name} onChange={(event)=>handelData('name', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">الرقم المرجعي</Form.Label>
                        <Form.Control type="text" value={productData.reference} onChange={(event)=>handelData('reference', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">القسم</Form.Label>
                        <Form.Control as='select' value={productData.department} onChange={(event)=>handelData('department', event)}>
                            <option>اختر القسم الخاص بالمنتج</option>
                            <option>cake</option>
                            <option>hala arabi</option>
                            <option>hala coffe</option>
                            <option>fatayer</option>
                            <option>red & chocolate</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">وحدة القياس</Form.Label>
                        <Form.Control as="select" value={productData.measure_unit} onChange={(event)=>handelData('measure_unit', event)} >
                            <option>اختر وحدة القياس</option>
                            <option>بالقطعة</option>
                            <option>بالكيلو</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">النوع</Form.Label>
                        <Form.Control as='select' value={productData.type} onChange={(event)=>handelData('type', event)}>
                            <option>اختر نوع المنتج</option>
                            <option>cake</option>
                            <option>stuff</option>
                            <option>normal</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اختر فئة المنتج</Form.Label>
                        <Form.Control as='select' value={productData.categoryID} onChange={(event)=>handelData('categoryID', event)}>
                            <option>اختر الفئة</option>
                            {categories && categories.map((category) => (
                                    <option>{category.ID}</option>
                                ))
                            }  
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    الغاء
                </Button>
                <Button variant="primary" onClick={()=>submitProductData(productData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ModifyProductModal;
