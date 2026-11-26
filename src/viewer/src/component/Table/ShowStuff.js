import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import ModifyStuffModal from '../Modal/ModifyStuff';
import { useUser } from '../UserContext';
import { API_BASE } from '../../apiConfig';


const ShowStuffTable = ( {fetchStuffs, stuffs, submitStuffData, showModal, handleClose, handleShow} ) => {
    const [editStuff, setEditStuff] = useState([]);
    const { userRoles } = useUser();

    useEffect(()=>{
        fetchStuffs()
    }, [])

    const deleteStuff = async (stuffID) => {
        const data = {
            stuffID: stuffID,
            flag: 'delete stuff'
        };
  
        try {
            await axios.post(API_BASE + '/src/controller/person.php', data);
            fetchStuffs();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    return (
        <div className="container">
            <div className="row  mt-5 ">
                <div className="col-12">
                    <h2 className="d-flex justify-content-end mb-5 me-4">الحشوات</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>اسم الحشوة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stuffs && stuffs.map((stuff, index) => (
                                <React.Fragment key={index}>
                                                <tr key={index}> 
                                                    <td>
                                                    {userRoles && userRoles[13]['isAvailable'] != 0 &&(<td className="d-flex justify-content-center">
                                                        <Button variant="primary me-2" onClick={()=>{deleteStuff(stuff.ID)}}>حذف</Button>
                                                        <Button variant="primary me-2" onClick={()=>{handleShow('modify'); setEditStuff(stuff)}}>تعديل</Button>
                                                    </td>)}
                                                    </td>
                                                    <td>{stuff.name}</td>
                                                </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                    <ModifyStuffModal showModal={showModal} handleClose={handleClose} stuff={editStuff} submitStuffData={submitStuffData}/>
                </div>
            </div>
        </div>
    );
};

export default ShowStuffTable;
