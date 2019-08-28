import React, { Component } from 'react'
import './LobbyScreen'

export default class LobbyScreen extends Component {
    renderPlayers = () => {
        return this.props.players.map((player) => <p>{player.playerName}</p>)
    }

    render() {
        return (
            <div className="LobbyScreen">
                <h1>{this.props.roomName}</h1>
                <p>{this.props.playerName}</p>
                {this.renderPlayers()}
                <button>Listo</button>
            </div>
        )
    }
}
