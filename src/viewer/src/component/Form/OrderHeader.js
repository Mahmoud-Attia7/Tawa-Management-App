import { Card } from 'react-bootstrap';
import React from 'react';

const OrderHeader = ({ orderData }) => {
    console.log(orderData)
    // Function to render rows of the card
    const renderRow = (label, value) => (
        <div className="row">
            <div className="col-6 text-left">{value}</div>
            <div className="col-6 text-end">{label}</div>
            <hr className="w-100" />
        </div>
    );

    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={{ maxWidth: '600px', margin: 'auto', marginTop: '20PX' }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">Order ({orderData.Reference})</Card.Title>
                {renderRow('تاريخ انشاء الطلب', orderData.date)}
                {renderRow('تاريخ التسليم', orderData.submition_date)}
                {renderRow('فرع', orderData.branchName)}
                {renderRow('مؤسس الطلب', orderData.employeeName)}
                {renderRow('عدد الافراد', orderData.guest_number)}
                {renderRow('اسم العميل', orderData.client_name)}
                {renderRow('رقم العميل', orderData.client_number)}
                {renderRow('حالة الطلب', orderData.status)}
            </Card.Body>
        </Card>
    );
};

export default OrderHeader;
