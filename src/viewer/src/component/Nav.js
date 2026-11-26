import React from 'react';
import { Container, Col, Row, Nav } from 'react-bootstrap';
import { Link, Routes, Route, Switch } from 'react-router-dom';
import { useUser } from './UserContext';
import './Nav.css';




const CustomNavbar = () => {
  const { authorize, userRoles } = useUser();


  const Logout = (event) => {
    event.preventDefault();
    authorize(false)
    localStorage.clear();

  }

  return (
    <Container fluid>
  
        <div  id="sidebar-wrapper">
          <Nav className="col-md-12 d-none d-md-block bg-light sidebar text-end">
          {userRoles && userRoles.length > 0 && userRoles[0]['isAvailable'] != 0 && (
            <Nav.Item>
              <Nav.Link as={Link} to="/pages/Order">الطلبات</Nav.Link>
            </Nav.Item>
          )}
          { userRoles && userRoles.length > 0 && userRoles[5]['isAvailable']  != 0 && (
            <Nav.Item>
              <Nav.Link as={Link} to="../pages/branch">الفروع</Nav.Link>
            </Nav.Item>
          )}
          { userRoles && userRoles.length > 0 && userRoles[4]['isAvailable'] != 0 && (
            <Nav.Item>
                <Nav.Link as={Link} to="../pages/area">المناطق</Nav.Link>
            </Nav.Item>
          )}
          { userRoles && userRoles.length > 0 && userRoles[1]['isAvailable']  != 0 && (
              <Nav.Item>
                <Nav.Link as={Link} to="../pages/category">الفئات</Nav.Link>
              </Nav.Item>)}
          {userRoles && userRoles.length > 0 && userRoles[2]['isAvailable'] != 0 && (
            <Nav.Item>
                <Nav.Link as={Link} to="../pages/product">المنتجات</Nav.Link>
            </Nav.Item>)}
            { userRoles && userRoles.length > 0 && userRoles[6]['isAvailable']  != 0 && (
              <Nav.Item>
                <Nav.Link as={Link} to="../pages/stuff">الحشوات</Nav.Link>
              </Nav.Item>)}
            {/* Add more Nav.Item elements here as per your initial list */}
            
            
            { userRoles && userRoles.length > 0 && userRoles[3]['isAvailable']  != 0 && (
              <Nav.Item>
                <Nav.Link as={Link} to="../pages/users">المستخدمين</Nav.Link>
              </Nav.Item>)}
            <Nav.Item className='sticky-bottom'>
              <Nav.Link as={Link} to="#" onClick={(event) => Logout(event)}>تسجيل خروج</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
    </Container>
  );
};

export default CustomNavbar;
