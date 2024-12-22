// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMajWsh9tzKXpjAM1GSM2y3JteChEqGq0",
  authDomain: "triviagame-e1b16.firebaseapp.com",
  projectId: "triviagame-e1b16",
  storageBucket: "triviagame-e1b16.appspot.com",
  messagingSenderId: "139629419949",
  appId: "1:139629419949:web:137578bd0c20f8cf179524",
  measurementId: "G-07RFVX45W5",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

console.log("Firebase initialized!");
console.log("App:", app);
console.log("Firestore:", db);

// New Game Functionality
document.getElementById('new-game').addEventListener('click', async (e) => {
  e.preventDefault();
  console.log("New Game button clicked!");

  // Get the player's name
  const playerName = document.getElementById('player-name').value;
  console.log("Player name:", playerName);

  if (!playerName) {
    alert("Please enter your name!");
    return;
  }

  // Generate a unique game token
  const gameToken = Math.random().toString(36).substr(2, 6).toUpperCase();

  try {
    console.log("Attempting to write to Firestore...");
    const gameRef = await db.collection('games').add({
      player1Id: playerName,
      currentRound: 1,
      maxRounds: 6,
      scores: { [playerName]: 0 },
      gameState: "WAITING_FOR_PLAYER",
      token: gameToken,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Game created with ID:", gameRef.id);
    alert(`New game created! Token: ${gameToken}`);
  } catch (error) {
    console.error("Error creating game:", error);
    alert("Failed to create a game. Check the console for details.");
  }
});

// Join Game Functionality
document.getElementById('join-game').addEventListener('click', async (e) => {
  e.preventDefault();
  console.log("Join Game button clicked!");

  const token = prompt("Enter game token:");
  console.log("Game token entered:", token);

  if (!token) {
    alert("Please enter a valid game token!");
    return;
  }

  try {
    const gameQuery = await db.collection('games').doc(token).get();

    if (gameQuery.exists) {
      const gameData = gameQuery.data();
      console.log("Game data retrieved:", gameData);

      const playerName = document.getElementById('player-name').value;
      if (!playerName) {
        alert("Please enter your name!");
        return;
      }

      if (gameData.player2Id) {
        alert("Game already has two players!");
      } else {
        await db.collection('games').doc(token).update({
          player2Id: playerName,
          gameState: "IN_PROGRESS",
        });
        alert("You joined the game!");
      }
    } else {
      alert("Game not found!");
    }
  } catch (error) {
    console.error("Error joining game:", error);
    alert("Failed to join the game. Check the console for details.");
  }
});
