import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './CreateScreen.css'

export default class CreateScreen extends Component {
    render() {
        return (
            <div className="CreateScreen">
                <form onSubmit={this.props.handleSubmit}>
                    <label className="Label">
                        What is the room's name going to be?
                        <input
                            type="text"
                            className="Input"
                            name="roomName"
                            value={this.props.roomName}
                            onChange={this.props.handleChange} />
                    </label>
                </form>
            </div>
        )
    }
}
