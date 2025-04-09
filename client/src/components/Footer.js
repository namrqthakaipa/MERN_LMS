import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>LMS Application</h5>
            <p className="small">A simple learning management system built with MERN stack.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="small">© {new Date().getFullYear()} LMS App. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;