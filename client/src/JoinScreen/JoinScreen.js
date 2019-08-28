import React, { Component } from 'react'
import RoomMiniature from '../RoomMiniature/RoomMiniature';

export default class JoinScreen extends Component {
    renderRooms = (rooms) => {
        if(rooms.length) {
            return rooms.map((room) => <RoomMiniature room={room} key={room.roomName} joinRoom={this.props.joinRoom} />);
        } else {
            return 'No hay salas';
        }
    }

    render() {
        return (
            <div>
                {this.renderRooms(this.props.rooms)}
            </div>
        )
    }
}
