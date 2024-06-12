import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import notlogin from "../images/notlogin.jpg";

const NotLogin = () => {
    return(
        <div>
            <img src={notlogin} style={{width: '100%'}}/>
        </div>
    )
}

export default NotLogin;