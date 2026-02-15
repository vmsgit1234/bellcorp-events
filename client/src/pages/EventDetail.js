import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function EventDetail() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/events/${id}`
      );
      setEvent(res.data);
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      setMessage('Please login first');
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/events/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleCancel = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/events/${id}/register`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  if (!event) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>{event.name}</h2>
      <div style={styles.card}>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Capacity:</strong> {event.capacity}</p>
        <p><strong>Description:</strong> {event.description}</p>
      </div>

      {message && (
        <p style={styles.message}>{message}</p>
      )}

      {user ? (
        <div style={styles.buttons}>
          <button
            onClick={handleRegister}
            style={styles.registerBtn}
          >
            Register for Event
          </button>
          <button
            onClick={handleCancel}
            style={styles.cancelBtn}
          >
            Cancel Registration
          </button>
        </div>
      ) : (
        <p style={styles.loginMsg}>
          Please login to register for this event
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '30px'
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginTop: '20px',
    lineHeight: '2'
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px'
  },
  registerBtn: {
    padding: '12px 25px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  cancelBtn: {
    padding: '12px 25px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  message: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#dff0d8',
    borderRadius: '5px',
    color: '#3c763d'
  },
  loginMsg: {
    marginTop: '20px',
    color: '#e74c3c'
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px'
  }
};

export default EventDetail;