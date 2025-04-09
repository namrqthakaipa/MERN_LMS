import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBook, FaUser, FaChartLine } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    exams: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesRes, scoresRes] = await Promise.all([
          axios.get('/api/courses/enrolled'),
          axios.get('/api/exams/scores')
        ]);
        
        setStats({
          enrolledCourses: coursesRes.data.count,
          exams: scoresRes.data.count
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="welcome-panel">
        <Row>
          <Col md={8}>
            <h2>Welcome, {user?.profile?.name || user?.studentId}!</h2>
            <p className="lead">Here's an overview of your learning journey.</p>
          </Col>
          <Col md={4} className="text-md-end">
            <Link to="/profile" className="btn btn-outline-primary">
              <FaUser className="me-2" /> View Profile
            </Link>
          </Col>
        </Row>
      </div>

      <Row className="mb-4">
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaBook className="feature-icon mb-3" />
              <h3>{stats.enrolledCourses}</h3>
              <p className="text-muted">Enrolled Courses</p>
              <Link to="/courses" className="btn btn-outline-primary btn-sm">
                View All Courses
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaChartLine className="feature-icon mb-3" />
              <h3>{stats.exams}</h3>
              <p className="text-muted">Exam Results</p>
              <Link to="/scores" className="btn btn-outline-primary btn-sm">
                View All Scores
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm bg-primary text-white">
            <Card.Body className="text-center">
              <FaUser className="mb-3" style={{ fontSize: '2.5rem' }} />
              <h3>Student Profile</h3>
              <p>Update your profile information</p>
              <Link to="/profile" className="btn btn-light btn-sm">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              {stats.enrolledCourses > 0 ? (
                <p>You have {stats.enrolledCourses} enrolled courses. Continue your learning journey!</p>
              ) : (
                <div className="text-center py-4">
                  <p className="mb-3">You haven't enrolled in any courses yet.</p>
                  <Link to="/courses" className="btn btn-primary">
                    Browse Available Courses
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;