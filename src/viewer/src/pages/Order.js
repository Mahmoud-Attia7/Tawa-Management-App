import React, { useEffect, useState } from 'react';
import Datepicker from 'react-datepicker';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../component/UserContext';

import axios from 'axios';
import NewOrderModal from '../component/Modal/NewOrder';
import ShowOrderTable from '../component/Table/ShowOrders';

const NewOrderPage = () => {
    const [showModal, setShowModal] = useState(false);
    const { userAuthenticateData, setRoles, setUserAuthenticateData, userRoles, setState, updateOrder } = useUser();
    const [userBranches, setUserBranches] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const storedURLSTR = localStorage.getItem('URL');
    const storedAUTHSTR = localStorage.getItem('auth');
    const URL = JSON.parse(storedURLSTR);
    const AUTH = JSON.parse(storedAUTHSTR);

    useEffect(()=>{
        
        setRoles(URL);
        setUserAuthenticateData(AUTH);
        fetchUserBranches(AUTH.userID);
        fetchOrders();
    }, [])

    

    const fetchOrders = async ()=>{
        try{
            const orderDataResponse = await axios.get('http://localhost/Tawa%20Management%20App/src/controller/person.php');
            FilterOrders(orderDataResponse.data[1]);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const submitOrder = async (data) => {
        console.log(data);
        try{
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            setState('new');
            updateOrder(data);
            navigate("/pages/insertItems");
        }catch(error){
            console.error("Error submitting your order due:", error);
        }
        handleClose();
    };

    const fetchUserBranches = async (userID)=>{
        try{
            const data = {
                userID: userID,
                flag: 'get user branches'
            }
            const userBranchesDataResponse = await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            setUserBranches(userBranchesDataResponse.data);
        }
        catch(error){
            alert('Error fetching data:', error);
        }
    }

    const searchUserRole = (name) => {
        var role =URL.find(obj=> obj['roleName'] == name)
        if(role){
            return role.isAvailable;
        }
    }

    const FilterOrders = (orders) => {
        var temp = orders.filter(order => {
            if(searchUserRole('relayer')){
               if(order.status == 'تم التسليم' || order.status == 'جاري الانتاج' || order.status == 'تم الانتاج' || order.status == 'انتهى')
                    return order;
            }
            else if(searchUserRole('cake') || searchUserRole('hala arabi') || searchUserRole('hala coffe') || searchUserRole('fatayer') || searchUserRole('red & chocolate')){
                if(order.status == 'جاري الانتاج' || order.status == 'تم الانتاج')
                     return order;
            }
            else{
                return order
            }
        })
        console.log();
        setFilteredOrders(temp);
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
                    { (searchUserRole('branch') == 1 || URL && URL[7]['isAvailable'] == 1) && ( <Button variant="primary m-3" onClick={handleShow}>
                            اضف طلب جديد
                        </Button>)}
                        <NewOrderModal userAuthenticateData={AUTH} userBranches={userBranches} showModal={showModal} handleClose={handleClose} submitOrderData={submitOrder}/>
                </div>
            </div>
            <ShowOrderTable fetchOrders={fetchOrders} orders={filteredOrders} userBranches={userBranches}  showModal={showModal} handleClose={handleClose} handleShow={handleShow}  searchUserRole={searchUserRole}/>
        </div>
    );
};

export default NewOrderPage;
