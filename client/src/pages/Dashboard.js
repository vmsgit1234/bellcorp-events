import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMyEvents();
  }, [user]);

  const fetchMyEvents = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/registrations/my',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const today = new Date();

      const upcomingEvents = res.data.filter(
        (event) => new Date(event.date) >= today
      );
      const pastEvents = res.data.filter(
        (event) => new Date(event.date) < today
      );

      setUpcoming(upcomingEvents);
      setPast(pastEvents);
    } catch (err) {
      console.log('Error fetching events');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Welcome, {user?.name}</h2>

      <h3 style={styles.sectionTitle}>Upcoming Events</h3>
      {upcoming.length === 0 ? (
        <p style={styles.empty}>No upcoming events</p>
      ) : (
        <div style={styles.grid}>
          {upcoming.map((event) => (
            <div key={event.id} style={styles.card}>
              <h4>{event.name}</h4>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Category:</strong> {event.category}</p>
            </div>
          ))}
        </div>
      )}

      <h3 style={styles.sectionTitle}>Past Events</h3>
      {past.length === 0 ? (
        <p style={styles.empty}>No past events</p>
      ) : (
        <div style={styles.grid}>
          {past.map((event) => (
            <div key={event.id} style={styles.card}>
              <h4>{event.name}</h4>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Category:</strong> {event.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '30px'
  },
  sectionTitle: {
    marginTop: '30px',
    marginBottom: '15px',
    color: '#2c3e50',
    borderBottom: '2px solid #2c3e50',
    paddingBottom: '5px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    lineHeight: '1.8'
  },
  empty: {
    color: '#999',
    fontStyle: 'italic'
  }
};

export default Dashboard;