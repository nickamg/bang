import React, { Component } from 'react'
import LobbyPlayer from '../LobbyPlayer/LobbyPlayer';
import './LobbyScreen.css'

export default class LobbyScreen extends Component {
    renderPlayers = () => {
        return this.props.players.map((player) => <LobbyPlayer player={player} />)
    }

    render() {
        return (
            <div onClick={() => this.props.handlePlayerReady(this.props.roomName, this.props.player.playerReady)} className="LobbyScreen">
                <h1>{this.props.roomName}</h1>
                <LobbyPlayer player={this.props.player} />
                {this.renderPlayers()}
                <button className="Button">Listo</button>
            </div>
        )
    }
}
