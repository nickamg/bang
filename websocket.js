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
      getRoomPlayers(roomName).forEach(element => {
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
    io.in(roomName).emit('updatePlayers', getRoomPlayers(roomName))
  }

  /**
   * Sends updated player data to all the room participants
   * @returns [{playerName}]
   */
  function getRoomPlayers(roomName) {
    let players = []
    for (let socket in io.sockets.adapter.rooms[roomName].sockets) {
      players.push({
        playerName: io.sockets.sockets[socket].playerName,
        playerReady: io.sockets.sockets[socket].playerReady,
      });
    }
    return players
  }

  function closingConnection(roomName) {
    this.leave(roomName);
    this.broadcast.emit('listRooms', playableRooms());
    this.to(roomName).emit('updatePlayers', getRoomPlayers(roomName));
  }

  function updateGame(roomName) {
    let gameData;
    for(let socket in io.sockets.adapter.rooms[roomName].sockets) {
      gameData = [{currentPlayer}, {players}]
      io.to(socket).emit('updateState', )
    }
  }

  function getSocketState(socketId) {
    
  }

  return io;
}

module.exports = io;