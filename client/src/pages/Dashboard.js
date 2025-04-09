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