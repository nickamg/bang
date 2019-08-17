import React, { Component } from 'react'

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
            <div>
                LOBBY SCREEN
                Players:
                {this.renderPlayers()}
                <button>Listo</button>
            </div>
        )
    }
}
