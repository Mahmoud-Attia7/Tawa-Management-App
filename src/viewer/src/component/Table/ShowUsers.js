import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import ModifyUserModal from '../Modal/ModifyUser';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const ShowUserTable = ( {fetchUsers, users, saveUserData, showModal, handleClose, handleShow} ) => {
    const [editUser, setEditUser] = useState([]);
    const { userRoles, updateUser } = useUser();
    const [filterName, setFilterName] = useState('الكل');
    const [filterNumber, setFilterNumber] = useState('الكل');
    const [filterEmail, setFilterEmail] = useState('الكل');
    
    const navigate = useNavigate();
    useEffect(()=>{
        fetchUsers()
    }, [])

    const deleteUser = async (email) => {
        const data = {
            email: email,
            flag: 'delete'
        };
  
        try {
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const NavToUserDetailes = (userData) => {
        updateUser(userData)
        console.log(userData);
        navigate("/pages/userDetails");
    }

    return (
        <div className="container">
            <div className="row  mt-5 ">
                <div className="col-12">
                    <h2 className="d-flex justify-content-end mb-5 me-4">المستخدمين</h2>
                    <Form.Group className='row'>
                        <Form.Control  className=" text-center mb-3 col-4 ms-5"  style={{'width' : '270px'}} type='text' onChange={(e)=>{
                                if(e.target.value == "")
                                {
                                    setFilterEmail("الكل")
                                }
                                else{
                                    setFilterEmail(e.target.value)
                                }
                            }}
                            placeholder='ادخل البريد الالكتروني '
                        />
                        <Form.Control  className=" text-center mb-3 col-4 ms-5"  style={{'width' : '270px'}} type='text' onChange={(e)=>{
                                if(e.target.value == "")
                                {
                                    setFilterNumber("الكل")
                                }
                                else{
                                    setFilterNumber(e.target.value)
                                }
                            }}
                            placeholder='ادخل رقم الهاتف'
                        />
                        <Form.Control  className=" text-center mb-3 col-4 ms-5"  style={{'width' : '270px'}} type='text' onChange={(e)=>{
                                if(e.target.value == "")
                                {
                                    setFilterName("الكل")
                                }
                                else{
                                    setFilterName(e.target.value)
                                }
                            }}
                            placeholder='ادخل اسم الموظف'
                        />
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>البريد الالكتروني</th>
                                <th>رقم الهاتف</th>
                                <th>اسم الموظف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.filter(user => {
                                if(filterName == 'الكل')
                                    return true
                                else if(user.employeeName.includes(filterName))
                                    return true
                                
                            }).filter(user => {
                                if(filterNumber == 'الكل')
                                    return true
                                else if(String(user.phoneNumber).includes(filterNumber))
                                    return true
                                
                            }).filter(user => {
                                if(filterEmail == 'الكل')
                                    return true
                                else if(user.email.includes(filterEmail))
                                    return true
                                
                            }).map((user, index) => (
                                <React.Fragment key={index}>
                                    <tr key={index}> 
                                        <td>
                                        {userRoles && userRoles[11]['isAvailable'] != 0 &&(<td className="d-flex justify-content-center">
                                            <Button variant="primary me-2" onClick={()=>{deleteUser(user.email)}}>حذف</Button>
                                            <Button variant="primary me-2"    onClick={()=>NavToUserDetailes(user)} >تعديل</Button>
                                            {/* onClick={()=>{handleShow('modify'); setEditUser(user)}} */}
                                        </td>)}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.employeeName}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                    <ModifyUserModal showModal={showModal} handleClose={handleClose} user={editUser} saveUserData={saveUserData}/>
                </div>
            </div>
        </div>
    );
};

export default ShowUserTable;
