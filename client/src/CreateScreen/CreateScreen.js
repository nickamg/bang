import React, { Component } from 'react'
import './CreateScreen.css'

export default class CreateScreen extends Component {
    render() {
        return (
            <div className="CreateScreen">
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        What is the room's name going to be?
                        <input
                            autoFocus
                            type="text"
                            className="Input"
                            name="roomName"
                            value={this.props.roomName}
                            onChange={this.props.handleChange} />
                    </label>
                    <button type="submit" className="Button">Continue</button>
                </form>
            </div>
        )
    }
}
