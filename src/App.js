import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Register from './register'
import Deposit from './deposit';
import Cashback from './cashback';
import Alldata from './alldata';
import UserContext from './context';

function App() {
  return (
    <>
      <div className='red'>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">YOURS BANK</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">HOME</Nav.Link>
              <Nav.Link href="#register">REGISTER</Nav.Link>
              <Nav.Link href="#deposit">DEPOSIT</Nav.Link>
              <Nav.Link href="#cashback">CASHBACK</Nav.Link>
              <Nav.Link href="#alldata">ALL-DATA</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>

      <HashRouter>
        <UserContext.Provider value={{
          "users": [
            {
              name: "udaya",
              email: "udayabca2021@gmail.com",
              password: "udaya2003",
              amount: 1000
            }]
        }}>
          <Routes>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/deposit' element={<Deposit></Deposit>}></Route>
            <Route path='/cashback' element={<Cashback></Cashback>}></Route>
            <Route path='/alldata' element={<Alldata></Alldata>}></Route>
          </Routes>
        </UserContext.Provider>
      </HashRouter>


    </>
  );
}

export default App;