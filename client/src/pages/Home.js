import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaChartLine } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="banner">
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <h1 className="display-4 fw-bold">Learning Management System</h1>
              <p className="lead">A comprehensive platform for students to manage courses, track performance, and enhance their learning experience.</p>
              {!user && (
                <div className="mt-4">
                  <Link to="/register" className="btn btn-light btn-lg me-3">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-outline-light btn-lg">
                    Login
                  </Link>
                </div>
              )}
              {user && (
                <div className="mt-4">
                  <Link to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} className="btn btn-light btn-lg">
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </Col>
            <Col md={5} className="d-none d-md-block">
              <img 
                src="https://via.placeholder.com/500x350?text=LMS+Learning" 
                alt="Education" 
                className="img-fluid rounded shadow" 
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="text-center mb-5">Features of Our LMS</h2>
        <Row>
          <Col md={4} className="mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <FaGraduationCap />
              </div>
              <h4>Course Management</h4>
              <p>Browse and enroll in courses that match your interests and career goals.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <FaBook />
              </div>
              <h4>Profile Management</h4>
              <p>Manage your personal information, upload certificates, and track your progress.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h4>SAT Score Tracking</h4>
              <p>View and analyze your SAT scores to monitor your performance.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;