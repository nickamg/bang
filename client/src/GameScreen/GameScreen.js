import React, { Component } from 'react'
import EnemyPlayer from '../EnemyPlayer/EnemyPlayer';
import Card from '../Card/Card';
import './GameScreen.css'

export default class GameScreen extends Component {
    renderPlayers = () => {
        return this.props.players.map((player) => <EnemyPlayer player={player} />)
    } 
    
    renderCards = () => {
        return this.props.player.handCards.map((card, index) => <Card card={card} index={index} />)
    }

    render() {
        return (
            <div className="GameScreen">
                <div>
                    {this.renderPlayers()}
                </div>
                <div className="PlayerModule">
                    {this.renderCards()}
                </div>
            </div>
        )
    }
}
