import React, { Component } from 'react'
import './EnemyPlayer.css'

export default class EnemyPlayer extends Component {
    render() {
        return (
            <div className="EnemyPlayer">
                <p className="EnemyPlayerName">{this.props.player.playerName}</p>
                <p className="EnemyPlayerText">
                    Cards: <span className="EnemyPlayerText-Bold">{this.props.player.handCards}</span>
                     | Weapon: <span className="EnemyPlayerText-Bold">{this.props.player.weapon}</span>
                     | Life: <span className="EnemyPlayerText-Bold">{this.props.player.life}</span>
                     | Distance: <span className="EnemyPlayerText-Bold">{this.props.player.baseDistance + this.props.player.distance}</span>
                </p>
            </div>
        )
    }
}
