import React, { useEffect, useState } from 'react';
import { useUser } from '../component/UserContext';
import { Card, ListGroup } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ModifyUserModal from '../component/Modal/ModifyUser';
import { API_BASE } from '../apiConfig';



const UserDetails = () => {
    const { user, updateUser } = useUser();
    const [userRoles, setUserRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const [userBranches, setUserBranches] = useState([]);
    const [areas, setAreas] = useState([]);
    const [userAreas, setUserAreas] = useState([]);
    const [showModifyModal, setShowModifyModal] = useState(false);


    useEffect(()=>{
        fetchUserRole();
        fetchBranchs();
        fetchUserBranchesAndAreas(user.userID, 'get user branches');
        fetchAreas();
        fetchUserBranchesAndAreas(user.userID, 'get user areas');
    }, [])

    const fetchUserRole = async ()=>{
        try{
            const data = {
                userID: user.userID,
                flag: 'getUserRoles'
            }
            const userDataResponse = await axios.post(API_BASE + '/src/controller/person.php', data);
            setUserRoles(userDataResponse.data);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const updateUserRole = async (userID, roleID, isAvailable) => {
        try{
            const data = {
                userID: userID,
                roleID: roleID,
                isAvailable:  isAvailable === 0 ? 1 : 0,
                flag: 'updateUserRoles'
            }
            await axios.post(API_BASE + '/src/controller/person.php', data);
            fetchUserRole();
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const fetchBranchs = async ()=>{
        try{
            const branchDataResponse = await axios.get(API_BASE + '/src/controller/person.php');
            setBranches(branchDataResponse.data[7]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const fetchUserBranchesAndAreas = async (userID, Flag)=>{
        try{
            const data = {
                userID: userID,
                flag: Flag
            }
            const userBranchesDataResponse = await axios.post(API_BASE + '/src/controller/person.php', data);
            if(Flag == 'get user branches'){
                setUserBranches(userBranchesDataResponse.data);
            }
            else{
                setUserAreas(userBranchesDataResponse.data);
            }
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const Is_Available = (name, array) => {
        const entity = array.find(obj => obj['name'] == name);
        if(entity){
            return true;
        }
        else{
            return false;
        }
    }

    const fetchAreas = async ()=>{
        try{
            const areaDataResponse = await axios.get(API_BASE + '/src/controller/person.php');
            setAreas(areaDataResponse.data[8]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const updateUserBranchAndArea = async (userID, ID, name, isAvailable, flag) => {
        try{
            const data = {
                userID: userID,
                ID: ID,
                name: name,
                isAvailable:  isAvailable,
                flag: flag
            }
            await axios.post(API_BASE + '/src/controller/person.php', data);
            if(flag == 'update user area'){
                const areaBranches = branches.filter(obj => obj['areaID'] === ID);
                areaBranches.forEach(areaBranch => {
                    updateUserBranchAndArea(userID, areaBranch['branchID'], areaBranch['name'], isAvailable, 'update user branch');
                })
            }
            fetchUserBranchesAndAreas(user.userID, 'get user branches');
            fetchUserBranchesAndAreas(user.userID, 'get user areas');
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const saveUserData = async (data) => {
        if ( !data.employeeName || !data.phoneNumber || !data.email) {
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
            updateUser(data);
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

    if (!user) return <div>No user selected</div>;

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
                    <Button variant="primary m-3" onClick={handleShow}>
                            قم بتعديل بيانات المستخدم
                    </Button>
                    <ModifyUserModal user={user} showModal={showModifyModal} handleClose={handleClose} saveUserData={saveUserData}/>
                </div>
            </div>
            <section style={{ width: '500px', margin: 'auto', marginTop: '50px'}}>
                <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Card.Header as="h5" className='d-flex justify-content-center'>بيانات المستخدم</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className='d-flex justify-content-center'> {user.employeeName} <strong> :اسم الموظف</strong></ListGroup.Item>
                        {/* <ListGroup.Item className='d-flex justify-content-center'>{user.userPassword} <strong> :كلمة السر</strong> </ListGroup.Item> */}
                        <ListGroup.Item className='d-flex justify-content-center'>{user.phoneNumber} <strong> :رقم الهاتف</strong> </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-center'>{user.email} <strong> :البريد الالكتروني</strong> </ListGroup.Item>
                    </ListGroup>
                </Card>
            </section>

            <section className="role-section" style={{ width: '500px', margin: 'auto' , marginTop: '50px' }}>
                <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Card.Header as="h5">Roles</Card.Header>
                    <ListGroup variant="flush">
                        {userRoles.map((role, index) => (
                            <ListGroup.Item key={index}>
                                <Form.Check type="checkbox" 
                                    id={`role-checkbox-${index}`} 
                                    label={role.roleName} 
                                    onClick={()=>updateUserRole(role.userID, role.roleID, role.isAvailable)} 
                                    checked={role.isAvailable === 1} 
                                    readOnly
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </section>
            <section className="role-section" style={{ width: '500px', margin: 'auto' , marginTop: '50px' }}>
                <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Card.Title className='text-end'  as="h5">الفروع</Card.Title >
                    <ListGroup variant="flush">
                        {areas && areas.map((area, index1) => (
                            <React.Fragment>
                                <div className='d-flex justify-content-end mt-3'>
                                    <Button type="checkbox" 
                                    id={`area-checkbox-${index1}`} 
                                    checked={Is_Available(area.name, userAreas)}
                                    onClick={(event)=>updateUserBranchAndArea(user.userID, area.areaID, area.name, !event.target.checked, 'update user area')} 
                                    className='d-flex justify-content-center mt-3' style={{width: '100px'}}  as="h5">
                                        {area.name}
                                    </Button> 
                                </div> 
                                {branches.map((branch, index2) => {
                                    if(branch.areaID == area.areaID){return(
                                        <ListGroup.Item key={index2}>
                                            <Form.Check type="checkbox" 
                                                id={`branch-checkbox-${index2}`} 
                                                label={branch.name} 
                                                checked={Is_Available(branch.name, userBranches)}
                                                onClick={(event)=>updateUserBranchAndArea(user.userID, branch.branchID, branch.name, event.target.checked, 'update user branch')} 
                                                readOnly
                                            />
                                        </ListGroup.Item>
                                    )}
                            })}
                            </React.Fragment>
                        ))}
                    </ListGroup>
                </Card>
            </section>
        </div>
    );
};

export default UserDetails;