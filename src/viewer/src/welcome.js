import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function WelcomeSection() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>مرحباً بكم في شركة توا</h1>
          <p>نحن سعداء بانضمامكم إلى فريقنا ونتطلع إلى مسيرة مليئة بالنجاحات المشتركة.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default WelcomeSection;
