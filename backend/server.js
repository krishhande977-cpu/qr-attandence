require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// serve static files from project root (adjust path if you move HTML elsewhere)
const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

// make sure attendance table exists
(async () => {
  const client = await db.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id SERIAL PRIMARY KEY,
      student_id TEXT NOT NULL,
      name TEXT,
      status TEXT,
      timestamp TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  client.release();
})().catch(console.error);

app.post('/attendance', async (req, res) => {
  const { studentId, name, status, time } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO attendance (student_id, name, status, timestamp) VALUES ($1,$2,$3,$4) RETURNING *',
      [studentId, name, status, time || new Date().toISOString()]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

app.get('/attendance', async (req, res) => {
  try {
    const result = await db.query('SELECT student_id, name, status, timestamp FROM attendance ORDER BY timestamp');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));