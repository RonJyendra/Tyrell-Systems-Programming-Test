import { useState } from 'react'
import './App.css'
// import "tailwindcss";

export default function App() {
  // const [count, setCount] = useState(0)
  const [numPeople, setNumPeople] = useState(0);
  const [distribution, setDistribution] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setDistribution([]);

    try {
      const response = await fetch("http://localhost/deck/backend/index.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numPeople }),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setDistribution(data.distribution);
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
    }
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Playing Card Distributor</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4" style={{ display: 'flex', flexDirection: 'row' }}>

            <label >
              Total number of Players :
              <input
                type="number"
                value={numPeople}
                onChange={(e) => setNumPeople(Number(e.target.value))}
                placeholder="Enter number of players"
                className="border p-2 w-full text-white rounded"
              />
            </label>
          </div>
          <button type="submit" className="bg-red-600 hover:bg-red-700 p-2 w-full rounded text-black font-bold">
            Deal Cards
          </button>
        </form>
        {error && <p className="text-yellow-300 mt-2">{error}</p>}
        
        <div className="mt-4 space-y-2">
        

           {distribution.map((cards, index) => (
            <>
              <p className="text-lg font-bold">Player {index + 1}</p>
              <div key={index} className="bg-black p-3 rounded shadow-md text-center text-lg font-semibold">
                {cards}
              </div>
            </>
          ))} 
        </div>
      </div>
    </div>

  )
}

