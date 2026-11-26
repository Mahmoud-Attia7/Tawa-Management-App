import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModifyAreaModal from '../Modal/ModifyArea';
import ModifyBranchModal from '../Modal/ModifyBranch';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';


const ShowProducTable = ({ userRoles, searchUserRole, fetchProducts, products, saveProductData, showModal, handleClose, handleShow }) => {
    const { updateProduct } = useUser();
    const navigate = useNavigate();

    useEffect(()=>{
        fetchProducts();
    }, [])


   

    const deleteProduct = async (ID) => {
        const data = {
            ID: ID,
            flag: 'delete product'
        };
  
        try {
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const NavigateToProductDetails = (productData) => {
        updateProduct(productData)
        // console.log(productData);
        navigate("/pages/productDetails");
    }


    return (
        <div className="container">
            <div className="row  mt-5 ">
                <div className="col-12">
                    <h2 className="d-flex justify-content-end mb-5 me-4">المنتجات</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>اسم المنتج</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((product, index) => (
                                <React.Fragment key={index}>
                                                <tr key={index}> 
                                                    <td>
                                                    <td className="d-flex justify-content-center">
                                                        { userRoles && userRoles[8]['isAvailable'] == 1 && <Button variant="primary me-2" onClick={()=>{deleteProduct(product.ID)}}>حذف</Button>}
                                                        <Button variant="primary me-2" onClick={()=>NavigateToProductDetails(product)}>تفاصيل</Button>
                                                    </td>
                                                    </td>
                                                    <td>{product.name}</td>
                                                </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ShowProducTable;
