import React, { Component } from 'react'
import './LoginScreen.css'

export default class LoginScreen extends Component {
    render() {
        return (
            <div className="LoginScreen">
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        What is your name?
                        <input 
                            autoFocus
                            type="text" 
                            className="Input" 
                            name="playerName"
                            value={this.props.playerName} 
                            onChange={this.props.handleChange} />
                    </label>
                    <button type="submit" className="Button">Continue</button>
                </form>
            </div>
        )
    }
}
