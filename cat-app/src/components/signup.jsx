import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    fetch("http://localhost:9999/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        phone: phone,
        birthDate: birthdate,
        gender: gender,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success, e.g., redirect to another page
        navigate("/"); // Example redirect
      })
      .catch((err) => {
        console.error(err);
        // Handle error
      });
  };

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
            onSubmit={handleSignup}
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
              <FormControl
                type="text"
                placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Last Name:
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formUsername">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Username:
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formEmail">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Email:
              </FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formPassword">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Password:
              </FormLabel>
              <FormControl
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formPasswordConfirmation">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Confirm Password:
              </FormLabel>
              <FormControl
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formPhone">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Phone:
              </FormLabel>
              <FormControl
                type="tel"
                placeholder="Enter Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBirthDate">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Birth Date:
              </FormLabel>
              <FormControl
                type="date"
                onChange={(e) => setBirthdate(e.target.value)}
              />
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
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              <FormCheck
                inline
                label="Female"
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
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

export default SignUp;
