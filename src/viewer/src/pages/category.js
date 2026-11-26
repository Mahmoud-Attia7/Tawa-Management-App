import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import { Modal, Button, Form } from 'react-bootstrap';

import axios from 'axios';
import NewCategoryModal from '../component/Modal/NewCategory';
import ShowCategoryTable from '../component/Table/ShowCategories';
import { useUser } from '../component/UserContext';




const Category = () => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const { userRoles } = useUser();


    const fetchCategories = async ()=>{
        try{
            const areaDataResponse = await axios.get('http://localhost/Tawa%20Management%20App/src/controller/person.php');
            setCategories(areaDataResponse.data[5]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }
    
    const saveCategoryData = async (data) => {
        // Check if name field is filled
        if (data.name.trim() === '') {
            // Client name validation
            alert('اسم الفئة مطلوب.');
            return;
        } 
        try {
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            handleClose();
            fetchCategories();
        } catch (error) {
            console.error('Error submitting item:', error);
        }
    };

    const handleClose = () => {
        setShowInsertModal(false); 
        setShowModifyModal(false);

    };

    const handleShow = (status) => {
        if(status == 'modify'){
            setShowModifyModal(true);
        }
        else{
            setShowInsertModal(true);
        }
    };

    

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
                    { userRoles && userRoles[9]['isAvailable'] != 0 && (<Button variant="primary m-3" onClick={handleShow}>
                        اضف فئة منتجات جديدة
                    </Button>)}
                    <NewCategoryModal showModal={showInsertModal} handleClose={handleClose} submitCategoryData={saveCategoryData} />
                </div>
            </div>
            <ShowCategoryTable fetchCategories={fetchCategories} categories={categories} saveCategoryData={saveCategoryData} showModal={showModifyModal} handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
}

export default Category;