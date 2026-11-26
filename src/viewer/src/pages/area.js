import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import { Modal, Button, Form } from 'react-bootstrap';

import axios from 'axios';
import ShowAreaTable from '../component/Table/ShowAreas';
import NewAreaModal from '../component/Modal/NewArea';
import { useUser } from '../component/UserContext';




const Area = () => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const { userRoles } = useUser();
    const [areas, setAreas] = useState([]);


    const fetchAreas = async ()=>{
        try{
            const areaDataResponse = await axios.get('http://localhost/Tawa%20Management%20App/src/controller/person.php');
            setAreas(areaDataResponse.data[8]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }
    
    const saveAreaData = async (data) => {
         // Check if name field is filled
         if (!data.name) {
            // Client name validation
            alert('اسم الفئة مطلوب.');
            return;
        } 
        try {
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            handleClose();
            fetchAreas();
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
                    {userRoles && userRoles[10]['isAvailable'] != 0 &&(<Button variant="primary m-3" onClick={handleShow}>
                        اضف منطقة جديدة
                    </Button>)}
                    <NewAreaModal showModal={showInsertModal} handleClose={handleClose} submitAreaData={saveAreaData} />
                </div>
            </div>
            <ShowAreaTable fetchAreas={fetchAreas} areas={areas} saveAreaData={saveAreaData} showModal={showModifyModal} handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
}

export default Area;