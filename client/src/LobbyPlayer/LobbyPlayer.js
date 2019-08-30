import React, { Component } from 'react'
import './LobbyPlayer.css'

export default class LobbyPlayer extends Component {
    render() {
        return (
            <div className="Text">
                {this.props.player.playerName}
                <span className="Text-RightAlignment">
                    {this.props.player.playerReady ? 'Ready' : 'Not Ready'}
                </span>
            </div>
        )
    }
}
