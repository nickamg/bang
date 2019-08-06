import React, { Component } from 'react'
import './RoomMiniature'

export default class RoomMiniature extends Component {
    handleClick = () => {
        alert('joined' + this.props.room.roomName)
    }

    render() {
        return (
            <div className="RoomMiniature" onClick={this.handleClick}>
                Name: {this.props.room.roomName} | Players: {this.props.room.numPlayers}
            </div>
        )
    }
}
