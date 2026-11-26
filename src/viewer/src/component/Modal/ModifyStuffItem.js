import { Modal, Form, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { API_BASE } from '../../apiConfig';



const StuffedItemModal = ( { status, hours, isBranch, showModal, handleClose, modifyItemData, handleFileChange, submitModifiedItem, stuffing} )=>{
    const [stuffingItem, setStuffingItem] = useState(modifyItemData);
    const [notVisiable, setIsvisiable] = useState(false);

    useEffect(()=>{ 
        fetchStuffing();
    }, [modifyItemData]);
    const fetchStuffing = async () => {
        try{
            const data = {
            masterID: modifyItemData.oID,
            itemID: modifyItemData.iID,
            flag: 'get'
            }
            const response = await axios.post(API_BASE + '/src/model/order.php', data);
            if (response.data[0] == null) {
                setStuffingItem( 
                    {
                        ...modifyItemData,
                        flag: 'insert'
                    } 
                ); 
                console.log(stuffingItem);
            } else {

                setStuffingItem({
                    ...response.data[0],
                    ...modifyItemData,
                     flag: 'update' 
                }); 
            }
        }
        catch (error) {
            console.error('Error fetching Stuffs By Items:', error);
        }
    }
    const handleEditQuantityChange = (event) => {
        setStuffingItem(prevState => ({
            ...prevState,
            quantity: event.target.value
        }));
    };
    const handleStuffingOneChange = (event) => {
        if(event.target.value == 'اختر الحشوةالاولى'){
            setStuffingItem((prevState)=>({
                ...prevState,
                stuff_one: null
                }
                ))
        }
        else{
            setStuffingItem((prevState)=>({
            ...prevState,
            stuff_one: event.target.value
            }
            ))
        }
    }
    const handleStuffingTwoChange = (event) => {
        if(event.target.value == 'اختر الحشوة الثانية'){
            setStuffingItem((prevState)=>({
                ...prevState,
                stuff_two: null
                }
                ))
        }
        else{
            setStuffingItem((prevState)=>({
            ...prevState,
            stuff_two: event.target.value
            }
            ))
        }
    }
    const handleStuffingThreeChange = (event) => {
        if(event.target.value == 'اختر الحشوة الثالثة'){
            setStuffingItem((prevState)=>({
                ...prevState,
                stuff_three: null
                }
                ))
        }
        else{
            setStuffingItem((prevState)=>({
            ...prevState,
            stuff_three: event.target.value
            }
            ))
        }
    }
    const handleStuffingFourChange = (event) => {
        if(event.target.value == 'اختر الحشوة الرابعة'){
            setStuffingItem((prevState)=>({
                ...prevState,
                stuff_four: null
                }
                ))
        }
        else{
            setStuffingItem((prevState)=>({
            ...prevState,
            stuff_four: event.target.value
            }
            ))
        }
    }
    const handleStuffingFiveChange = (event) => {
        if(event.target.value == 'اختر الحشوة الخامسة'){
            setStuffingItem((prevState)=>({
                ...prevState,
                stuff_five: null
                }
                ))
        }
        else{
            setStuffingItem((prevState)=>({
            ...prevState,
            stuff_five: event.target.value
            }
            ))
        }
    }

    return(<Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex justify-content-end">الكمية</Form.Label>
                        <Form.Control type="text" value={stuffingItem.quantity} onChange={handleEditQuantityChange} disabled={ (isBranch && hours  && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control className='mt-5' as='select' value={stuffingItem.stuff_one} onChange={handleStuffingOneChange} disabled={ (isBranch && hours  && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}>
                            <option>اختر الحشوةالاولى</option>
                            {stuffing &&
                                stuffing
                                    .filter((stuff) => {if(modifyItemData.productID == stuff.productID)
                                    {
                                        return stuff
                                    }})
                                    .map((stuff, index) => (
                                        <option>{stuff.name}</option>
                                    ))}
                        </Form.Control>
                        <Form.Control className='mt-5' as='select' value={stuffingItem.stuff_two} onChange={handleStuffingTwoChange} disabled={ (isBranch && hours  && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}>
                        <option>اختر الحشوة الثانية</option>
                            {stuffing &&
                                stuffing
                                    .filter((stuff) => {if(modifyItemData.productID == stuff.productID)
                                    {
                                        return stuff
                                    }})
                                    .map((stuff, index) => (
                                        <option>{stuff.name}</option>
                                    ))}
                        </Form.Control>
                        <Form.Control className='mt-5' as='select' value={stuffingItem.stuff_three} onChange={handleStuffingThreeChange} disabled={ (isBranch && hours  && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}>
                            <option>اختر الحشوة الثالثة</option>
                            {stuffing &&
                                stuffing
                                    .filter((stuff) => {if(modifyItemData.productID == stuff.productID)
                                    {
                                        return stuff
                                    }})
                                    .map((stuff, index) => (
                                        <option>{stuff.name}</option>
                                    ))}
                        </Form.Control>
                        <Form.Control className='mt-5' as='select' value={stuffingItem.stuff_four} onChange={handleStuffingFourChange} disabled={ (isBranch && hours  && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}>
                            <option>اختر الحشوة الرابعة</option>
                            {stuffing &&
                                stuffing
                                    .filter((stuff) => {if(modifyItemData.productID == stuff.productID)
                                    {
                                        return stuff
                                    }})
                                    .map((stuff, index) => (
                                        <option>{stuff.name}</option>
                                    ))}
                        </Form.Control>
                        <Form.Control className='mt-5' as='select' value={stuffingItem.stuff_five} onChange={handleStuffingFiveChange} disabled={ (isBranch && hours  && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}>
                            <option>اختر الحشوة الخامسة</option>
                            {stuffing &&
                                stuffing
                                    .filter((stuff) => {if(modifyItemData.productID == stuff.productID)
                                    {
                                        return stuff
                                    }})
                                    .map((stuff, index) => (
                                        <option>{stuff.name}</option>
                                    ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>قم باضافت ملف</Form.Label>
                        <Form.Control type="file" onChange={(event) => handleFileChange(event.target.files[0])} disabled={ (isBranch && hours  && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        الغاء
                    </Button>
                    {(isBranch && hours) == 1 && <Button  variant="primary" onClick={()=>{
                        submitModifiedItem(stuffingItem) 
                        setStuffingItem([])
                    }}>
                        حفظ
                    </Button>}
                </Modal.Footer>
            </Modal>);
}

export default StuffedItemModal;