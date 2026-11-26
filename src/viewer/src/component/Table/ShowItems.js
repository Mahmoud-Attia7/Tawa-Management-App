import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CakeItemModal from '../Modal/ModifyCakeItem';
import NormalItemModal from '../Modal/ModifyNormalItem';
import StuffedItemModal from '../Modal/ModifyStuffItem';
import { useUser } from '../UserContext';
import { API_BASE } from '../../apiConfig';

const ShowItemTable = ({ status, hours, products, items, fetchItems, MasterID, Stuffing }) => {
    const [showCakeModal, setShowCakeModal] = useState(false);
    const [showNormalModal, setShowNormalModal] = useState(false);
    const [showStuffedModal, setShowStuffedModal] = useState(false);
    const [file, setFile] = useState(null);
    const [normalItem, setNormalItem] = useState([]);
    const [stuffedItem, setStuffedItem] = useState([]);
    const { userRoles } = useUser();

    const [cakeItem, setCakeItem] = useState({
        width1: 0,
        width2: 0,
        width3: 0,
        height1: 0,
        height2: 0,
        height3: 0,
        length1: 0,
        length2: 0, 
        length3: 0,
        stuff1: '',
        stuff2: '',
        stuff3: '',
        phrase1: '',
        phrase2: '',
        phrase3: '',
        flag: 'cake', 
        shape: '',
        levels: 0
      });

    const handleShow = (iID, pID, iName, q, type) => {
        if (type === 'stuff') {
            setStuffedItem({
                oID: MasterID,
                iID: iID,
                productID: pID,
                quantity: q,
                type: type,
            });
            setShowStuffedModal(true);
        } else if (type === 'cake') {
            fetchCakeProb(MasterID, iID, pID);
            setShowCakeModal(true);
        } else if (type === 'normal') {
            setNormalItem({
                iID: iID,
                quantity: q,
                type: type,
                flag: 'update'
            });
            setShowNormalModal(true);
        }
    };

    const fetchCakeProb = async ( oID, iID, pID ) => {
        const data = { 
          oID: oID,
          iID: iID,
          flag: 'get' 
        }
        try {
          const response = await axios.post(API_BASE + '/src/model/order.php', data);
          if((response.data).length != 0){
                setCakeItem((prevState) => ({
                    ...prevState,
                    ...response.data,
                    oID: MasterID,
                    iID: iID,
                    productID: pID
                }));
          }
          else{
            setCakeItem(() => ({
                width1: 0,
                width2: 0,
                width3: 0,
                height1: 0,
                height2: 0,
                height3: 0,
                length1: 0,
                length2: 0, 
                length3: 0,
                stuff1: '',
                stuff2: '',
                stuff3: '',
                phrase1: '',
                phrase2: '',
                phrase3: '',
                flag: 'cake', 
                shape: '',
                levels: 0,
                oID: MasterID,
                iID: iID,
                productID: pID
              }));
            }
        } catch (error) {
          console.error('Error fetching Stuffs By Items:', error);
        }
      };

    const handleClose = () => {
        setShowCakeModal(false);
        setShowNormalModal(false);
        setShowStuffedModal(false);
    };

    const handelFileChange = (value) => {
        setFile(value);
    };

    const uploadFile = async (itemID) => {
        if (file !== null) {
            console.log(file);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('ID', itemID);

            try {
                await axios.post(API_BASE + '/src/model/order.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleDownloadFile = async (iID) => {
        const data = {
            ID: iID,
            flag: 'download'
        };

        try {
            const response = await axios.post(API_BASE + '/src/model/order.php', data, {
                responseType: 'blob'
            });

            const contentType = response.headers['content-type'];

            if (contentType === 'application/pdf' || contentType.startsWith('image/')) {
                const blob = new Blob([response.data], { type: contentType });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `item.${contentType.split('/')[1]}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error('Unsupported file type:', contentType);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const deleteItem = async (oID, iID, type) => {
        const data = {
            oID : oID,
            iID: iID,
            type: type,
            flag: 'delete item'
        };

        try {
            await axios.post(API_BASE + '/src/model/order.php', data);
            fetchItems(MasterID);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const searchUserRole = (name) => {
        var role =userRoles.find(obj=> obj['roleName'] == name)
        if(role){
            return role.isAvailable;
        }
    }

    const submitModifiedItem = async (data) => {
        try {
            console.log(data);
            await axios.post(API_BASE + '/src/model/order.php', data);
            fetchItems(MasterID);
            if (file != null) {
                uploadFile(data.iID);
                setFile(null);
            }
            
            handleClose();
        } catch (error) {
            console.error('Error submitting item:', error);
        }
    };

    

    return (
        <div className="row mt-5 ">
            <div className="col-12">
                <h2 className="d-flex justify-content-end">الاصناف</h2>
            

                <Table striped bordered hover id='myTable'>
                    <thead>
                        <tr>
                            <th className="no-print"></th>
                            <th className="no-print">الملف</th>
                            <th>الكمية</th>
                            <th>الرقم المرجعي</th>
                            <th>اسم المنتج</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item, index) => (
                            <React.Fragment key={index}>
                                {products.map((product) => {
                                    if (product.ID === item.ProductID) {
                                        return (
                                            <tr key={index}>
                                                <td className="d-flex justify-content-center no-print">
                                                   {searchUserRole('branch') == 1 && (hours) && <Button variant="primary me-2" onClick={() => deleteItem(MasterID, item.ID, product.type)}>حذف</Button>}
                                                    <Button variant="primary" onClick={() => handleShow(item.ID, item.ProductID, product.name, item.Quantity, product.type)}>اضافات</Button>
                                                </td>
                                                <td className="no-print" ><Link to='/pages/insertItems' variant="primary me-2" onClick={() => handleDownloadFile(item.ID)}>تنزيل</Link></td>
                                                <td>{item.Quantity}</td>
                                                <td>{product.reference}</td>
                                                <td>{product.name}</td>
                                                <td>{index + 1}</td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div>
                <CakeItemModal status={status} hours={hours} isBranch={searchUserRole('branch')} showModal={showCakeModal} handleClose={handleClose} cakeItem={cakeItem} setCakeItem={setCakeItem} submitModifiedItem={submitModifiedItem} file={file} handleFileChange={handelFileChange} stuffing={Stuffing} />
                <NormalItemModal status={status} hours={hours} isBranch={searchUserRole('branch')}  showModal={showNormalModal} handleClose={handleClose} modifyItemData={normalItem} submitModifiedItem={submitModifiedItem} file={file} handleFileChange={handelFileChange} />
                <StuffedItemModal status={status} hours={hours} isBranch={searchUserRole('branch')}  showModal={showStuffedModal} handleClose={handleClose} modifyItemData={stuffedItem} submitModifiedItem={submitModifiedItem} file={file} handleFileChange={handelFileChange} stuffing={Stuffing} />
            </div>
        </div>
    );
};

export default ShowItemTable;
