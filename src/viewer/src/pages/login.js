import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useUser } from '../component/UserContext';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LoginPage = () => {
  const { setRoles, authorize, setUserAuthenticateData } = useUser();
  const navigate = useNavigate();

  const [userSignInData, setUserSignInData] = useState({
    flag: 'sign in',
    email: '', // Initialize email state
    password: '' // Initialize password state
  });

  const handelData = (variable, event) => {
    setUserSignInData(prevState => ({
      ...prevState,
      [variable]: event.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userSignInData.email)) {
      alert("ادخل بيانات المستخدم بشكل صحيح");
      return;
    }

    // Ensure email ends with "@tawa.com"
    if (!userSignInData.email.endsWith("@tawa.com")) {
      alert("ادخل بيانات المستخدم بشكل صحيح");
      return;
    }

    try {
      const userResponse = await axios.post('http://localhost/Tawa%20Management%20App/src/controller/person.php', userSignInData);
      if (typeof userResponse.data !== typeof 'string') {
        authorize(true);
        setUserAuthenticateData(userResponse.data[1]);
        setRoles(userResponse.data[0]);
        const authStr = JSON.stringify(userResponse.data[1]);
        localStorage.setItem('auth', authStr);
        const rolesStr = JSON.stringify(userResponse.data[0]);
        localStorage.setItem('URL', rolesStr);
        navigate('/pages/Order'); // Redirect to a page after login
      } else {
        alert("Login failed!!");
        authorize(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required value={userSignInData.email} onChange={(e) => handelData('email', e)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required value={userSignInData.password} onChange={(e) => handelData('password', e)} />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">Log In</Button> {/* Changed onClick to type="submit" */}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
