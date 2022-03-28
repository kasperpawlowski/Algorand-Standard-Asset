import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function Navigation() {
    return (
        <Navbar expand="lg">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className="navbar-custom" as={Link} to="/">Create</Nav.Link>
                    <Nav.Link className="navbar-custom" as={Link} to="/explore">Explore</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}