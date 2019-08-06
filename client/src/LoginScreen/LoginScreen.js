import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './LoginScreen.css'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            loggedIn: false,
        }
    }

    handleChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = (event) => {
        if(this.state.name.length > 0) {
            this.setState({ loggedIn: true });
            this.props.emitter('addPlayer', this.state.name.trim())
            event.preventDefault();
        }
    }

    renderRedirect = () => {
        if(this.state.loggedIn) {
            return <Redirect to="/select" />
        }
    }

    render() {
        return (
            <div className="LoginScreen">
                <form onSubmit={this.handleSubmit}>
                    <label className="Label">
                        What is your name?
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
