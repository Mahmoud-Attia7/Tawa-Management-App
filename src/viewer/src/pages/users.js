import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ShowUserTable from '../component/Table/ShowUsers';
import NewUserModal from '../component/Modal/NewUser';
import { useUser } from '../component/UserContext';
import { API_BASE } from '../apiConfig';




const Users = () => {
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [users, setUsers] = useState([]);
    const { userRoles } = useUser();



    const saveUserData = async (data) => {
        if (data.employeeName.trim() == '' || data.password.trim() == '' || data.phoneNumber.trim() == '' || data.email.trim() == '') {
            alert('جميع البيانات مطلوبة.');
            return;
        } 
        if (!/^[A-Za-z\s]+$/.test(data.employeeName)) {
            alert('اسم الموظف يجب أن يحتوي على أحرف فقط');
            return;
        }
        if (!/^\d+$/.test(data.phoneNumber)) {
            alert('رقم الهاتف يجب أن يحتوي على أرقام فقط');
            return;
        }
        if (!data.email.endsWith('@tawa.com')) {
            alert('البريد الإلكتروني يجب أن ينتهي بـ @tawa.com');
            return;
        }
        try {
            await axios.post(API_BASE + '/src/controller/person.php', data);
            handleClose();
            fetchUsers();
        } catch (error) {
            alert('لم بتم تسجيل البيانات.', error);
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

    const fetchUsers = async ()=>{
        try{
            const userDataResponse = await axios.get(API_BASE + '/src/controller/person.php');
            setUsers(userDataResponse.data[0]);
        }
        catch(error){
            alert('Error fetching data:', error);
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
                    {userRoles && userRoles[11]['isAvailable'] != 0 &&(<Button variant="primary m-3" onClick={handleShow}>
                        اضف مستخدم جديد
                    </Button>)}
                    <NewUserModal showModal={showInsertModal} handleClose={handleClose} submitUserData={saveUserData} /> 
                </div>
            </div>
            <ShowUserTable fetchUsers={fetchUsers} users={users} saveUserData={saveUserData} showModal={showModifyModal} handleClose={handleClose} handleShow={handleShow}/>
        </div>
    );
}

export default Users;