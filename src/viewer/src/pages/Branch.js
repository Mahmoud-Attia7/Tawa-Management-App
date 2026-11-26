import React, { useEffect, useState } from 'react';
import Datepicker from 'react-datepicker';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import NewBranchModal from '../component/Modal/NewBranch';
import ShowBranchTable from '../component/Table/ShowBranchs';
import { useUser } from '../component/UserContext';
import { API_BASE } from '../apiConfig';


const Branch = () => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [branches, setBranches] = useState([]);
    const [areas, setAreas] = useState([]);
    const { userRoles } = useUser();

    useEffect(()=>{
        fetchBranchesAndAreas();
    }, [])
   
    const fetchBranchesAndAreas = async ()=>{
        try{
            const branchDataResponse = await axios.get(API_BASE + '/src/controller/person.php');
            setBranches(branchDataResponse.data[7]);
            setAreas(branchDataResponse.data[8]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const saveBranchData = async (data) => {
        // Check if name field is filled
        if (!data.name) {
            // Client name validation
            alert('اسم الفرع مطلوب.');
            return;
        } 
        
        try {
            await axios.post(API_BASE + '/src/controller/person.php', data);
            handleClose();
            fetchBranchesAndAreas();
            console.log(data)
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
                    {userRoles && userRoles[12]['isAvailable'] != 0 && (<Button variant="primary m-3" onClick={handleShow}>
                        اضف فرع جديد
                    </Button>)}
                    <NewBranchModal showModal={showInsertModal} handleClose={handleClose} submitBranchData={saveBranchData} areas={areas}/>
                </div>
            </div>
            <ShowBranchTable fetchBranchs={fetchBranchesAndAreas} branchs={branches} saveBranchData={saveBranchData} showModal={showModifyModal} handleClose={handleClose} handleShow={handleShow} areas={areas}/>
        </div>
    );
}

export default Branch;