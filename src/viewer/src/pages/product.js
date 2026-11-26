import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import axios from 'axios';
import NewProductModal from '../component/Modal/NewProduct';
import ShowProducTable from '../component/Table/ShowProducts';
import { useUser } from '../component/UserContext';
import { API_BASE } from '../apiConfig';




const Product = () => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { userRoles } = useUser();



    useEffect(()=>{
        fetchProducts();
        fetchCategories();
    }, [])


    const fetchCategories = async ()=>{
        try{
            const areaDataResponse = await axios.get(API_BASE + '/src/controller/person.php');
            setCategories(areaDataResponse.data[5]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const fetchProducts = async ()=>{
        try{
            const productDataResponse = await axios.get(API_BASE + '/src/controller/person.php');
            setProducts(productDataResponse.data[3]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const saveProductsData = async (data) => {
        const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;

        if (data.name.trim() === '' || data.reference.trim() === '' || data.department.trim() === '' || data["measure unit"].trim() === '' || data.type.trim() === '' || data.category.trim() === '') {
            // Client name validation
            alert('جميع البيانات مطلوبة.');
            return;
        } else if (!nameRegex.test(data.name)) {
            alert('اسم المنتج يجب ان يحتوي على أحرف فقط.');
            return;
        }
        try {
            await axios.post(API_BASE + '/src/controller/person.php', data);
            handleClose();
            fetchProducts();
        } catch (error) {
            alert('لم يتم تسجيل المنتج', error);
        }
    };

    const handleClose = () => {
        setShowInsertModal(false); 

    };

    const handleShow = (status) => {
            setShowInsertModal(true);
    };

    const searchUserRole = (name) => {
        var role =userRoles.find(obj=> obj['roleName'] == name)
        if(role){
            return role.isAvailable;
        }
    }
   

    return(
        <div>
            <div className='row'>
                <div className='d-flex justify-content-start col mt-3'>
                    <h1>
                        Tawa <br/>
                        Special Orders
                    </h1>
                </div>
                <div className='d-flex justify-content-end col p-5'>
                    {userRoles && userRoles[8]['isAvailable'] == 1 && (<Button variant="primary m-3" onClick={handleShow}>
                        اضف منتج جديد
                    </Button>)}
                    <NewProductModal showModal={showInsertModal} handleClose={handleClose} submitProductData={saveProductsData} categories={categories}/>
                </div>
            </div>
            <ShowProducTable userRoles={userRoles} searchUserRole={searchUserRole} fetchProducts={fetchProducts} products={products} saveProductData={saveProductsData}  handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
}

export default Product;