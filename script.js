// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMajWsh9tzKXpjAM1GSM2y3JteChEqGq0",
    authDomain: "triviagame-e1b16.firebaseapp.com",
    projectId: "triviagame-e1b16",
    storageBucket: "triviagame-e1b16.firebasestorage.app",
    messagingSenderId: "139629419949",
    appId: "1:139629419949:web:137578bd0c20f8cf179524",
    measurementId: "G-07RFVX45W5"
  };

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
  
