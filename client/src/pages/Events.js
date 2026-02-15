import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchEvents();
  }, [search, category, location]);

  const fetchEvents = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/events',
      { params: { search, category, location } }
    );
    setEvents(res.data);
  };

  return (
    <div style={styles.container}>
      <h2>Browse Events</h2>

      <div style={styles.filters}>
        <input
          type='text'
          placeholder='Search events...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value=''>All Categories</option>
          <option value='Technology'>Technology</option>
          <option value='Business'>Business</option>
          <option value='Design'>Design</option>
          <option value='Marketing'>Marketing</option>
          <option value='Arts'>Arts</option>
        </select>
        <input
          type='text'
          placeholder='Filter by location...'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>
            <h3>{event.name}</h3>
            <p><strong>Organizer:</strong> {event.organizer}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Capacity:</strong> {event.capacity}</p>
            <Link
              to={`/event/${event.id}`}
              style={styles.button}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px'
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    flex: '1'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    lineHeight: '1.8'
  },
  button: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '8px 20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px'
  }
};

export default Events;