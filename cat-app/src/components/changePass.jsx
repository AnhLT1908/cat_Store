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
  ProgressBar,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./userContext";

const ChangePass = () => {
  const [userpassword, setUserPassword] = useState({
    password: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const navigate = useNavigate();
  const { username } = useParams();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:9999/users?username=${username}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error (`HTTP error! Status: ${response.status}`)
        }
        return response.json();
    })
    .then((data) => {
        console.log("Password data:", data);
        if(data.length > 0){
            const user = data[0];
            setUserPassword(user);
        }
    })
    .catch((error) => console.error("Fetch error: ", error))
  }, [])

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
            style={{
              width: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <FormGroup className="mb-3" controlId="formCurrentPassword">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Current Password
              </FormLabel>
              <FormControl
                type="password"
                placeholder="Enter Current Password"
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formNewPassword">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                New Password
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter New Password"
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formConfirmPassword">
              <FormLabel className="me-3" style={{ fontWeight: "bold" }}>
                Confirm Password
              </FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Confirm Password"
              />
            </FormGroup>
            <Row className="mt-3">
              <Col lg={12}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Change Password
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

export default ChangePass;
