import React, { Component } from 'react'
import RoomMiniature from '../RoomMiniature/RoomMiniature';

export default class JoinScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rooms: [],
        }
      }

    componentDidMount() {
        this.listenForRooms();
        this.askForRooms();
    }

    /**
     * Emits an event to trigger a response from the server.
     */
    askForRooms = () => {
        this.props.emitter('listRooms');
    }

    /**
     * Listens for a list of all the playable rooms.
     */
    listenForRooms = () => {
        this.props.listener('listRooms', this.updateRooms)
    }

    /**
     * Updates the component's state with the new rooms list.
     */
    updateRooms = rooms => {
        this.props.emitter('logger', 'Rooms received' + JSON.stringify(rooms));
        this.setState({ rooms });
    }

    /**
     * Renders the rooms list.
     */
    renderRooms = () => {
        return this.state.rooms.map((room) => <RoomMiniature room={room} key={room.roomName} />)  //<div key={index}>Name: {room.roomName} | Players: {room.numPlayers}</div>)
    }

    render() {
        return (
            <div>
                {this.renderRooms()}
                <button onClick={this.askForRooms}>Reload</button>
            </div>
        )
    }
}
