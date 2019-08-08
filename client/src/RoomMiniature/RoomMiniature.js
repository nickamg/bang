import React, { Component } from 'react'
import './RoomMiniature'

export default class RoomMiniature extends Component {
    render() {
        return (
            <div className="RoomMiniature" onClick={() => this.props.joinRoom(this.props.room.roomName)}>
                Name: {this.props.room.roomName} | Players: {this.props.room.numPlayers}
            </div>
        )
    }
}
