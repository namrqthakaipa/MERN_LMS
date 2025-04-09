import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, enrolled, onEnroll }) => {
  return (
    <Card className="course-card h-100">
      <Card.Img 
        variant="top" 
        src={course.thumbnail ? `/uploads/${course.thumbnail}` : `https://via.placeholder.com/300x150?text=${course.title}`} 
        height="150"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{course.title}</Card.Title>
        <Card.Text className="text-muted small">
          {course.duration} | Level: {course.level}
        </Card.Text>
        <Card.Text>
          {course.description.length > 100 
            ? `${course.description.substring(0, 100)}...` 
            : course.description}
        </Card.Text>
        <div className="mt-auto">
          {enrolled ? (
            <Link to={`/courses/${course._id}`} className="btn btn-primary w-100">
              View Course
            </Link>
          ) : (
            <Button 
              variant="outline-primary" 
              className="w-100"
              onClick={() => onEnroll(course._id)}
            >
              Enroll Now
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;