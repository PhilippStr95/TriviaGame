// Test Firebase Initialization
console.log("Initializing Firebase...");
console.log("App:", app);
console.log("Firestore:", db);


const firebaseConfig = {
  apiKey: "AIzaSyBMajWsh9tzKXpjAM1GSM2y3JteChEqGq0",
  authDomain: "triviagame-e1b16.firebaseapp.com",
  projectId: "triviagame-e1b16",
  storageBucket: "triviagame-e1b16.firebasestorage.app",
  messagingSenderId: "139629419949",
  appId: "1:139629419949:web:137578bd0c20f8cf179524",
  measurementId: "G-07RFVX45W5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

  document.getElementById('new-game').addEventListener('click', async (e) => {
    e.preventDefault();
    const playerName = document.getElementById('player-name').value;
  
    if (playerName) {
      const gameDoc = await db.collection('games').add({
        player1Id: playerName,
        currentRound: 1,
        maxRounds: 6,
        scores: { [playerName]: 0 },
        gameState: "WAITING_FOR_PLAYER",
        token: Math.random().toString(36).substr(2, 6).toUpperCase()
      });
  
      alert(`Game created! Share this token with your friend: ${gameDoc.id}`);
    }
  });

  document.getElementById('join-game').addEventListener('click', async (e) => {
    e.preventDefault();
    const token = prompt("Enter game token:");
  
    const gameQuery = await db.collection('games').doc(token).get();
  
    if (gameQuery.exists) {
      const gameData = gameQuery.data();
      const playerName = document.getElementById('player-name').value;
  
      if (gameData.player2Id) {
        alert("Game already has two players!");
      } else {
        await db.collection('games').doc(token).update({
          player2Id: playerName,
          gameState: "IN_PROGRESS"
        });
        alert("You joined the game!");
      }
    } else {
      alert("Game not found!");
    }
  });

// New Game Functionality
document.getElementById('new-game').addEventListener('click', async (e) => {
  e.preventDefault();

  // Get the player's name
  const playerName = document.getElementById('player-name').value;

  // Check if the name is valid
  if (!playerName) {
    alert("Please enter your name!");
    return;
  }

  // Generate a unique game token
  const gameToken = Math.random().toString(36).substr(2, 6).toUpperCase();

  try {
    // Write to Firestore
    const gameRef = await db.collection('games').add({
      player1Id: playerName,
      currentRound: 1,
      maxRounds: 6,
      scores: { [playerName]: 0 },
      gameState: "WAITING_FOR_PLAYER",
      token: gameToken,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Alert the user with their game token
    alert(`New game created! Share this token with a friend to join: ${gameToken}`);
    console.log(`Game ID: ${gameRef.id}`);
  } catch (error) {
    console.error("Error creating game:", error);
    alert("Something went wrong. Please try again.");
  }
});

document.getElementById('new-game').addEventListener('click', async (e) => {
  e.preventDefault();
  console.log("New Game button clicked!");

  const playerName = document.getElementById('player-name').value;
  console.log("Player name:", playerName);

  if (!playerName) {
    alert("Please enter your name!");
    return;
  }

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
    console.error("Error writing to Firestore:", error);
    alert("Failed to create a game. Check the console for details.");
  }
});

