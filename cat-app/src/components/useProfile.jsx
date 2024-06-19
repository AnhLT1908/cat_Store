import React, { useContext, useEffect, useState } from "react";
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
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import maleAvatar from "../images/maleAvatar.jpg";
import femaleAvatar from "../images/femaleAvatar.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./userContext";

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
  const { username } = useParams();
  const { user, setUser } = useContext(UserContext);

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
          const formattedBirthDate = /^\d{4}-\d{2}-\d{2}$/.test(user.birthDate)
            ? user.birthDate
            : new Date(user.birthDate).toISOString().split("T")[0];
          const updatedUser = { ...user, birthDate: formattedBirthDate };
          setUserInfo(updatedUser);
          setUser(updatedUser);
          //localStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          console.error("No user found");
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [username, setUser]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9999/users/${userinfo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userinfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setToastVariant("success");
        setToastMessage("Profile updated successfully!");
        setShowToast(true);
      })
      .catch((error) => {
        console.error("Update error:", error);
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
                <Image
                  src={userinfo.gender === "male" ? maleAvatar : femaleAvatar}
                  alt="Avatar"
                  roundedCircle
                  style={{ width: "100px", height: "100px" }}
                />
              </Link>
            </Row>
            {[
              { label: "First Name", value: "firstName", type: "text" },
              { label: "Last Name", value: "lastName", type: "text" },
              { label: "Username", value: "username", type: "text" },
              { label: "Email", value: "email", type: "email" },
              { label: "Phone", value: "phone", type: "tel" },
              { label: "Birth Date", value: "birthDate", type: "date" },
            ].map((field) => (
              <FormGroup className="mb-3" controlId={`form${field.value}`} key={field.value}>
                <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                  {field.label}
                </FormLabel>
                <FormControl
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  value={userinfo[field.value]}
                  onChange={(e) =>
                    setUserInfo({ ...userinfo, [field.value]: e.target.value })
                  }
                />
              </FormGroup>
            ))}
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
                onChange={(e) => setUserInfo({ ...userinfo, gender: e.target.value })}
              />
              <FormCheck
                inline
                label="Female"
                type="radio"
                name="gender"
                value="female"
                checked={userinfo.gender === "female"}
                onChange={(e) => setUserInfo({ ...userinfo, gender: e.target.value })}
              />
            </FormGroup>
            <Row className="mt-3">
              <Col lg={12}>
                <Button variant="success" type="submit" style={{ width: "100%" }}>
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
        style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Profile;
