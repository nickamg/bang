/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import io from 'socket.io-client';
import LoginScreen from './LoginScreen/LoginScreen';
import SelectionScreen from './SelectionScreen/SelectionScreen';
import CreateScreen from './CreateScreen/CreateScreen';
import JoinScreen from './JoinScreen/JoinScreen';
import LobbyScreen from './LobbyScreen/LobbyScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      playerName: '',
      loggedIn: false,
      roomName: '',
      joinedRoom: false,
      players: [],
    }
  }

  emitter = (event, message) => {
    this.state.socket.emit(event, message);
  }

  listener = (event, handler) => {
    this.state.socket.on(event, handler);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLoginSubmit = (event) => {
    if(this.state.playerName.length > 0) {
        this.setState({ loggedIn: true });
        this.emitter('addPlayer', this.state.playerName.trim())
        event.preventDefault();
    }
  }

  handleRoomSubmit = (event) => {
    if(this.state.roomName.length > 0) {
      this.setState({ joinedRoom: true });
      this.emitter('createRoom', this.state.roomName.trim())
      event.preventDefault();
    }
}

  updatePlayers = () => {
    //TODO Update players state for gameplay
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => {
          if(this.state.loggedIn) {
            return <Redirect to="/select" />
          } else {
            return <LoginScreen playerName={this.state.playerName} handleSubmit={this.handleLoginSubmit} handleChange={this.handleChange} />
          }
        }}/>
        <Route exact path="/select" component={SelectionScreen} />
        <Route exact path="/create" render={() => {
          if(this.state.joinedRoom) {
            return <Redirect to="/lobby" />
          } else {
            return <CreateScreen roomName={this.state.roomName} handleSubmit={this.handleRoomSubmit} handleChange={this.handleChange} />
          }
        }} />
        <Route exact path="/join" render={() => <JoinScreen emitter={this.emitter} listener={this.listener} />} />
        <Route exact path="/lobby" render={() => <LobbyScreen emitter={this.emitter} listener={this.listener}/>} />
      </Router>
    );
  }
}

export default App;
