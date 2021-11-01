
import {Navbar, Nav, Button, Dropdown} from 'react-bootstrap';
import {IoMdPower} from 'react-icons/io';
import {GiCampCookingPot} from 'react-icons/gi'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../controller/loginstate';
import ToggleTheme from "./ToggleTheme"

const Header = () => {

     const { account,setAccount } = useContext(LoginContext);
    
     const history = useHistory();
 
     const clickHandler = () => {
         history.push('/');
         setAccount('');
     }
     return (
          <Navbar style={{height: 50, background: 'black' }} sticky="top">
            <Link to='/' className="mx-auto">
               <Navbar.Brand>
                    <GiCampCookingPot className="mb-2" style={{color: '#5cb85c'}}/>
                    <span style={{color:'#ffffff', fontWeight: 600}}>CookIt!</span>
                    <span style={{color:'#5cb85c', fontWeight: 600}}>Easily</span>
               </Navbar.Brand>
            </Link>
            <ToggleTheme/>
            {
               account === '' ?
               // login pachinu
               <Nav className="ml-auto mx-auto">
                    <Link to='/Signup'>
                         <Nav.Item  className="mr-4">
                              <Button variant="outline-success">
                                   AdminSignup
                              </Button>
                         </Nav.Item>
                    </Link>
                    <Link to='/Login'>
                         <Nav.Item style = {{color: 'white'}}>
                              <Button variant="success">
                                   AdminLogin
                              </Button>
                         </Nav.Item>
                    </Link>
               </Nav>
               :
               // login pelanu default
               <Nav className="ml-auto mx-auto">
                   <Link to='/add'>
                       <Nav.Item  className="mr-4">
                           <Button variant="outline-success">
                               Add Recipe
                           </Button>
                       </Nav.Item>
                   </Link>
                   <Dropdown>
                       <Dropdown.Toggle variant="success" id="dropdown-basic">
                           {account}
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                           <Dropdown.Item onClick={clickHandler}>
                               <IoMdPower style={{marginRight: 10}}/>
                               Logout
                           </Dropdown.Item>
                       </Dropdown.Menu>
                   </Dropdown>
               </Nav> 
           }
        </Navbar>
     )
}

export default Header;