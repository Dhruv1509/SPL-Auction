// SPL Auction Platform - Enhanced UI with Shivohm Branding
import React, { useState } from "react";
const logo = "/logo.png"; // ✅ Use public URL path
<img src={logo} alt="Shivohm Logo" className="w-16 h-16" />

const initialTeams = [
  { name: "Blue Blasters", color: "#3B82F6", balance: 1000, players: [] },
  { name: "Green Guardians", color: "#10B981", balance: 1000, players: [] },
  { name: "Yellow Yoddhas", color: "#FACC15", balance: 1000, players: [] },
  { name: "Red Rangers", color: "#EF4444", balance: 1000, players: [] },
];

const playerNames = [
  "Akshay Patel", "Chirag Patel", "Dhruv Jani", "Dhruv Prajapati", "Divyesh Desani",
  "Gaurav Pandya", "Helly Priyadarshi", "Himanshi Makwana", "Jaydeep Dabhi", "Jaydeep Rupala",
  "Jayesh Patoliya", "Kishan Jani", "Komal Shah", "Maulik Pathar", "Mahendra Gami",
  "Mansi Joshi", "Nilesh Newaskar", "Parth Nagvadia"
];

const initialPlayers = playerNames.map((name, index) => ({
  id: index + 1,
  name,
  basePrice: 10,
  sold: false,
  team: null,
  bid: 0
}));

export default function SPLAuction() {
  const [teams, setTeams] = useState(initialTeams);
  const [players, setPlayers] = useState(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleBid = () => {
    if (!selectedPlayer || !selectedTeam) return;
    const teamIndex = teams.findIndex((t) => t.name === selectedTeam);
    if (teams[teamIndex].balance < bidAmount) return alert("Insufficient balance");

    const updatedTeams = [...teams];
    updatedTeams[teamIndex].balance -= bidAmount;
    updatedTeams[teamIndex].players.push({ ...selectedPlayer, bid: bidAmount });

    const updatedPlayers = players.map((p) =>
      p.id === selectedPlayer.id
        ? { ...p, sold: true, team: selectedTeam, bid: bidAmount }
        : p
    );

    setTeams(updatedTeams);
    setPlayers(updatedPlayers);
    setSelectedPlayer(null);
    setBidAmount(0);
    setSelectedTeam(null);
  };

  const sortedPlayers = [...players.filter((p) => !p.sold)].sort((a, b) => b.basePrice - a.basePrice);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <img src={logo} alt="Shivohm Logo" className="w-16 h-16" />
        <h1 className="text-3xl font-bold text-center text-gray-800 flex-1">Shivohm Premiere League</h1>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {teams.map((team) => (
          <div key={team.name} className="rounded-xl p-4 shadow-lg text-white" style={{ backgroundColor: team.color }}>
            <h3 className="text-xl font-semibold">{team.name}</h3>
            <p className="text-sm">Balance: ₹{team.balance}</p>
            <ul className="mt-2 text-sm">
              {team.players.map((p) => (
                <li key={p.id}>{p.name} - ₹{p.bid}</li>
              ))}
            </ul>
            <button
              className="mt-2 bg-white text-black px-3 py-1 rounded"
              onClick={() => setSelectedTeam(team.name)}
            >
              Select {team.name}
            </button>
          </div>
        ))}
      </div>

      {/* Players List */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-3">Available Players</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sortedPlayers.map((player) => (
            <div
              key={player.id}
              className="border p-2 rounded shadow-sm hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedPlayer(player)}
            >
              <p className="font-medium">{player.name}</p>
              <p className="text-sm">Base: ₹{player.basePrice}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bidding Panel */}
      {selectedPlayer && (
        <div className="bg-white p-4 rounded shadow-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">Auctioning: {selectedPlayer.name}</h2>
          <input
            type="number"
            placeholder="Enter Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="border px-2 py-1 mr-2"
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={handleBid}
          >
            Confirm Bid for {selectedTeam || "No Team Selected"}
          </button>
        </div>
      )}
    </div>
  );
}
