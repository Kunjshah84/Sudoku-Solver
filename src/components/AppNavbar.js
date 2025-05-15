import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { Navbar , Nav, Container } from "react-bootstrap";

export default function AppNavbar() {
  return (
    <div>
        <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🧩 Sudoku Solver
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/solver">
              Solver
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

