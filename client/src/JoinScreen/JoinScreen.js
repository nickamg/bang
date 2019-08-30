import React, { Component } from 'react'
import RoomMiniature from '../RoomMiniature/RoomMiniature';
import './JoinScreen.css'

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
            <div className="JoinScreen">
                {this.renderRooms(this.props.rooms)}
            </div>
        )
    }
}
