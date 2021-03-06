function io(server) {
  const io = require('socket.io')(server);

  /**
   * Define socket.io events
   */
  io.on('connection', function (socket) {
    console.log('New socket connected')
    socket.on('logger', (msg) => console.log(msg));
    socket.on('addPlayer', addPlayer);
    socket.on('createRoom', createRoom);
    socket.on('joinRoom', joinRoom);
    socket.on('playerReady', startGame);
    socket.on('closingConnection', closingConnection);
  });

  /**
   * Adds the playerName attribute to the socket.
   * @param name Nickname choosen by the user.
   */
  function addPlayer(name) {
    this.playerName = name;
    this.playerNumber;
    this.life;
    this.role;
    this.character;
    this.distance = 0;
    this.viewDistance = 1;
    this.weapon = 1;
    this.handCards = [];
    this.playedCards = [];
    this.playerReady = false;
    listRooms();
    console.log('Registered player: ' + this.playerName);
  }

  /**
   * Joins the socket into a new game room and notifies it existence to all listening sockets. If a room with the same name already exists it will throw an error.
   * @param {string} roomName Name of the room to be created.
   */
  function createRoom(roomName) {
    if (io.sockets.adapter.rooms[roomName]) {
      console.log('[ERROR] El nombre de la partida ya existe, deberías notificárselo al usuario D:')
    } else {
      this.join(roomName, (err) => {
        if (err) {
          console.log(err);
        } else {
          configureRoom(io.sockets.adapter.rooms[roomName]);
          this.playerNumber = io.sockets.adapter.rooms[roomName].length;
          listRooms();
          updateGameState(roomName);
          console.log(
            'Currently available rooms: ' + JSON.stringify(io.sockets.adapter.rooms) +
            '\n' + this.playerName + "'s rooms: " + JSON.stringify(this.rooms)
          )
        }
      });
    }
  }

  /**
   * Configures the newly created room.
   * @param room The room the user is creating available in io.sockets.adapter.rooms[roomName].
   */
  function configureRoom(room) {
    room.isPlayable = true;
    room.hasStarted = false;
    room.playerTurn = 1;
    room.cards =  require('./cards');
  }

  /**
   * Emits an event witch broadcasts all the playable rooms in an array.
   * @returns [{roomName, numPlayers}]
   */
  function listRooms() {
    io.emit('listRooms', getPlayableRooms())
  }

  /**
   * Filters all the available rooms to just game rooms in an array and returns it.
   * @returns [{roomName, numPlayers}]
   */
  function getPlayableRooms() {
    let rooms = [];
    for (let room in io.sockets.adapter.rooms) {
      if (io.sockets.adapter.rooms[room].isPlayable && !io.sockets.adapter.rooms[room].hasStarted) {
        rooms.push({
          roomName: room,
          numPlayers: io.sockets.adapter.rooms[room].length
        })
      }
    }
    return rooms;
  }

  /**
   * Joins the provided room that matches the roomName, and sends updated player data to all the room participants.
   * @param {string} roomName Name of the room to be joined.
   */
  function joinRoom(roomName) {
    this.join(roomName);
    this.playerNumber = io.sockets.adapter.rooms[roomName].length;
    listRooms();
    updateGameState(roomName);
  }

  /**
   * Retrieves all the room's participants state in an array
   * @param {string} roomName
   */
  function getRoomPlayersState(roomName) {
    let players = [];
    if(io.sockets.adapter.rooms[roomName]) {
      for(let socket in io.sockets.adapter.rooms[roomName].sockets) {
        players.push({
          socketId: socket,
          playerName: io.sockets.sockets[socket].playerName,
          playerNumber: io.sockets.sockets[socket].playerNumber,
          life: io.sockets.sockets[socket].life,
          role: io.sockets.sockets[socket].role,
          character: io.sockets.sockets[socket].character,
          distance: io.sockets.sockets[socket].distance,
          viewDistance: io.sockets.sockets[socket].viewDistance,
          weapon: io.sockets.sockets[socket].weapon,
          handCards: io.sockets.sockets[socket].handCards,
          playedCards: io.sockets.sockets[socket].playedCards,
          playerReady: io.sockets.sockets[socket].playerReady,
        });
      }
    }
    return players
  }

  /**
   * Updates the game state for every player in a room
   * @param {string} roomName 
   */
  function updateGameState(roomName) {
    let gameData = {};
    let players = [];
    let roomPlayers = getRoomPlayersState(roomName);
    if(io.sockets.adapter.rooms[roomName]) {
      for(let socket in io.sockets.adapter.rooms[roomName].sockets) {
        for(player of roomPlayers) {
          if(player.socketId != socket) {
            players.push({
              ...player,
              baseDistance: (calculatePlayerBaseDistance(io.sockets.sockets[socket].playerNumber, player.playerNumber, roomPlayers.length)),
              handCards: player.handCards.length,
            });
          } else {
            gameData.player = player;
          }
        }
        gameData.players = players;
        io.to(socket).emit('updateGameState', gameData);
        players = [];
      }
    }
  }

  function calculatePlayerBaseDistance(playerPosition, oponentPosition, numPlayers) {
    console.log('player position: ' + playerPosition + ' | oponentPosition: ' + oponentPosition + ' | numPlayers: ' + numPlayers);
    let rightDistance = 0;
    let leftDistance = 0;
    for(let i = playerPosition; i != oponentPosition; i++) {
      rightDistance += 1;
      if(i >= numPlayers) {
        i = 0;
      }
      if(i == oponentPosition) {
        break;
      }
    }
    for(let i = playerPosition; i != oponentPosition; i--) {
      leftDistance += 1;
      if(i <= 1) {
        i = numPlayers + 1;
      }
      if(i == oponentPosition) {
        break;
      }
    }
    console.log('distancias ' + rightDistance + ' | ' + leftDistance)
    if(rightDistance <= leftDistance) {
      return rightDistance;
    } else {
      return leftDistance;
    }
  }

  function startGame(data) {
    let start = true;
    this.playerReady = !data.playerReady;
    updateGameState(data.roomName);
    getRoomPlayersState(data.roomName).forEach(player => {
      if(!player.playerReady) {
        start = false;
      }
    });
    if(start) {
      io.sockets.adapter.rooms[data.roomName].hasStarted = true;
      configureStartGame(io.sockets.adapter.rooms[data.roomName], io.sockets.sockets);
      io.in(data.roomName).emit('startGame', start);
      updateGameState(data.roomName);
      listRooms();
    }
  }

  function configureStartGame(room, players) {
    for(let player in room.sockets) {
      players[player].life = 4;
      dealCards(players[player].life, room.cards.deck, players[player].handCards);
    }
  }

  function dealCards(numCards, deck, playerCards) {
    let card;
    for(let i = 0; i < numCards; i++) {
      card = Math.floor(Math.random() * (deck.length - 1));
      playerCards.push(deck[card]);
      deck.splice(card, 1);
    }
  }

  function closingConnection(roomName) {
    this.leave(roomName);
    listRooms();
    updateGameState(roomName);
  }

  return io;
}

module.exports = io;