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
import { Link, useParams } from "react-router-dom";
import logo from "../images/logo.png";

const Profile = () => {
  const [userinfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
  });
  const { username } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9999/users?username=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const user = data[0];
          console.log("User info: ", user);
  
          // Format the birthDate to yyyy-MM-dd
          const formattedBirthDate = new Date(user.birthDate)
            .toISOString()
            .split("T")[0];
  
          setUserInfo({ ...user, birthDate: formattedBirthDate });
        } else {
          console.error("No user found");
        }
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  }, [username]);
  

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9999/users?username=${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: userinfo.firstName,
        lastName: userinfo.lastName,
        username: userinfo.username,
        email: userinfo.email,
        phone: userinfo.phone,
        birthDate: userinfo.birthDate,
        gender: userinfo.gender,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((user) => {
        console.log("Updated user: ", user);
      })
      .catch((error) => {
        console.error("Update error: ", error);
      });
  };
  

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
            onSubmit={handleUpdate}
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
                value={userinfo.firstName}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, firstName: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formLastName">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Last Name
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Last Name"
                value={userinfo.lastName}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, lastName: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formUsername">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Username
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Username"
                value={userinfo.username}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, username: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formEmail">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Email
              </FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={userinfo.email}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, email: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formPhone">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Phone
              </FormLabel>
              <FormControl
                type="tel"
                placeholder="Enter Phone"
                value={userinfo.phone}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, phone: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBirthDate">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Birth Date
              </FormLabel>
              <FormControl
                type="date"
                value={userinfo.birthDate}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, birthDate: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formGender">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Gender
              </FormLabel>
              <FormCheck
                inline
                label="Male"
                type="radio"
                name="gender"
                defaultValue="male"
                checked={userinfo.gender === "male"}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, gender: e.target.value });
                }}
              />
              <FormCheck
                inline
                label="Female"
                type="radio"
                name="gender"
                defaultValue="female"
                checked={userinfo.gender === "female"}
                onChange={(e) => {
                  setUserInfo({ ...userinfo, gender: e.target.value });
                }}
              />
            </FormGroup>
            <Row className="mt-3">
              <Col lg={12}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Update Profile
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
