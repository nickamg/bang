import React, { Component } from 'react'

export default class LobbyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
      }

    componentDidMount() {
        this.props.emitter('joinRoom')
        this.props.listener('joined')
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
            </div>
        )
    }
}
