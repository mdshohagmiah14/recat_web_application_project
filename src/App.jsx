// App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://www.freetogame.com/api/games?platform=all');
        
        // Check if the response is successful
        if (response.status === 200) {
          setGames(response.data);
        } else {
          setError(`Error: Received status code ${response.status}`);
        }
      } catch (err) {
        setError('Error fetching games. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Game Discovery App</h1>
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="mt-4 px-4 py-2 border rounded"
        />
      </header>
      <main>
        {/* Show loading indicator */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        
        {/* Show error message if there is an error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Display games only if there is no error and not loading */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGames.map(game => (
              <div key={game.id} className="bg-white p-4 shadow rounded">
                <img src={game.thumbnail} alt={game.title} className="mb-2 w-full h-40 object-cover"/>
                <h2 className="text-xl font-semibold">{game.title}</h2>
                <p className="text-gray-600">{game.genre}</p>
                <a
                  href={game.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Explore Game
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
