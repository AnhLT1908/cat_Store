import React from "react";
import { Button, Nav, NavLink, NavbarBrand } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";

function Sidebar({ show, onHide }) {
  return (
    <div className={`sidebar ${show ? "show" : ""}`}>
      <NavbarBrand><img src={logo} style={{width: '100px', height: '100px'}} className="close-logo"/></NavbarBrand>
      <Button variant="outline-success" onClick={onHide} className="close-btn">
        <FontAwesomeIcon icon={faClose} />
      </Button>
      <Nav className="flex-column p-3">
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#category">Cat Breed</NavLink>
        <NavLink href="#blog">Blog</NavLink>
        <NavLink href="#gallery">Gallery</NavLink>
        <NavLink href="#about">About us</NavLink>
      </Nav>
    </div>
  );
}
export default Sidebar;
