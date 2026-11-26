import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNav from './component/Nav';
import NewOrderPage from './pages/Order';
import OrderDetails from './pages/OrderDetails';
import ProductDetails from './pages/productDetails';
import Users from './pages/users';
import Area from './pages/area';
import Branch from './pages/Branch';
import Category from './pages/category';
import Product from './pages/product';
import Stuff from './pages/stuff';
import LoginPage from './pages/login';
import UserDetails from './pages/userDetails';
import WelcomeSection from './welcome'
import ProtectedRoute from './component/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { UserProvider } from './component/UserContext';

const Layout = () => {
  const location = useLocation();
  return (
    <Container>
      <Row>
        
        <Col xs={11} className="content-column">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<WelcomeSection/>}/>
              <Route path="/pages/Order" element={<NewOrderPage />} />
              <Route path="/pages/insertItems" element={<OrderDetails />} />
              <Route path="/pages/userDetails" element={<UserDetails />} />
              <Route path="/pages/users" element={<Users />} />
              <Route path="/pages/area" element={<Area />} />
              <Route path="/pages/branch" element={<Branch />} />
              <Route path="/pages/category" element={<Category />} />
              <Route path="/pages/product" element={<Product />} />
              <Route path="/pages/productDetails" element={<ProductDetails />} />
              <Route path="/pages/stuff" element={<Stuff />} />
              {/* Additional protected routes here */}
            </Route>
          </Routes>
        </Col>
        <Col xs={1} className="sidebar-column">
          {/* Conditionally render CustomNav based on the path */}
          {location.pathname !== "/pages/login" && <CustomNav/>}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Routes>
                <Route path="/pages/login" element={<LoginPage />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Layout />
      </Router>
    </UserProvider>

  );
};
export default App;
