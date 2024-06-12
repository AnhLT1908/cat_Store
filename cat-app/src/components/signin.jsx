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
  Image,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import signInImg from "../images/signin.jpg";
import logo from "../images/logo.png";
import apple from "../images/Apple_logo.png";
import facebook from "../images/Facebook_icon.png";
import google from "../images/google-icon.png";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.token) {
          localStorage.setItem(
            "user",
            JSON.stringify({ username: username, token: data.token })
          );
          navigate("/");
        } else {
          setErrMessage("Invalid email or password. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMessage("An error occurred. Please try again later.");
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
            onSubmit={handleLogin}
          >
            <Row>
              <Link to="/" className="d-flex justify-content-center">
                <Image src={logo} style={{ width: "20%" }} />
              </Link>
            </Row>
            <FormGroup className="mb-3" controlId="formUserName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                User Name:
              </FormLabel>
              <FormControl type="text" placeholder="Enter User Name" onChange={(e) => {setUsername(e.target.value)}}/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formPassword">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Password:
              </FormLabel>
              <FormControl type="password" placeholder="Enter Password" onChange={(e) => {setPassword(e.target.value)}}/>
            </FormGroup>
            <FormGroup
              className="mb-3 d-flex justify-content-between"
              controlId="formRemember"
            >
              <FormCheck
                type="checkbox"
                label="Remember me"
                style={{ fontWeight: "normal" }}
              />
              <Form.Text>
                <Link to="/category">Forgot Password</Link>
              </Form.Text>
            </FormGroup>
            <Row className="d-flex">
              <Col lg={4}>
                <a href="https://appleid.apple.com/sign-in">
                  <Button
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "none",
                      height: "45px",
                    }}
                  >
                    <Image src={apple} style={{ width: "20%" }} />
                  </Button>
                </a>
              </Col>
              <Col lg={4}>
                <a href="https://www.facebook.com/login/">
                  <Button
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#0266ff",
                      border: "none",
                      height: "45px",
                    }}
                  >
                    <Image src={facebook} style={{ width: "30%" }} />
                  </Button>
                </a>
              </Col>
              <Col lg={4}>
                <a href="https://accounts.google.com/">
                  <Button
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "none",
                      height: "45px",
                    }}
                  >
                    <Image src={google} style={{ width: "30%" }} />
                  </Button>
                </a>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12}>
                <Button type="submit" variant="info" style={{ width: "100%" }}>
                  Sign In
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12}>
                <Link to="/signup">
                  <Button variant="success" style={{ width: "100%" }}>
                    Sign Up
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
