import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModifyAreaModal from '../Modal/ModifyArea';
import ModifyCategoryModal from '../Modal/ModifyCategory';
import { useUser } from '../UserContext';


const ShowCategoryTable = ( {fetchCategories, categories, saveCategoryData, showModal, handleClose, handleShow} ) => {
    const { userRoles } = useUser();

    const [editCategory, setEditCategory] = useState([]);
    useEffect(()=>{
        fetchCategories()
    }, [])

    const deleteCategory = async (ID) => {
        const data = {
            ID: ID,
            flag: 'delete category'
        };

        try {
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    return (
        <div className="container">
            <div className="row  mt-5 ">
                <div className="col-12">
                    <h2 className="d-flex justify-content-end mb-5 me-4">الفئات</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>اسم الفئة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.map((category, index) => (
                                <React.Fragment key={index}>
                                                <tr key={index}> 
                                                    <td>
                                                   {userRoles && userRoles[9]['isAvailable'] != 0 &&( <td className="d-flex justify-content-center">
                                                        <Button variant="primary me-2" onClick={()=>{deleteCategory(category.ID)}}>حذف</Button>
                                                        <Button variant="primary me-2" onClick={()=>{handleShow('modify'); setEditCategory(category)}}>تعديل</Button>
                                                    </td>)}
                                                    </td>
                                                    <td>{category.name}</td>
                                                </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                    <ModifyCategoryModal showModal={showModal} handleClose={handleClose} category={editCategory} submitCategoryData={saveCategoryData}/>
                </div>
            </div>
        </div>
    );
};

export default ShowCategoryTable;
