import { Form, Button, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../apiConfig';

const InsertItem = ({ products, MasterID, fetchItems }) => {
    const [itemData, setItemData] = useState({
        'productID': '',
        'value': '',
        'quantity': '',
        'flag': 'insert'
    });

    const handleValueChange = (event) => {
        setItemData((prevState) => ({
            ...prevState,
            value: event.target.value
        }));
    };

    const handleQuantityChange = (event) => {
        setItemData((prevState) => ({
            ...prevState,
            quantity: event.target.value
        }))
    };

    const submitItem = async (MasterID) => {
        try {
            const data = {
                ...itemData,
                masterID: MasterID
            };
            await axios.post(API_BASE + '/src/model/order.php', data);
            fetchItems(MasterID);
            setItemData({
                'productID': '',
                'value': '',
                'quantity': '',
                'flag': 'insert'
            });
        } catch (error) {
            console.error('Error submitting item:', error);
        }
    };

    return (
        <Card className="mt-5" style={{ maxWidth: '600px', margin: 'auto'}}>
            <Card.Body>
                <div className="row d-flex text-center">
                    <Form className="col-12">
                        <Form.Group>
                            <Form.Label>ادخل المنتج</Form.Label>
                            <Form.Control as='input' type="text" value={itemData.value} onChange={handleValueChange} />
                            <Form.Control as='select' value={itemData.productID} onChange={handleValueChange}>
                                <option value="">ابحث عن المنتج</option>
                                {products && products.filter(product =>{
                                if(product.name.includes(itemData.value)){
                                    itemData.productID = product.ID;
                                    return product;
                                    
                                }
                                else if (product.reference.includes(itemData.value)){
                                        itemData.productID = product.ID;
                                        return product;
                                        
                                        }
                                    }).map((product, index) => (
                                        <option key={index}>{product.name}</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Label>الكمية</Form.Label>
                            <Form.Control type="text" value={itemData.quantity} onChange={handleQuantityChange} />
                            <br />
                            <Button onClick={() => submitItem(MasterID)}>اضف المنتج</Button>
                        </Form.Group>
                    </Form>
                </div>
            </Card.Body>
        </Card>
    );
}

export default InsertItem;
