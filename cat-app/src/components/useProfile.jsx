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
  Toast,
  ToastContainer,
  ProgressBar,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import maleAvatar from "../images/maleAvatar.jpg";
import femaleAvatar from "../images/femaleAvatar.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [userinfo, setUserInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const navigate = useNavigate();
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

          // Check if birthDate is already in yyyy-MM-dd format
          const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
          let formattedBirthDate;

          if (birthDateRegex.test(user.birthDate)) {
            formattedBirthDate = user.birthDate;
          } else {
            // Format the birthDate to yyyy-MM-dd
            formattedBirthDate = new Date(user.birthDate)
              .toISOString()
              .split("T")[0];
          }

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
    fetch(`http://localhost:9999/users/${userinfo.id}`, {
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
        localStorage.setItem(
          "user",
          JSON.stringify({ username: userinfo.username })
        );
        navigate("/");
        setToastVariant("success");
        setToastMessage("Profile updated successfully!");
        setShowToast(true);
      })
      .catch((error) => {
        console.error("Update error: ", error);
        setToastVariant("danger");
        setToastMessage("Profile update failed!");
        setShowToast(true);
      });
  };

  return (
    <Container>
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
            <Row className="d-flex justify-content-center">
              <Link to="/" className="d-flex justify-content-center">
                {userinfo.gender === "male" ? (
                  <Image
                    src={maleAvatar}
                    alt="Male Avatar"
                    roundedCircle
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : (
                  <Image
                    src={femaleAvatar}
                    alt="Female Avatar"
                    roundedCircle
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
              </Link>
            </Row>
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
              <br />
              <FormCheck
                inline
                label="Male"
                type="radio"
                name="gender"
                value="male"
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
                value="female"
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
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ position: "fixed", top: 0, right: 0 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg={toastVariant}
          delay={3000}
          autohide
          className="d-flex flex-column align-items-center"
        >
          <Toast.Body style={{ color: "white", fontWeight: "bold" }}>
            {toastMessage}
          </Toast.Body>
          <ProgressBar
            animated
            now={100}
            className="w-100 mt-2"
            variant={toastVariant === "success" ? "success" : "danger"}
            style={{ height: "5px" }}
          />
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Profile;
