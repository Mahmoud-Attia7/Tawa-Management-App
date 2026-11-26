import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModifyAreaModal from '../Modal/ModifyArea';
import ModifyBranchModal from '../Modal/ModifyBranch';
import { useUser } from '../UserContext';
import { API_BASE } from '../../apiConfig';


const ShowBranchTable = ( {fetchBranchs, branchs, saveBranchData, showModal, handleClose, handleShow, areas} ) => {
    const [editBranch, setEditBranch] = useState([]);
    const { userRoles } = useUser();   

    const deleteBranch = async (areaID, branchID) => {
        const data = {
            areaID: areaID,
            branchID: branchID,
            flag: 'delete branch'
        };
  
        try {
            await axios.post(API_BASE + '/src/controller/person.php', data);
            fetchBranchs();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    return (
        <div className="container">
            <div className="row  mt-5 ">
                <div className="col-12">
                    <h2 className="d-flex justify-content-end mb-5 me-4">الفروع</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>اسم الفرع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branchs && branchs.map((branch, index) => (
                                <React.Fragment key={index}>
                                                <tr key={index}> 
                                                    <td>
                                                    {userRoles && userRoles[12]['isAvailable'] != 0 && (<td className="d-flex justify-content-center">
                                                        <Button variant="primary me-2" onClick={()=>{deleteBranch(branch.areaID, branch.branchID)}}>حذف</Button>
                                                        <Button variant="primary me-2" onClick={()=>{handleShow('modify'); setEditBranch(branch)}}>تعديل</Button>
                                                    </td>)}
                                                    </td>
                                                    <td>{branch.name}</td>
                                                </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                    <ModifyBranchModal showModal={showModal} handleClose={handleClose} branch={editBranch} updateBranchData={saveBranchData} areas={areas}/>
                </div>
            </div>
        </div>
    );
};

export default ShowBranchTable;
