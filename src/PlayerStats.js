import React, { useState } from 'react';
import axios from 'axios';

const PlayerStats = () => {
    const [playerName, setPlayerName] = useState('');
    const [playerStats, setPlayerStats] = useState(null);

    const fetchPlayerStats = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/player/${encodeURIComponent(playerName)}`);
            setPlayerStats(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>NBA Player Stats</h2>
            <label>
                Enter player name:
                <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            </label>
            <button onClick={fetchPlayerStats}>Get Player Stats</button>

            {playerStats && (
                <div>
                    <h3>Player Stats:</h3>
                    <ul>
                        <li>
                            <strong>Player Name:</strong> {playerStats[0].PlayerName}
                        </li>
                        <li>
                            <strong>Team:</strong> {playerStats[0].Team}
                        </li>
                        <li>
                            <strong>Points:</strong> {playerStats[0].Points}
                        </li>
                        <li>
                            <strong>Age:</strong> {playerStats[0].Age}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PlayerStats;