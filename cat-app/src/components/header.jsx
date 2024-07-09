import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { UserContext } from "./userContext";
import logo from "../images/logo.png";

function Header() {
  // const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  console.log("User", user);

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleChangePassword = (username) => {
    navigate(`/changeaccountpassword/${username}`);
  };

  const handleProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{backgroundColor: '#fbeee0'}}>
        <Container fluid>
          <Row className="d-flex align-items-center" style={{ width: "100%" }}>
            <Col lg={1}>
              <Row className="d-flex justify-content-center">
                <Navbar.Brand as={Link} to="/">
                  <img
                    alt="Logo"
                    src={logo}
                    style={{ width: "100px", height: "100px" }}
                  />{" "}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="cat-navbar-nav" />
              </Row>
            </Col>
            <Col lg={11}>
              <Navbar.Collapse id="cat-navbar-nav">
                <Row
                  className="d-flex align-items-center"
                  style={{ width: "100%" }}
                >
                  <Col lg={3}>
                    <Nav.Link
                      className="me-auto d-flex"
                      navbarScroll
                      style={{ fontWeight: "bold", textDecoration: 'none' }}
                    >
                      <Nav.Link as={Link} to="/">
                        Home
                      </Nav.Link>
                      {user ? (
                        <Nav.Link as={Link} to="/category">
                          Category
                        </Nav.Link>
                      ) : (
                        <Nav.Link as={Link} to="/unauthenticated">
                          Category
                        </Nav.Link>
                      )}
                      <NavDropdown title="Show More" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/blog">
                          Blog
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/gallery">
                          Gallery
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/about">
                          About us
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav.Link>
                  </Col>
                  <Col lg={7}>
                  </Col>
                  <Col lg={2} className="d-flex justify-content-end">
                    {user ? (
                      <NavDropdown
                        title={user.username}
                        id="user-nav-dropdown"
                        style={{ width: "50%" }}
                        className="d-flex justify-content-end"
                      >
                        <NavDropdown.Item
                          onClick={() => handleProfile(user.username)}
                        >
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => handleChangePassword(user.username)}
                        >
                          Change Password
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <>
                        <Link to="/signin" className="mr-2">
                          <Button variant="success" className="me-2">
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/signup">
                          <Button>Sign Up</Button>
                        </Link>
                      </>
                    )}
                  </Col>
                </Row>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
      {/* <Sidebar show={showSidebar} onHide={toggleSidebar} /> */}
    </>
  );
}

export default Header;
