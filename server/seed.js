const db = require('./db');

const events = [
  {
    name: 'React Workshop',
    organizer: 'Tech India',
    location: 'Bangalore',
    date: '2025-04-10',
    description: 'Learn React from scratch',
    capacity: 50,
    category: 'Technology'
  },
  {
    name: 'Node.js Bootcamp',
    organizer: 'Code Academy',
    location: 'Hyderabad',
    date: '2025-04-15',
    description: 'Master Node.js and Express',
    capacity: 40,
    category: 'Technology'
  },
  {
    name: 'Startup Summit',
    organizer: 'Startup India',
    location: 'Mumbai',
    date: '2025-05-01',
    description: 'Connect with top startup founders',
    capacity: 200,
    category: 'Business'
  },
  {
    name: 'UI UX Design Workshop',
    organizer: 'Design Hub',
    location: 'Delhi',
    date: '2025-05-10',
    description: 'Learn modern UI UX design',
    capacity: 30,
    category: 'Design'
  },
  {
    name: 'Digital Marketing Masterclass',
    organizer: 'Marketing Pro',
    location: 'Chennai',
    date: '2025-05-20',
    description: 'Grow your business with digital marketing',
    capacity: 100,
    category: 'Marketing'
  },
  {
    name: 'AI and Machine Learning Summit',
    organizer: 'AI India',
    location: 'Bangalore',
    date: '2025-06-01',
    description: 'Explore the future of AI',
    capacity: 150,
    category: 'Technology'
  },
  {
    name: 'Full Stack Hackathon',
    organizer: 'Bellcorp Studio',
    location: 'Hyderabad',
    date: '2025-06-15',
    description: 'Build projects and win prizes',
    capacity: 100,
    category: 'Technology'
  },
  {
    name: 'Business Leadership Forum',
    organizer: 'Leaders India',
    location: 'Mumbai',
    date: '2025-06-20',
    description: 'Learn from top business leaders',
    capacity: 80,
    category: 'Business'
  },
  {
    name: 'Photography Workshop',
    organizer: 'Creative Hub',
    location: 'Delhi',
    date: '2025-07-01',
    description: 'Master photography skills',
    capacity: 25,
    category: 'Arts'
  },
  {
    name: 'Data Science Conference',
    organizer: 'Data India',
    location: 'Chennai',
    date: '2025-07-10',
    description: 'Latest trends in data science',
    capacity: 120,
    category: 'Technology'
  }
];

// Insert events one by one
const insertEvents = () => {
  events.forEach((event) => {
    db.run(
      `INSERT INTO events 
        (name, organizer, location, date, description, capacity, category) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        event.name,
        event.organizer,
        event.location,
        event.date,
        event.description,
        event.capacity,
        event.category
      ],
      function (err) {
        if (err) {
          console.log('Error inserting event:', err);
        } else {
          console.log('Added event:', event.name);
        }
      }
    );
  });
};

insertEvents();