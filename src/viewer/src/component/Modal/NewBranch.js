import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const NewBranchModal = ( {showModal, handleClose, submitBranchData, areas} ) =>{
    const [branchData, setBranchData] = useState({
        flag: 'insert branch'
    })

    
    const handelData = (variable, event) => {
        if(variable == 'areaID'){
            var areaObj = areas.find(obj => obj['name'] == event.target.value)
            console.log(areas)
            if(areaObj != null){
                setBranchData(prevState=>({
                    ...prevState,
                    [variable]: areaObj.areaID
                }));
                handelData('areaName', event)
            }
            
        }
        else{
            setBranchData(prevState=>({
                ...prevState,
                [variable]: event.target.value
            }));
        }
        
    };


    
    return(
        <Modal size='sm' show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>اضف فرع جديد</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اسم الفرع</Form.Label>
                        <Form.Control type="text" onChange={(event)=>handelData('name', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اختر المنطقة</Form.Label>
                        <Form.Control as='select'  onChange={(event)=>handelData('areaID', event)} >
                            <option>اختر المنطقة</option>
                            {
                                areas && areas.map((area) => (
                                    <option>{area.name}</option>
                                ))
                            }  
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ () =>
                    {
                        handleClose();
                        setBranchData({
                            flag: 'insert branch'
                        })
                    }
                }>
                    الغاء
                </Button>
                <Button variant="primary" onClick={()=>submitBranchData(branchData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default NewBranchModal;
