import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const ModifyBranchModal = ( { branch, showModal, handleClose, updateBranchData, areas} ) =>{
    const [branchData, setBranchData] = useState({
        ...branch,
        flag: 'update branch'
    })

    useEffect(()=>{
        setBranchData({
            ...branch,
            flag: 'update branch'
        })
    }, [branch])

    const handelData = (variable, event) => {
        if(variable == 'areaID'){
            const areaObj = areas.find(obj => obj['name'] == event.target.value)
            console.log(areaObj)
            if(areaObj != null){
                setBranchData(prevState=>({
                    ...prevState,
                    [variable]: areaObj.areaID
                }));
                handelData('areaName', event);
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
                <Modal.Title> تعديل بيانات الفرع </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اسم الفرع</Form.Label>
                        <Form.Control type="text" value={branchData.name} onChange={(event)=>handelData('name', event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">اختر المنطقة</Form.Label>
                        <Form.Control as='select' value={branchData.areaName} onChange={(e)=>handelData('areaID', e)}>
                            <option>اختر الفرع</option>
                            {areas && areas.map((areas) => (
                                    <option>{areas.name}</option>
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
                <Button variant="primary" onClick={()=>updateBranchData(branchData)}>
                    حفظ
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ModifyBranchModal;
