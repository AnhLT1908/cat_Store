import { useState } from 'react';
import { Container, Nav, NavDropdown, NavLink, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faDeleteLeft, faClose } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Button variant="outline-success" onClick={toggleSidebar} className="me-2">
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <Navbar.Brand href="#home">
            <img alt="" src={logo} style={{ width: '100px', height: '100px' }} />
            {' '}
            Pet Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="cat-navbar-nav" />
          <Navbar.Collapse id="cat-navbar-nav">
            <Nav className="me-auto" navbarScroll>
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#category">Cat Breed</NavLink>
              <NavDropdown title="Show More">
                <NavDropdown.Item href="#blog">Blog</NavDropdown.Item>
                <NavDropdown.Item href="#gallery">Gallery</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#about">About us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex searchForm">
              <FormControl type="search" placeholder="Search" className="me-2 inputSearch" />
              <Button variant="outline-success"><FontAwesomeIcon icon={faSearch} /></Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Sidebar show={showSidebar} onHide={toggleSidebar} />
    </>
  );
}

function Sidebar({ show, onHide }) {
  return (
    <div className={`sidebar ${show ? 'show' : ''}`}>
      <Button variant="outline-success" onClick={onHide} className="close-btn">
      <FontAwesomeIcon icon={faClose} />
      </Button>
      <Nav className="flex-column p-3">
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#category">Cat Breed</NavLink>
        <NavLink href="#blog">Blog</NavLink>
        <NavLink href="#gallery">Gallery</NavLink>
        <NavLink href="#about">About us</NavLink>
      </Nav>
    </div>
  );
}

export default Header;
