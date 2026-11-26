import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../component/UserContext';
import ShowStuffTable from '../component/Table/ShowStuff';
import NewStuffModal from '../component/Modal/NewStuff';


const Stuff = () => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const { userRoles } = useUser();
    const [stuffs, setStuffs] = useState([]);

    const fetchStuffs = async ()=>{
        try{
            const areaDataResponse = await axios.get('http://localhost/Tawa%20Management%20App/src/controller/person.php');
            setStuffs(areaDataResponse.data[4]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }
    
    const saveStuffData = async (data) => {
         // Check if name field is filled
         if (!data.name) {
            // Client name validation
            alert('اسم الفئة مطلوب.');
            return;
        } 
        try {
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            handleClose();
            fetchStuffs();
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
                    {userRoles && userRoles[13]['isAvailable'] !=0  && <Button variant="primary m-3" onClick={handleShow}>
                        اضف حشوة جديدة
                    </Button>}
                    <NewStuffModal showModal={showInsertModal} handleClose={handleClose} submitStuffData={saveStuffData} />
                </div>
            </div>
            <ShowStuffTable fetchStuffs={fetchStuffs} stuffs={stuffs} submitStuffData={saveStuffData} showModal={showModifyModal} handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
}

export default Stuff;