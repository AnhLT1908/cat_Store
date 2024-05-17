import { Container, Nav, NavDropdown, NavLink, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href='#home'>Cat Store</Navbar.Brand>
        {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
        <Navbar.Collapse id="cat-navbar-nav">
          <Nav>
            <NavLink href='#home'>Home</NavLink>
            <NavLink href='#category'>Cat Breed</NavLink>
            <NavDropdown title='Show More'>
              <NavDropdown.Item href='#blog'>Blog</NavDropdown.Item>
              <NavDropdown.Item href='#gallery'>Gallery</NavDropdown.Item>
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item href='#about'>About us</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header