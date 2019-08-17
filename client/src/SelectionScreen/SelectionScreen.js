import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SelectionScreen.css'

export default class SelectionScreen extends Component {
    render() {
        return (
            <div className="SelectionScreen">
                <Link to="/create" className="Link">CREAR</Link>
                <Link to="/join" className="Link">UNIRSE</Link>
            </div>
        )
    }
}
