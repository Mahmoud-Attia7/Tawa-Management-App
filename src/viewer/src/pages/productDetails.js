import React, { useEffect, useState } from 'react';
import { useUser } from '../component/UserContext';
import { Card, ListGroup } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ModifyProductModal from '../component/Modal/ModifyProduct';


const ProductDetails = () => {
    const { productData, updateProduct, userRoles } = useUser();
    const [stuffs, setStuffs] = useState([]);
    const [productStuffing, setProductStuffing] = useState([]);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetchStuffing();
        fetchProductStuffing(productData.ID);
        fetchCategories();
    }, [])

    // Function to render rows of the card
    const renderRow = (label, value) => (
        <div className="row">
            <div className="col-6 text-left">{value}</div>
            <div className="col-6 text-end">{label}</div>
            <hr className="w-100" />
        </div>
    );

    const fetchStuffing = async ()=>{
        try{
            const stuffDataResponse = await axios.get('http://localhost/Tawa%20Management%20App/src/controller/person.php');
            setStuffs(stuffDataResponse.data[4]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const fetchProductStuffing = async (productID)=>{
        try{
            const data = {
                productID: productID,
                flag: 'get product stuffing'
            }
            const productStuffingDataResponse = await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            setProductStuffing(productStuffingDataResponse.data);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }
    
    const fetchCategories = async ()=>{
        try{
            const areaDataResponse = await axios.get('http://localhost/Tawa%20Management%20App/src/controller/person.php');
            setCategories(areaDataResponse.data[5]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const Is_Available = (name) => {
        const productStuff = productStuffing.find(obj => obj['name'] === name);
        if(productStuff){
            return 1;
        }
        else{
            return 0;
        }
    }

    const updateProductStufing = async (productID, sutffID, name, isAvailable) => {
        try{
            if(searchUserRole('write product'))
            {
                const data = {
                    productID: productID,
                    sutffID: sutffID,
                    name: name,
                    isAvailable:  isAvailable,
                    flag: 'update Product Stufing'
                }
                await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
                fetchProductStuffing(productData.ID);
            }
            else{
                alert('لايمكنك التعديل على المنتج')
            }
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }


    const saveProductsData = async (data) => {
        const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;
        if (data.name === '' || data.reference === '' || data.department === '' || data["measure unit"] === '' || data.type === '' || data.category === '') {
            // Client name validation
            alert('جميع البيانات مطلوبة.');
            return;
        } else if (!nameRegex.test(data.name)) {
            alert('اسم المنتج يجب ان يحتوي على أحرف فقط.');
            return;
        }
        try {
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            handleClose();
            updateProduct(data);
        } catch (error) {
            console.error('Error submitting item:', error);
        }
    };

    const handleClose = () => {
        setShowModifyModal(false);

    };

    const handleShow = () => {
        setShowModifyModal(true);
    };

    const searchUserRole = (name) => {
        var role =userRoles.find(obj=> obj['roleName'] == name)
        if(role){
            return role.isAvailable;
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='d-flex justify-content-start col mt-3'>
                    <h1>
                        Tawa <br/>
                        Special Orders
                    </h1>
                </div>
                <div className='d-flex justify-content-end col p-5'>
                    { userRoles && userRoles[8]['isAvailable'] == 1 && 
                        <Button variant="primary m-3" onClick={handleShow}>
                                قم بتعديل المنتج
                        </Button>
                    }
                    <ModifyProductModal product={productData} showModal={showModifyModal} handleClose={handleClose} submitProductData={saveProductsData} categories={categories}/>
                </div>
            </div>

            <section style={{ width: '500px', margin: 'auto', marginTop: '50px'}}>
                <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Card.Body>
                        <Card.Title className="text-center mb-4">تفاصيل المنتج</Card.Title>
                        {renderRow('اسم المنتج', productData.name)}
                        {renderRow('الفئة', productData.categoryID)}
                        {renderRow('وحدة القياس', productData.measure_unit)}
                        {renderRow('رقم فوديكس المرجعي', productData.reference)}
                        {renderRow('النوع', productData.type)}
                    </Card.Body>
                </Card>
            </section>

           { (productData.type == 'cake' || productData.type == 'stuff' ) && ( <section className="role-section" style={{ width: '500px', margin: 'auto' , marginTop: '50px' }}>
                <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Card.Title className='text-end'  as="h5">الحشوات</Card.Title >
                    <ListGroup variant="flush">
                        {stuffs.map((stuff, index) => (
                            <ListGroup.Item key={index}>
                                <Form.Check type="checkbox" 
                                    id={`stuff-checkbox-${index}`} 
                                    label={stuff.name} 
                                    onClick={(event)=>updateProductStufing(productData.ID, stuff.ID, stuff.name, event.target.checked)} 
                                    checked={Is_Available(stuff.name)}
                                    readOnly
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </section>)}

        </div>


    );
};

export default ProductDetails;