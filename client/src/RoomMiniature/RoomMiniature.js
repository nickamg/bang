import React, { Component } from 'react'
import './RoomMiniature.css'

export default class RoomMiniature extends Component {
    render() {
        return (
            <div className="RoomMiniature" onClick={() => this.props.joinRoom(this.props.room.roomName)}>
                <h3 className="RoomMiniatureTitle">{this.props.room.roomName}</h3>
                <p className="RoomMiniatureText">Current players | <span className="RoomMiniatureNumber">{this.props.room.numPlayers}</span></p>
            </div>
        )
    }
}
