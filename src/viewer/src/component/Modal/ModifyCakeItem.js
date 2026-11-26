import { Modal, Form, Button, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

const ModifyCakeModal = ({ status, hours, isBranch, showModal, handleClose, cakeItem, setCakeItem, handleFileChange, submitModifiedItem, stuffing , fetchCakeProb }) => {
  const [notVisiable, setIsvisiable] = useState(false);
  const handleInputChange = (event, variable) => {
    const { value } = event.target;
    setCakeItem(prevState => ({ 
      ...prevState, 
      [variable]: value
      }));
  };

  return (
    <Modal size='lg' show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> تعديل طلب كيك</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form dir="rtl">
          {/* Levels and Shape Selection */}
          <Card className="mb-3 bg-light">
                <Card.Body className="row">
                    <Form.Group className="mb-3 col-6">
                            <Form.Label>عدد الطبقات</Form.Label>
                            <Form.Control as="select" value={cakeItem.levels} onChange={(e) => handleInputChange(e, 'levels')} disabled={(isBranch && hours && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}>
                            <option value="0">اختر عدد الطبقات</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3 col-6" >
                            <Form.Label>الشكل</Form.Label>
                            <Form.Control as="select" value={cakeItem.shape} onChange={(e) => handleInputChange(e, 'shape')} disabled={ (isBranch && hours &&  !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}>
                            <option value="">اختر الشكل</option>
                            <option value="دائري">دائري</option>
                            <option value="مربع">مربع</option>
                            <option value="مستطيل">مستطيل</option>
                            </Form.Control>
                    </Form.Group>
                </Card.Body>
          </Card>

          {/* Dynamically generated cards for levels */}
          {[...Array(parseInt(cakeItem.levels || 0))].map((_, index) => (
            <Card key={index} className="mb-3 bg-light">
                <Card.Title className='d-flex justify-content-center m-3' >الدور {index + 1}</Card.Title>
                <Card.Body className="row">
                    {/* Dimensions based on shape */}
                    {cakeItem.shape === 'مستطيل' && (
                        <>
                          <Form.Group className="mb-3 col-6">
                              <Form.Label>{`الطول ${index + 1}`}</Form.Label>
                              <Form.Control type="text" value={cakeItem[`length${index + 1}`]} onChange={(e) => handleInputChange(e, `length${index + 1}`)} disabled={ (isBranch && hours &&  !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}/>
                          </Form.Group>
                        </>
                    )}
                    { (cakeItem.shape === 'مربع' || cakeItem.shape === 'دائري' || cakeItem.shape === 'مستطيل')&& (
                      <>
                        <Form.Group className="mb-3 col-6">
                            <Form.Label>{`العرض ${index + 1}`}</Form.Label>
                            <Form.Control type="text" value={cakeItem[`width${index + 1}`]} onChange={(e) => handleInputChange(e, `width${index + 1}`)} disabled={ (isBranch && hours && !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6">
                            <Form.Label>{`الارتفاع ${index + 1}`}</Form.Label>
                            <Form.Control type="text" value={cakeItem[`height${index + 1}`]} onChange={(e) => handleInputChange(e, `height${index + 1}`)} disabled={(isBranch && hours &&  !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}/>
                        </Form.Group>
                      </>
                    )}
                    {/* Stuffing and Phrase for each level */}
                    <Form.Group className="mb-3 col-6">
                        <Form.Label>{`الحشوة ${index + 1}`}</Form.Label>
                       { console.log(cakeItem[`stuff${index + 1}`])}
                        <Form.Control as="select" value={cakeItem[`stuff${index + 1}`]} onChange={(e) => handleInputChange(e, `stuff${index + 1}`)} disabled={(isBranch && hours &&  !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}>
                            <option value="">اختر الحشوة</option>
                            {stuffing &&
                                stuffing
                                    .filter((stuff) => {if(cakeItem.productID == stuff.productID)
                                    {
                                        return stuff
                                    }})
                                    .map((stuff, index) => (
                                        <option>{stuff.name}</option>
                                    ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 col-6">
                        <Form.Label>{`العبارة ${index + 1}`}</Form.Label>
                        <Form.Control type="text" value={cakeItem[`phrase${index + 1}`]} onChange={(e) => handleInputChange(e, `phrase${index + 1}`)} disabled={(isBranch && hours &&  !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}/>
                    </Form.Group>
                </Card.Body>
            </Card>
          ))}
          <Form.Group className="mb-3">
            <Form.Label>إضافة ملف</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileChange(e.target.files[0])} disabled={(isBranch && hours &&  !(status == "تم الانتاج" || status == "انتهى")) ? notVisiable : !notVisiable}/>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>إلغاء</Button>
           { (isBranch && hours) == 1 && <Button variant="primary" onClick={() => submitModifiedItem(cakeItem)}>حفظ</Button>}
      </Modal.Footer>
    </Modal>
  );
};

export default ModifyCakeModal;