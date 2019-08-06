import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './CreateScreen.css'

export default class CreateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            createdRoom: false,
        }
    }

    handleChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = (event) => {
        this.setState({ createdRoom: true });
        this.props.emitter('createRoom', this.state.name.trim())
        event.preventDefault();
    }

    renderRedirect = () => {
        if(this.state.createdRoom) {
            return <Redirect to="/lobby" />
        }
    }

    render() {
        return (
            <div className="CreateScreen">
                <form onSubmit={this.handleSubmit}>
                    <label className="Label">
                        What is the room's name going to be?
                        <input
                            type="text"
                            className="Input"
                            value={this.state.name}
                            onChange={this.handleChange} />
                    </label>
                </form>
                {this.renderRedirect()}
            </div>
        )
    }
}
