import { Button } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import CakeModal from '../component/Modal/ModifyCakeItem';
// import StuffModal from '../component/Modal/ModifyStuffItem';
import ShowItemTable from '../component/Table/ShowItems';
import InsertItem from '../component/Form/InsertItem';
import OrderHeader from '../component/Form/OrderHeader';
import { useUser } from '../component/UserContext';
import ModifyOrderModal from '../component/Modal/ModifyOrder';


const OrderDetails = () => {
    const [products, setProducts] = useState(null)
    const [items, setItems] = useState([]);
    const { userAuthenticateData, orderData, updateOrder, state, userRoles } = useUser();
    const [stuffing, setStuffing] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [hours, setHours] = useState(0);
    const [userBranches, setUserBranches] = useState([]);


    useEffect(() => {
        fetchUserBranches(userAuthenticateData.userID);
        setHours(isTimeVaild());
        fetchData();
    }, []); 
 
    const fetchData = async () => {
        try {
            const orderResponse = await axios.get('http://localhost/Tawa%20Management%20App/src/controller/person.php');
            if (state === 'new') {
                updateOrder(orderResponse.data[2][0]);
                fetchItems(orderResponse.data[2][0].ID);
            }
            else{
                fetchItems(orderData.ID);
            }   
            setProducts(orderResponse.data[3]);
            FilterProducts(orderResponse.data[3]) 
            setStuffing(orderResponse.data[6]);
        } catch (error) {
            alert('Error fetching data:', error);
        }
    };

    const fetchItems = async (MasterID) => {
        const data = {
            masterID: MasterID,
            flag: 'get items'
        };
        try {
            const itemsResponse = await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            setItems(itemsResponse.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
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
        var role =userRoles.find(obj=> obj['roleName'] == name)
        if(role){
            return role.isAvailable;
        }
    }

    const FilterProducts = (products) => {
        var temp = products.filter(product => {
            if(searchUserRole('cake')){
                console.log('hello');
                if(product.department == 'cake'){
                    return product; 
                }
            }
            else if(searchUserRole('hala arabi')){
                if(product.department == 'hala arabi')
                     return product;
            }
            else if(searchUserRole('hala coffe')){
                if(product.department == 'hala coffe')
                     return product;
            }
            else if(searchUserRole('fatayer')){
                if(product.department == 'fatayer')
                     return product;
            }
            else if(searchUserRole('red & chocolate')){
                if(product.department == 'red & chocolate')
                     return product;
            }
            else{
                return product
            }
        })
        console.log(temp);
        setFilteredProducts(temp);
    }

    const isTimeVaild = () => {
        const currentDate = new Date()
        const submissionDate = new Date(orderData.submition_date)
        const difference = submissionDate.getTime() - currentDate.getTime();
        const time = difference / (1000 * 60 * 60);
        return  time >= 24;
    }

    const cancelOrder = async () =>{
        var status = orderData.status;
        if(hours){
            if(searchUserRole('branch')){
                if(status == 'جديد')
                    status = 'ملغي';

                else if(status == 'تم التسليم')
                    status = 'جديد';
            }
            else if(searchUserRole('relayer')){
                if(status == 'جاري الانتاج')
                    status = 'تم التسليم'
                else if (status == 'انتهى')
                status = 'تم الانتاج'

            }
            else if(searchUserRole('cake') || searchUserRole('hala arabi') || searchUserRole('hala coffe') || searchUserRole('fatayer') || searchUserRole('red & chocolate')){
                if(status == 'تم الانتاج')
                    status = 'جاري الانتاج'
                else if(status == 'انتهى')
                    status = 'تم الانتاج'
                
            }
            const data = {
                ID: orderData.ID,
                Reference: orderData.Reference,
                flag: 'Canceled',
                status: status
            }
            console.log(data);
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data)
            updateOrder(data);
            fetchData();
        }
        else{
            alert('لقد مر الوقت المسموح للتعديل على الطلب!!')
        }
    }

    const submitOrder = async () =>{
        var status = orderData.status;
        if(searchUserRole('branch')){
            if(status == 'ملغي' && hours)
                status = 'جديد';
            else if(status == 'جديد'  && hours)
                status = 'تم التسليم';
            else if(!hours && status != 'تم التسليم'){
                alert('لقد مر الوقت المسموح للتعديل على الطلب!!')
            }
        }
        else if(searchUserRole('relayer')){
            if(status == 'تم التسليم'){
                status = 'جاري الانتاج'
            }
            else if(status == 'تم الانتاج'){
                status = 'انتهى'
            }
        }
        else if(searchUserRole('cake') || searchUserRole('hala arabi') || searchUserRole('hala coffe') || searchUserRole('fatayer') || searchUserRole('red & chocolate')){
            if(status == 'جاري الانتاج')
                status = 'تم الانتاج'
        }
        const data = {
            ...orderData,
            flag: 'Submited',
            status: status
        }
        await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data)
        updateOrder(data);
        fetchData();
    }

    const SaveOrderData = async (data) => {
        try{
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            updateOrder(data);
        }catch(error){
            console.error("Error submitting your order due:", error);
        }
        handleClose();
    };

    const handleClose = () => {
        setShowModifyModal(false);

    };

    const handleShow = () => {
        setShowModifyModal(true);
    };
    
    const handlePrint = async () => {
        const data = {
            userID: userAuthenticateData.userID,
            Reference: orderData.Reference,
            masterID: orderData.ID,
            flag: 'get orderDetails report',
            department: getDepartment()  // Simplified department handling
        };
    
        try {
            const response = await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data, {
                responseType: 'html'  // Ensures response is treated as plain text
            });
    
            const contentType = response.headers['content-type'];
    
            // Updated to handle content type with additional character encoding information
            if (contentType.includes('text/html')) {
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                    newWindow.document.open();
                    newWindow.document.write(response.data);  // Directly write response data to the new window
                    newWindow.print();  // Triggers the print dialog in the new window
                    newWindow.close();
                } else {
                    console.error('Failed to open a new window. It may be blocked by a popup blocker.');
                }
            } else {
                console.error('Unsupported content type:', contentType);
            }
        } catch (error) {
            console.error('Error fetching HTML content:', error);
        }
    };
    
    // Helper function to determine department based on user role
    function getDepartment() {
        if (searchUserRole('cake')) {
            return 'cake';
        } else if (searchUserRole('hala arabi')) {
            return 'hala arabi';
        } else if (searchUserRole('hala coffee')) {
            return 'hala coffee';
        } else if (searchUserRole('fatayer')) {
            return 'fatayer';
        } else if (searchUserRole('red & chocolate')) {
            return 'red & chocolate';
        }
        return '';  // Default case if no roles match
    }
    
    
    
    

    return(
        <main className="">
            <div className='row'>
                <div className='d-flex justify-content-start col mt-3'>
                    <h1>
                        Tawa <br/>
                        Special Orders
                    </h1>
                </div>
                <div className='d-flex justify-content-end col p-5'>
                    <Button variant="primary m-3" onClick={handlePrint}>اطبع التقرير</Button>
                    { (searchUserRole('branch') || userRoles[7]['isAvailable'] == 1) && hours  && !(orderData.status == "تم الانتاج" || orderData.status == "انتهى") &&  <Button variant="primary m-3" onClick={handleShow}>
                            قم بتعديل الطلب
                    </Button>}
                    <ModifyOrderModal  order={orderData} showModal={showModifyModal} handleClose={handleClose} submitOrderData={SaveOrderData} userBranches={userBranches}/> 
                </div>
            </div>
            <div className="container">
                <OrderHeader orderData={orderData}/>
                { searchUserRole('branch') == 1 && hours && orderData.status != "Finished" && <InsertItem products={products} MasterID={orderData.ID} fetchItems={fetchItems}/>}
                <ShowItemTable status={orderData.status} hours={hours} products={filteredProducts} items={items} fetchItems={fetchItems} MasterID={orderData.ID} Stuffing={stuffing}/>
                <div className='d-flex justify-content-end mb-3'>
                    {(searchUserRole('branch') == 1 || searchUserRole('relayer') == 1 || searchUserRole('cake') || searchUserRole('hala arabi') || searchUserRole('hala coffe') || searchUserRole('fatayer') || searchUserRole('red & chocolate') || userRoles && userRoles[7]['isAvailable'] == 1) && (
                    <>
                        <Button variant="primary me-2" onClick={cancelOrder}>الغاء الطلب</Button>
                        <Button variant="primary " onClick={submitOrder}>ارسال</Button>
                    </>) }
                </div>
            </div>
            
        </main>
    );
};

export default OrderDetails;