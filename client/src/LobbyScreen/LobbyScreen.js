import React, { Component } from 'react'
import './LobbyScreen'

export default class LobbyScreen extends Component {
    componentDidMount() {
        this.props.listenForPlayers();
        this.props.askForPlayers();
    }

    /**
     * Renders the players list.
     */
    renderPlayers = () => {
        return this.props.players.map((player) => <p>{player.playerName}</p>)
    }

    render() {
        return (
            <div className="LobbyScreen">
                LOBBY SCREEN
                Players:
                {this.renderPlayers()}
                <button>Listo</button>
            </div>
        )
    }
}
