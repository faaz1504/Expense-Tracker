import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './Navbar.css'


function NavBar({user,setUser}){

    const handleLogout = () =>{

        setUser(null);
    };

    return(

        <div>

            <Navbar expand="lg"  className="navstyle p-3">
      <Container>
        <Navbar.Brand as={Link} to='/' className='brand'>
            EXpensoo</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto nav-links">

            {!user ?(
                <>

            <Nav.Link as={Link} to='/'>
                Home
            </Nav.Link>

            <Nav.Link as={Link} to='/sign-in'>
            Sign-In
            </Nav.Link>

            <Nav.Link as={Link} to='/sign-up'>
            Sign-Up
            </Nav.Link>
            
            </>

            ):(
                <>

                {/* <Nav.Link as={Link} to='/'>
                Home
            </Nav.Link> */}

                 <Nav.Link as={Link} to='/user-dashboard'>
            Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to='/'>
           Transactions
            </Nav.Link>

            <Nav.Link as={Link} to='/' onClick={handleLogout}>
            Logout
            </Nav.Link>
           
            </>
            )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        </div>


    )

}
export default NavBar;