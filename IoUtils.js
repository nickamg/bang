class IoUtils {
  constructor(io) {
    this.io = io;
  }

  /**
   * Adds the playerName attribute to the socket.
   * @param name Nickname chosen by the user.
   */
  registerPlayer = function(name) {
    this.playerName = name;
    console.log('Registered player: ' + this.playerName);
  }

  /**
   * Joins the socket into a new game room and notifies it existence to all listening sockets. If a room with the same name already exists it will throw an error.
   * @param name Name of the room to be created.
   */
  createRoom = function(name) {
    if (io.sockets.adapter.rooms[name]) {
      this.emit('roomError', 'El nombre de la partida ya existe.')
    } else {
      this.join(name, (err) => {
        if (err) {
          console.log(err);
        } else {
          configureRoom(io.sockets.adapter.rooms[name]);
          this.broadcast.emit('listRooms', filteredRooms());
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
  configureRoom = function(room) {
    room.isPlayable = true;
    room.hasStarted = false;
  }

  /**
   * Emits an event witch broadcasts all the playable rooms in an array.
   * @returns [{roomName, numPlayers}]
   */
  listRooms = function() {
    this.emit('listRooms', filteredRooms())
  }

  /**
   * Filters all the available rooms to just game rooms in an array and returns it.
   * @returns [{roomName, numPlayers}]
   */
  filteredRooms = function() {
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
  joinRoom = function(roomName) {
    this.join(roomName);
    io.in(roomName).emit('joinedRoom', returnRoomPlayers(roomName))
  }

  /**
   * Sends updated player data to all the room participants when a new player joins it
   * @returns [{playerName}]
   */
  returnRoomPlayers = function(roomName) {
    let players = []
    for (let socket in io.sockets.adapter.rooms[roomName].sockets) {
      players.push({
        playerName: io.sockets.sockets[socket].playerName
      });
    }
    return players
  }
}

module.exports = IoUtils;