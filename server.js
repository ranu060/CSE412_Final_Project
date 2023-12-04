const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const client = new Client({
    host: "localhost",
    user : "postgres",
    port : 5432,
    password : "postgres",
    database : "postgres"
});

client.connect();



app.get('/api/players', async (req, res) => {
  const { team, player, points, age } = req.query;
  let query = 'SELECT * FROM nba_player_stats WHERE 1=1';
  const params = [];

  if (team) {
      query += ` AND Tm ILIKE $${params.length + 1}`;
      params.push(`%${team}%`);
  }

  if (player) {
      query += ` AND Player ILIKE $${params.length + 1}`;
      params.push(`%${player}%`);
  }

  if (points) {
      query += ` AND PTS = $${params.length + 1}`;
      params.push(points);
  }

  if (age) {
      query += ` AND age = $${params.length + 1}`;
      params.push(age);
  }

  try {
      const result = await client.query(query, params);
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
