import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import OrderDetails from '../../pages/OrderDetails';


const ShowOrderTable = ({ fetchOrders, userBranches, orders, saveOrderData, showModal, handleClose, handleShow, searchUserRole }) => {
    const [filterStatus, setFilterStatus] = useState('الكل');
    const [filterBranch, setFilterBranch] = useState('الكل');
    const [filterReference, setFilterReference] = useState('');
    const [filterSubmitionDate, setFilterSubmitionDate] = useState('الكل');
    const [filterCreationDate, setFilterCreationDate] = useState('الكل');
    
    const [editOrder, setEditOrder] = useState([]);
    const { userRoles, updateOrder, setState } = useUser();

    const navigate = useNavigate();

    const cancelOrder = async (oID, reference, state, submition_date) =>{
        var status =  state;

        if(isTimeVaild(submition_date) >= 24){
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
                ID: oID,
                Reference: reference,
                flag: 'Canceled',
                status: status
            }
            console.log(data);
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data)
            fetchOrders();
        }
        else{
            alert('لقد مر الوقت المسموح للتعديل على الطلب!!')
        }
    }

    const isTimeVaild = (submition_date) => {
        const currentDate = new Date()
        const submissionDate = new Date(submition_date)
        const difference = submissionDate.getTime() - currentDate.getTime();
        const time = difference / (1000 * 60 * 60);
        return  time;
    }

    const NavToOrderDetailes = (orderData) => {
        updateOrder(orderData)
        setState('old');
        navigate("/pages/insertItems");
    }

    const handlePrint = () => {
        const tableHTML = document.getElementById('myTable').outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>Print table</title>
                    <style>
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        .no-print { display: none; } /* Hide elements with 'no-print' class */
                        @media print {
                            body, html {
                                visibility: hidden;
                            }
                            .printable, .printable * {
                                visibility: visible;
                            }
                            .printable {
                                position: absolute;
                                left: 0;
                                top: 0;
                            }
                            @media print {
                                .no-print {
                                    display: none !important;
                                }
                            }
                        }
                    </style>
                </head>
                <body class="printable">
                    ${tableHTML}
                    <script>
                        window.print();
                        window.close();
                    </script>
                </body>
            </html>
        `);
        newWindow.document.close();
    };

    const handelFilterChange = (filter, value) => {
        if(filter == "status"){
            if(value == "اختر حالة الطلب")
            {
                setFilterStatus("الكل")
            }
            else{
                setFilterStatus(value)
            }
        }
        else if (filter == "branch"){
            if(value == "اختر الفرع")
            {
                setFilterBranch("الكل")
            }
            else{
                setFilterBranch(value)
            }
        }
        else if (filter == "submition_date"){    
            if (value == "") {
                setFilterSubmitionDate("الكل");
            } else {
                const selectedDate = new Date(value);
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
                const day = String(selectedDate.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                console.log(formattedDate);
                setFilterSubmitionDate(formattedDate);
            }
            
        }
        else if (filter == "creation_date"){    
            if (value == "") {
                setFilterCreationDate("الكل");
            } else {
                const selectedDate = new Date(value);
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(selectedDate.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                setFilterCreationDate(formattedDate);
            }
            
        }
        else if (filter == "reference"){
            if(value == "")
            {
                setFilterReference("")
            }
            else{
                setFilterReference(value)
            }
        }
    }
    const resetFilters = () => {
        handelFilterChange('status', "اختر حالة الطلب")
        handelFilterChange('branch', "اختر الفرع")
        handelFilterChange('submition_date', "")
        handelFilterChange('creation_date', "")
        handelFilterChange('reference', "")
    }

    return (
        <div className="container">
            <div className="row  mt-5 ">
                <div className="col-12">
                    <h2 className="d-flex justify-content-end mb-5 me-4">الطلبات</h2>
                    <Button className='ms-5 mb-3' onClick={handlePrint}>اطبع الجدول</Button>
                    <Button className='ms-5 mb-3' onClick={resetFilters}>اعادة ظبط الفلاتر</Button>

                    <Form.Group className="row ps-3" >
                        <Form.Label className=" ms-5 col-2">حالة الطلب</Form.Label>
                        <Form.Label className=" ms-5 col-1">الفرع</Form.Label>
                        <Form.Label className=" ms-5 col-2">تاريخ استلام الطلب</Form.Label>
                        <Form.Label className=" ms-5 col-2">تاريخ انشاء الطلب</Form.Label>
                        <Form.Label className=" ms-5 col-2">ادخل الرقم المرجعي</Form.Label>
                    </Form.Group>
                    <Form.Group className="row mb-3">
                        <Form.Control className=" text-center mb-3 col-1 mx-4" value={filterStatus} style={{'width' : '150px'}} as='select' onChange={(e)=>handelFilterChange('status', e.target.value)}>
                            <option>اختر حالة الطلب</option>
                            <option>الكل</option>
                            <option>ملغي</option>
                            <option>جديد</option>
                            <option>تم التسليم</option>
                            <option>جاري الانتاج</option>
                            <option>تم الانتاج</option>
                            <option>انتهى</option>
                        </Form.Control>
                        <Form.Control  className=" text-center mb-3 col-1 mx-4" value={filterBranch} style={{'width' : '150px'}} as='select' onChange={(e)=>handelFilterChange('branch', e.target.value)}>
                            <option>اختر الفرع</option>
                            <option>الكل</option>
                            {userBranches && userBranches.map(userBranche => (
                                <option>{userBranche.name}</option>
                            ))}
                        </Form.Control>
                        <Form.Control
                            className=" text-center mb-3 col-1 mx-4"
                            value={filterSubmitionDate}
                            style={{'width' : '150px'}}
                            type='date'
                            onChange={(e) =>handelFilterChange('submition_date', e.target.value)}
                        />
                        <Form.Control
                            id="creationDateInput"
                            className= "text-center mb-3 col-1 mx-4"
                            value={filterCreationDate}
                            style={{ width: '150px' }}
                            type='date'
                            onChange={(e) => handelFilterChange('creation_date', e.target.value)}
                        />
                        <Form.Control  className=" text-center mb-3 col-1 ms-5" value={filterReference} style={{'width' : '150px'}} type='text' onChange={(e)=>handelFilterChange('reference', e.target.value)}
                            placeholder='ادخل الرقم المرجعي'
                        >
                        </Form.Control>
                    </Form.Group>
                    <Table striped bordered hover id='myTable'>
                        <thead>
                            <tr>
                                <th className="no-print"></th> {/* Adjusted to use className for consistency */}
                                <th>حالة الطلب</th>
                                <th>عدد الافراد لطلبات الزواج</th>
                                <th>تاريخ تسليم الطلب</th>
                                <th>تاريخ انشاء الطلب</th>
                                <th>رقم العميل</th>
                                <th>اسم العميل</th>
                                <th>الرقم المرجعي</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.filter(order => {
                                return userBranches.some(userBranch => userBranch.name.includes(order.branchName));
                            }).filter(order => {
                                if(filterStatus == 'الكل')
                                    return true
                                else if(order.status == filterStatus)
                                    return true
                                
                            }).filter(order => {
                                if(filterBranch == 'الكل')
                                    return true
                                else if(order.branchName == filterBranch)
                                    return true
                                
                            }).filter(order => {
                                if(filterReference == '')
                                    return true
                                else if(order.Reference.includes(filterReference))
                                    return true
                                
                            }).filter(order => {
                                if(filterSubmitionDate == 'الكل')
                                    return true
                                else if(order.submition_date == filterSubmitionDate)
                                    return true
                                
                            }).filter(order => {
                                if(filterCreationDate == 'الكل')
                                    return true
                                else if(order.date == filterCreationDate)
                                    return true
                            }).map((order, index) => (
                                <tr key={index}>
                                    <td className="no-print">
                                        <div className="d-flex justify-content-center">
                                            {(searchUserRole('branch') == 1 || searchUserRole('relayer') == 1 || searchUserRole('cake') || searchUserRole('hala arabi') || searchUserRole('hala coffe') || searchUserRole('fatayer') || searchUserRole('red & chocolate') || userRoles && userRoles[7]['isAvailable'] == 1) &&
                                                <Button variant="primary me-2" onClick={() => cancelOrder(order.    ID, order.Reference, order.status, order.submition_date)}>حذف</Button>
                                            }
                                            <Button variant="primary me-2" onClick={() => NavToOrderDetailes(order)}>تفاصيل</Button>
                                        </div>
                                    </td>
                                    <td>{order.status}</td>
                                    <td>{order.guest_number}</td>
                                    <td>{order.submition_date}</td>
                                    <td>{order.date}</td>
                                    <td>{order.client_number}</td>
                                    <td>{order.client_name}</td>
                                    <td>{order.Reference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ShowOrderTable;