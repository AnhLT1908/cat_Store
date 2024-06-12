import React from "react";
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
import apple from "../images/Apple_logo.png";
import facebook from "../images/Facebook_icon.png";
import google from "../images/google-icon.png";

const SignUp = () => {
  return (
    <Container fluid>
      <Row>
        <Col lg={6} style={{ padding: "0px" }}>
          <Image
            src={signInImg}
            fluid
            style={{ height: "100vh", width: "100%" }}
          />
        </Col>
        <Col
          lg={6}
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
            <Row>
              <Link to="/" className="d-flex justify-content-center">
                <Image src={logo} style={{ width: "20%" }} />
              </Link>
            </Row>
            <FormGroup className="mb-3" controlId="formFirstName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                First Name:
              </FormLabel>
              <FormControl type="text" placeholder="Enter First Name" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Last Name:
              </FormLabel>
              <FormControl type="text" placeholder="Enter Last Name" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                User Name:
              </FormLabel>
              <FormControl type="text" placeholder="Enter User Name" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Email:
              </FormLabel>
              <FormControl type="text" placeholder="Enter Email" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Password:
              </FormLabel>
              <FormControl type="text" placeholder="Enter Password" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Re-password:
              </FormLabel>
              <FormControl type="text" placeholder="Enter Repassword" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Phone:
              </FormLabel>
              <FormControl type="text" placeholder="Enter Phone" />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBirthDate">
              <Form.Label className="me-3" style={{ fontWeight: "bold" }}>
                Birth Date:
              </Form.Label>
              <Form.Control type="date" />
            </FormGroup>
            <FormGroup className="mb-3 d-flex align-content-center" controlId="formLastName">
              <FormText className="mr-3" style={{ fontWeight: "bold", marginTop: '0px' }}>Gender:</FormText>
              <FormCheck
                className="mr-3"
                type="radio"
                label="Male"
                name="gender"
              />
              <FormCheck type="radio" label="Female" name="gender" />
            </FormGroup>
            <Row className="mt-3">
              <Col lg={12}>
                <Button variant="success" style={{ width: "100%" }}>
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

export default SignUp;
