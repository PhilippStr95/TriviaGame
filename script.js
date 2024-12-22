// Replace this with your Google Sheets URL
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1ojxDWIZcAIq76xesGcGCyuaKWruDoNgtfDy-fE7NPGA/edit?usp=sharing";

// Initialize Tabletop.js
Tabletop.init({
  key: SHEET_URL,
  simpleSheet: true,
  wanted: ["BaseData"], // Name of the sheet to pull data from
  callback: (data, tabletop) => {
    console.log("Data loaded from Google Sheets:", data);
    window.sheetData = data; // Store the sheet data globally for later use
  },
});

// Helper function to append data to the Google Sheet (Simulated)
async function appendGameToSheet(game) {
  console.log("Simulating adding game to sheet:", game);
  // Simulate writing to Google Sheets using logs (you'd use an API in production)
}

// New Game Functionality
document.getElementById("new-game").addEventListener("click", async (e) => {
  e.preventDefault();
  const playerName = document.getElementById("player-name").value;

  if (!playerName) {
    alert("Please enter your name!");
    return;
  }

  // Generate a unique game token
  const gameToken = Math.random().toString(36).substr(2, 6).toUpperCase();

  // Create a new game object
  const newGame = {
    id: Date.now().toString(),
    token: gameToken,
    player1Id: playerName,
    player2Id: "",
    currentRound: 1,
    maxRounds: 6,
    scores: JSON.stringify({ [playerName]: 0 }),
    gameState: "WAITING_FOR_PLAYER",
  };

  // Simulate adding data to the sheet
  await appendGameToSheet(newGame);

  // Display the token to the user
  const output = document.getElementById("output");
  output.innerHTML = `<p>Game created! Share this token with a friend: <strong>${gameToken}</strong></p>`;
});

// Join Game Functionality
document.getElementById("join-game").addEventListener("click", async (e) => {
  e.preventDefault();
  const playerName = document.getElementById("player-name").value;

  if (!playerName) {
    alert("Please enter your name!");
    return;
  }

  const token = prompt("Enter the game token:");
  if (!token) {
    alert("Please enter a valid token!");
    return;
  }

  // Find the game with the entered token
  const game = window.sheetData.find((row) => row.token === token);

  if (!game) {
    alert("Game not found!");
    return;
  }

  if (game.player2Id) {
    alert("Game already has two players!");
    return;
  }

  // Update the game data
  game.player2Id = playerName;
  game.gameState = "IN_PROGRESS";

  console.log("Game updated:", game);

  // Display the game state
  const output = document.getElementById("output");
  output.innerHTML = `<p>You joined the game! Game is now in progress.</p>`;
});
