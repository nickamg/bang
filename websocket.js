function io(server) {
  const io = require('socket.io')(server);

  /**
   * Define socket.io events
   */
  io.on('connection', function (socket) {
    console.log('New socket connected')
    // Logger to keep track of client events
    socket.on('logger', (msg) => console.log(msg));
    // Adds that player name to his socket
    socket.on('addPlayer', addPlayer);
    // Creates the room and joins the socket
    socket.on('createRoom', createRoom);
    // Joins a room and sends an updated player list to all participants
    socket.on('joinRoom', joinRoom);
    // Sends an updated list of rooms to the client
    socket.on('listRooms', listRooms);
    // If all players are ready, it will start the game
    socket.on('playerReady', (roomName) => {
      let start = true;
      socket.playerReady = true;
      getRoomPlayersState(roomName).forEach(element => {
        if(!element.playerReady) {
          start = false;
        }
      });
      if(start) {
        io.sockets.adapter.rooms[roomName].hasStarted = true;
        socket.emit('startGame', start);
      }
    })
    socket.on('closingConnection', closingConnection)
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
    this.distance = 1;
    this.viewDistance = 1;
    this.weapon = 0;
    this.handCards = [];
    this.playedCards = [];
    this.playerReady = false;
    console.log('Registered player: ' + this.playerName);
  }

  /**
   * Joins the socket into a new game room and notifies it existence to all listening sockets. If a room with the same name already exists it will throw an error.
   * @param name Name of the room to be created.
   */
  function createRoom(name) {
    if (io.sockets.adapter.rooms[name]) {
      console.log('[ERROR] El nombre de la partida ya existe, deberías notificárselo al usuario D:')
    } else {
      this.join(name, (err) => {
        if (err) {
          console.log(err);
        } else {
          configureRoom(io.sockets.adapter.rooms[name]);
          this.broadcast.emit('listRooms', playableRooms());
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
    room.cards;
  }

  /**
   * Emits an event witch broadcasts all the playable rooms in an array.
   * @returns [{roomName, numPlayers}]
   */
  function listRooms() {
    this.emit('listRooms', playableRooms())
  }

  /**
   * Filters all the available rooms to just game rooms in an array and returns it.
   * @returns [{roomName, numPlayers}]
   */
  function playableRooms() {
    let rooms = [];
    for (let room in io.sockets.adapter.rooms) {
      if (io.sockets.adapter.rooms[room].isPlayable) {
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
   * @param roomName Name of the room to be joined.
   */
  function joinRoom(roomName) {
    this.join(roomName);
    this.broadcast.emit('listRooms', playableRooms());
    //io.in(roomName).emit('updatePlayers', updateGame(roomName));
    updateGame(roomName);
  }

  /**
   * Sends updated player data to all the room participants
   * @returns [{playerName}]
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

  function updateGame(roomName) {
    let gameData = {};
    let players = [];
    let roomPlayers = getRoomPlayersState(roomName);
    if(io.sockets.adapter.rooms[roomName]) {
      for(let socket in io.sockets.adapter.rooms[roomName].sockets) {
        gameData.player = roomPlayers[socket];
        for(player of roomPlayers) {
          if(player.socketId != socket) {
            players.push({
              playerName: player.playerName,
              playerNumber: player.playerNumber,
              life: player.life,
              role: player.role,
              character: player.character,
              distance: player.distance,
              viewDistance: player.viewDistance,
              weapon: player.weapon,
              handCards: player.handCards.length,
              playedCards: player.playedCards,
              playerReady: player.playerReady
            });
          }
        }
        gameData.players = players;
        io.to(socket).emit('updateGameState', gameData);
        players = [];
      }
    }
  }

  function closingConnection(roomName) {
    this.leave(roomName);
    this.broadcast.emit('listRooms', playableRooms());
    updateGame(roomName);
  }

  return io;
}

module.exports = io;