import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SelectionScreen extends Component {
    render() {
        return (
            <div>
                <Link to="/create">CREAR</Link>
                <br/>
                <Link to="/join">UNIRSE</Link>
            </div>
        )
    }
}
