import { useEffect, useState } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Button
            variant="outline-success"
            onClick={toggleSidebar}
            className="me-2"
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src={logo}
              style={{ width: "100px", height: "100px" }}
            />{" "}
            Pet Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="cat-navbar-nav" />
          <Navbar.Collapse id="cat-navbar-nav">
            <Nav className="me-auto" navbarScroll>
              <Nav.Link className="nav-link" as={Link} to="/">
                Home
              </Nav.Link>
              {user ? (
                <Nav.Link className="nav-link" as={Link} to="/category">
                  Cat Category
                </Nav.Link>
              ) : (
                <Nav.Link className="nav-link" as={Link} to="/unauthenticated">
                  Cat Category
                </Nav.Link>
              )}
              <NavDropdown title="Show More">
                <NavDropdown.Item className="nav-link" as={Link} to="/blog">
                  Blog
                </NavDropdown.Item>
                <NavDropdown.Item className="nav-link" as={Link} to="/gallery">
                  Gallery
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="nav-link" as={Link} to="/about">
                  About us
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex searchForm">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 inputSearch"
              />
              <Button variant="outline-success">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
            {user ? (
              <NavDropdown title={user.username}>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="success" className="me-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Sidebar show={showSidebar} onHide={toggleSidebar} />
    </>
  );
}

export default Header;
