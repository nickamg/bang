import React, { Component } from 'react'
import './LoginScreen.css'

export default class LoginScreen extends Component {
    render() {
        return (
            <div className="LoginScreen">
                <form onSubmit={this.props.handleSubmit}>
                    <label className="Label">
                        What is your name?
                        <input 
                            autoFocus
                            type="text" 
                            className="Input" 
                            name="playerName"
                            value={this.props.playerName} 
                            onChange={this.props.handleChange} />
                    </label>
                </form>
            </div>
        )
    }
}
