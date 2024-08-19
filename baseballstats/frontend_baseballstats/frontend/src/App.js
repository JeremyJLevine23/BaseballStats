import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  // State to hold the list of players fetched from the backend
  const [players, setPlayers] = useState([]);

  // State to hold the data for the form (either for adding or editing a player)
  const [playerData, setPlayerData] = useState({
    name: '',
    team: '',
    position: '',
    games_played: '',
    batting_average: '',
    home_runs: '',
    singles: '',
    doubles: '',
    triples: '',
    strikeouts: '',
    walks: ''
  });

  // State to track if the form is in edit mode or add mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold the ID of the player currently being edited
  const [currentPlayerId, setCurrentPlayerId] = useState(null);

  // Fetch all players from the backend when the component mounts
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Function to retrieve the list of players from the Django Backend
  const fetchPlayers = () => {
    axios.get('http://localhost:8000/api/players/')
      .then(response => {
        // Update the players state with the data received from the API
        setPlayers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the player data!", error);
      });
  };

  // Function to handle changes to the form inputs
  const handleInputChange = (e) => {
    if (e.target.name === "name") {
      setPlayerData({ ...playerData, name: e.target.value });
    } else if (e.target.name === "team") {
      setPlayerData({ ...playerData, team: e.target.value });
    } else if (e.target.name === "position") {
      setPlayerData({ ...playerData, position: e.target.value });
    } else if (e.target.name === "games_played") {
      setPlayerData({ ...playerData, games_played: e.target.value });
    } else if (e.target.name === "batting_average") {
      setPlayerData({ ...playerData, batting_average: e.target.value });
    } else if (e.target.name === "home_runs") {
      setPlayerData({ ...playerData, home_runs: e.target.value });
    } else if (e.target.name === "singles") {
      setPlayerData({ ...playerData, singles: e.target.value });
    } else if (e.target.name === "doubles") {
      setPlayerData({ ...playerData, doubles: e.target.value });
    } else if (e.target.name === "triples") {
      setPlayerData({ ...playerData, triples: e.target.value });
    } else if (e.target.name === "strikeouts") {
      setPlayerData({ ...playerData, strikeouts: e.target.value });
    } else if (e.target.name === "walks") {
      setPlayerData({ ...playerData, walks: e.target.value });
    }
  };

  // Function to handle form submission (either for adding or updating a player)
  const handleSubmit = (e) => {
    if (isEditing) {
      // If editing, send a PUT request to update the player's data
      axios.put(`http://localhost:8000/api/players/${currentPlayerId}/`, playerData)
        .then(response => {
          fetchPlayers(); // Refresh the player list
          resetForm();    // Reset form to initial state after successful edit
        })
        .catch(error => {
          console.error("There was an error updating the player!", error);
        });
    } else {
      // If adding, send a POST request to create a new player
      axios.post('http://localhost:8000/api/players/', playerData)
        .then(response => {
          fetchPlayers(); // Refresh the player list
          resetForm();    // Reset form to initial state after successful add
        })
        .catch(error => {
          console.error("There was an error adding the player!", error);
        });
    }
  };

  // Function to handle the editing of a player (populates form fields with player's data)
  const handleEdit = (player) => {
    setIsEditing(true); // Set editing mode to true (can edit exisiting player)
    setCurrentPlayerId(player.id); // Set the ID of the player being edited
    setPlayerData({ // Populate the form with the selected player's data
      name: player.name,
      team: player.team,
      position: player.position,
      games_played: player.games_played,
      batting_average: player.batting_average,
      home_runs: player.home_runs,
      singles: player.singles,
      doubles: player.doubles,
      triples: player.triples,
      strikeouts: player.strikeouts,
      walks: player.walks
    });
  };

  // Function to handle the deletion of a player
  const handleDelete = (playerId) => {
    axios.delete(`http://localhost:8000/api/players/${playerId}/`)
      .then(response => {
        fetchPlayers(); // Refresh the player list after successful deletion
      })
      .catch(error => {
        console.error("There was an error deleting the player!", error);
      });
  };

  // Function to reset the form to its initial state (after submission or cancellation)
  const resetForm = () => {
    setPlayerData({ // Clear the form fields
      name: '',
      team: '',
      position: '',
      games_played: '',
      batting_average: '',
      home_runs: '',
      singles: '',
      doubles: '',
      triples: '',
      strikeouts: '',
      walks: ''
    });
    setIsEditing(false); // Set editing mode to false (can edit a new player)
    setCurrentPlayerId(null); // Clear the current player ID (reset after form is submitted)
  };

  return (
    <div className="App">
      <h1>Baseball Hitter Statistics</h1>

      {/* Form to add or edit players */}
      <form onSubmit={handleSubmit}>
        {/* Input Form for player data */}
        <input type="text" name="name" placeholder="Name" value={playerData.name} onChange={handleInputChange} required />
        <input type="text" name="team" placeholder="Team" value={playerData.team} onChange={handleInputChange} required />
        <input type="text" name="position" placeholder="Position" value={playerData.position} onChange={handleInputChange} required />
        <input type="number" name="games_played" placeholder="Games Played" value={playerData.games_played} onChange={handleInputChange} required />
        <input type="number" name="batting_average" placeholder="Batting Average" value={playerData.batting_average} onChange={handleInputChange} required />
        <input type="number" name="home_runs" placeholder="Home Runs" value={playerData.home_runs} onChange={handleInputChange} required />
        <input type="number" name="singles" placeholder="Singles" value={playerData.singles} onChange={handleInputChange} required />
        <input type="number" name="doubles" placeholder="Doubles" value={playerData.doubles} onChange={handleInputChange} required />
        <input type="number" name="triples" placeholder="Triples" value={playerData.triples} onChange={handleInputChange} required />
        <input type="number" name="strikeouts" placeholder="Strikeouts" value={playerData.strikeouts} onChange={handleInputChange} required />
        <input type="number" name="walks" placeholder="Walks" value={playerData.walks} onChange={handleInputChange} required />
        <button type="submit">{isEditing ? 'Update Player' : 'Add Player'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      {/* Table to display the list of players */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Games Played</th>
            <th>Batting Average</th>
            <th>Home Runs</th>
            <th>Singles</th>
            <th>Doubles</th>
            <th>Triples</th>
            <th>Strikeouts</th>
            <th>Walks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the players array and it will render a table row for each player */}
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.games_played}</td>
              <td>{player.batting_average}</td>
              <td>{player.home_runs}</td>
              <td>{player.singles}</td>
              <td>{player.doubles}</td>
              <td>{player.triples}</td>
              <td>{player.strikeouts}</td>
              <td>{player.walks}</td>
              <td>
                {/* Edit and Delete buttons */}
                <button onClick={() => handleEdit(player)}>Edit</button>
                <button onClick={() => handleDelete(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
