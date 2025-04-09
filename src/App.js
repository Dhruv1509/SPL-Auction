// SPL Auction Platform - MVP (React UI)
import React, { useState } from "react";

const initialTeams = [
  { name: "Blue Blasters", color: "blue", balance: 1000, players: [] },
  { name: "Green Guardians", color: "green", balance: 1000, players: [] },
  { name: "Yellow Yoddhas", color: "yellow", balance: 1000, players: [] },
  { name: "Red Rangers", color: "red", balance: 1000, players: [] },
];

const initialPlayers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: \`Player \${i + 1}\`,
  basePrice: 50 + (i % 5) * 10,
  sold: false,
  team: null,
  bid: 0,
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

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Available Players</h2>
        <ul className="space-y-2">
          {players.filter((p) => !p.sold).map((player) => (
            <li
              key={player.id}
              className="p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedPlayer(player)}
            >
              {player.name} (Base: ₹{player.basePrice})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Teams</h2>
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team.name} className={"p-3 rounded-lg"} style={{ backgroundColor: team.color }}>
              <h3 className="text-white font-semibold text-lg">{team.name} - ₹{team.balance} Left</h3>
              <ul className="text-white text-sm mt-2">
                {team.players.map((p) => (
                  <li key={p.id}>{p.name} - ₹{p.bid}</li>
                ))}
              </ul>
              <button
                className="mt-2 bg-white text-black px-2 py-1 rounded"
                onClick={() => setSelectedTeam(team.name)}
              >
                Select {team.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedPlayer && (
        <div className="col-span-2 border p-4 mt-4 rounded">
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
