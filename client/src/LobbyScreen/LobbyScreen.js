import React, { Component } from 'react'

export default class LobbyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
      }

    componentDidMount() {
        this.props.emitter('joinRoom')
        this.props.listener('joined')
    }

    render() {
        return (
            <div>
                LOBBY SCREEN
                Players: ******
            </div>
        )
    }
}
