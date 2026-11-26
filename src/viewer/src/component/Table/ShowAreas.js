import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import ModifyAreaModal from '../Modal/ModifyArea';
import { useUser } from '../UserContext';


const ShowAreaTable = ( {fetchAreas, areas, saveAreaData, showModal, handleClose, handleShow} ) => {
    const [editArea, setEditArea] = useState([]);
    const { userRoles } = useUser();

    useEffect(()=>{
        fetchAreas()
    }, [])

    const deleteArea = async (areaID) => {
        const data = {
            areaID: areaID,
            flag: 'delete area'
        };
  
        try {
            await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', data);
            fetchAreas();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    return (
        <div className="container">
            <div className="row  mt-5 ">
                <div className="col-12">
                    <h2 className="d-flex justify-content-end mb-5 me-4">المناطقق</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>اسم المنطقة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areas && areas.map((area, index) => (
                                <React.Fragment key={index}>
                                                <tr key={index}> 
                                                    <td>
                                                    {userRoles && userRoles[10]['isAvailable'] != 0 &&(<td className="d-flex justify-content-center">
                                                        <Button variant="primary me-2" onClick={()=>{deleteArea(area.areaID)}}>حذف</Button>
                                                        <Button variant="primary me-2" onClick={()=>{handleShow('modify'); setEditArea(area)}}>تعديل</Button>
                                                    </td>)}
                                                    </td>
                                                    <td>{area.name}</td>
                                                </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>
                    <ModifyAreaModal showModal={showModal} handleClose={handleClose} area={editArea} updateAreaData={saveAreaData}/>
                </div>
            </div>
        </div>
    );
};

export default ShowAreaTable;
