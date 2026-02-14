const express = require('express');
const router = express.Router();
const db = require('../db');
const protect = require('../middleware/auth');

// GET ALL EVENTS (with search and filter)
router.get('/', (req, res) => {
  const { search, category, location } = req.query;

  let query = 'SELECT * FROM events WHERE 1=1';
  let params = [];

  if (search) {
    query += ' AND name LIKE ?';
    params.push('%' + search + '%');
  }

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (location) {
    query += ' AND location LIKE ?';
    params.push('%' + location + '%');
  }

  db.all(query, params, (err, events) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching events' });
    }
    res.json(events);
  });
});

// GET MY REGISTERED EVENTS
router.get('/my', protect, (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT events.* FROM events
     JOIN registrations ON events.id = registrations.event_id
     WHERE registrations.user_id = ?`,
    [userId],
    (err, events) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching events' });
      }
      res.json(events);
    }
  );
});

// GET SINGLE EVENT
router.get('/:id', (req, res) => {
  db.get(
    'SELECT * FROM events WHERE id = ?',
    [req.params.id],
    (err, event) => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    }
  );
});

// REGISTER FOR EVENT
router.post('/:id/register', protect, (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  // Check if event exists
  db.get(
    'SELECT * FROM events WHERE id = ?',
    [eventId],
    (err, event) => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if already registered
      db.get(
        'SELECT * FROM registrations WHERE user_id = ? AND event_id = ?',
        [userId, eventId],
        (err, existing) => {
          if (existing) {
            return res.status(400).json({
              message: 'Already registered for this event'
            });
          }

          // Check capacity
          db.get(
            'SELECT COUNT(*) as count FROM registrations WHERE event_id = ?',
            [eventId],
            (err, result) => {
              if (result.count >= event.capacity) {
                return res.status(400).json({
                  message: 'Event is full'
                });
              }

              // Register user
              db.run(
                'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)',
                [userId, eventId],
                function (err) {
                  if (err) {
                    return res.status(500).json({
                      message: 'Error registering'
                    });
                  }
                  res.json({ message: 'Registered successfully' });
                }
              );
            }
          );
        }
      );
    }
  );
});

// CANCEL REGISTRATION
router.delete('/:id/register', protect, (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  db.run(
    'DELETE FROM registrations WHERE user_id = ? AND event_id = ?',
    [userId, eventId],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error cancelling' });
      }
      res.json({ message: 'Registration cancelled' });
    }
  );
});

module.exports = router;