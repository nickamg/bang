import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {
    render() {
        return (
            <div style={{
                    zIndex: this.props.index
                }}>
                <img src={require(`../../public/cards/${this.props.card.name}.jpg`)} alt={this.props.card.name} className="Card" />
            </div>
        )
    }
}
