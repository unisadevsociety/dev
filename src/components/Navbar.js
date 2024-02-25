import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "../images/logo.png"; // import your logo image
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="mx-auto">
          <img
            src={logo}
            height="50" // Increase logo height
            className="d-inline-block align-top logo"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/maintenancePage">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/maintenancePage">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/maintenancePage">
              Opportunities
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/maintenancePage">
              Gallery
            </Nav.Link>
            <Nav.Link as={Link} to="/maintenancePage">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/maintenancePage">
              Resources
            </Nav.Link>
            <Link to="/affiliation">
              <Button variant="light">Join</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
