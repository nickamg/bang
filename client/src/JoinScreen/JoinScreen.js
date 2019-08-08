import React, { Component } from 'react'
import RoomMiniature from '../RoomMiniature/RoomMiniature';

export default class JoinScreen extends Component {
    componentDidMount() {
        this.props.listenForRooms();
        this.props.askForRooms();
    }

    /**
     * Renders the rooms list.
     */
    renderRooms = () => {
        return this.props.rooms.map((room) => <RoomMiniature room={room} key={room.roomName} joinRoom={this.props.joinRoom} />)
    }

    render() {
        return (
            <div>
                {this.renderRooms()}
            </div>
        )
    }
}
