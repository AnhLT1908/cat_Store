import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Image,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import signInImg from "../images/signin.jpg";
import logo from "../images/logo.png";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [userinfo, setUserInfo] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9999/users?username=${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("User info: ", data);
        setUserInfo(data);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col
          lg={12}
          style={{
            background:
              "linear-gradient(220deg,#dff4f7, #8dafb9, #456370, #182329)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
          className="d-flex flex-column align-items-center"
        >
          <Form
            style={{
              width: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Link to="/" className="d-flex justify-content-center">
              <Image src={logo} style={{ width: "10%" }} />
            </Link>
            <FormGroup className="mb-3" controlId="formFirstName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                First Name
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter First Name"
                value={userinfo[0].firstName}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Last Name:
              </FormLabel>
              <FormControl type="text" placeholder="Enter Last Name" value={userinfo[0].lastName}/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formUsername">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Username:
              </FormLabel>
              <FormControl type="text" placeholder="Enter Username" value={userinfo[0].username}/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formEmail">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Email:
              </FormLabel>
              <FormControl type="email" placeholder="Enter Email" value={userinfo[0].email}/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formPhone">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Phone:
              </FormLabel>
              <FormControl type="tel" placeholder="Enter Phone" value={userinfo[0].phone}/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBirthDate">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Birth Date:
              </FormLabel>
              <FormControl type="date" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formGender">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Gender:
              </FormLabel>
              <FormCheck
                inline
                label="Male"
                type="radio"
                name="gender"
                value="male"
              />
              <FormCheck
                inline
                label="Female"
                type="radio"
                name="gender"
                value="female"
              />
            </FormGroup>
            <Row className="mt-3">
              <Col lg={12}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Create a new account
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
