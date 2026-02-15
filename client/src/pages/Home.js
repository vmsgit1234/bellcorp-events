import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to Bellcorp Events</h1>
      <p>Discover and register for amazing events near you</p>
      <Link to='/events' style={styles.button}>
        Browse Events
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px'
  },
  button: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '12px 30px',
    backgroundColor: '#2c3e50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px'
  }
};

export default Home;