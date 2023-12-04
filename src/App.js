import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import nbaLogo from './nba-logo-transparent.png';

function App() {
  const [searchParams, setSearchParams] = useState({
    team: '',
    player: '',
    points: '',
    age: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await axios.get(`http://localhost:3001/api/players?${queryParams}`);
      setResults(response.data);
    } catch (err) {
      setError('Failed to fetch data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <img src={nbaLogo} alt="NBA Logo" className="App-logo" />
      <input name="team" placeholder="Team" onChange={handleInputChange} />
      <input name="player" placeholder="Player Name" onChange={handleInputChange} />
      <input name="points" placeholder="Points" onChange={handleInputChange} type="number" />
      <input name="age" placeholder="Age" onChange={handleInputChange} type="number" />
      <button onClick={handleSearch} style={{ marginBottom: '10px' }}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}




{results && results.map((player, index) => (
  <div key={index}>
    <div><strong>Player Name:</strong> {player.player}</div>
    <div><strong>Team:</strong> {player.tm}</div>
    <div><strong>Age:</strong> {player.age}</div>
    <div><strong>Position:</strong> {player.pos}</div>

    <div><strong>Points:</strong> {player.pts}</div>
    <div><strong>Rebounds:</strong> {player.trb}</div>
    <div><strong>Assists:</strong> {player.ast}</div>
    <div><strong>Steals:</strong> {player.stl}</div>
    <div><strong>Blocks:</strong> {player.blk}</div>
    <div><strong>Turnovers:</strong> {player.tov}</div>

    <div><strong>Games Played:</strong> {player.g}</div>
    <div><strong>Minutes Per Game:</strong> {player.mp}</div>
    <div><strong>Field Goal:</strong> {Math.round(player.fg_percent*100)}%</div>
    <div><strong>3-Point:</strong> {Math.round(player.three_p_percent*100)}%</div>
    <div><strong>Free Throw:</strong> {Math.round(player.ft_percent*100)}%</div>
    
    
    <hr />
  </div>
))}














    </div>
  );
}

export default App;
