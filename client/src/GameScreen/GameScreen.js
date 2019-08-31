import React, { Component } from 'react'
import EnemyPlayer from '../EnemyPlayer/EnemyPlayer';
import './GameScreen.css'

export default class GameScreen extends Component {
    renderPlayers = () => {
        return this.props.players.map((player) => <EnemyPlayer player={player} />)
    }

    render() {
        return (
            <div className="GameScreen">
                {this.renderPlayers()}
                <div>
                    AQUÍ VAS TÚ
                </div>
            </div>
        )
    }
}
