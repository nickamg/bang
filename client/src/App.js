/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
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
      players: []
    }
  }

  emitter = (event, message) => {
    this.state.socket.emit(event, message);
  }

  listener = (event, handler) => {
    this.state.socket.on(event, handler);
  }

  updatePlayers = () => {
    //TODO Update players state for gameplay
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => <LoginScreen emitter={this.emitter} />} />
        <Route exact path="/select" component={SelectionScreen} />
        <Route exact path="/create" render={() => <CreateScreen emitter={this.emitter} />} />
        <Route exact path="/join" render={() => <JoinScreen emitter={this.emitter} listener={this.listener} />} />
        <Route exact path="/lobby" render={() => <LobbyScreen emitter={this.emitter} listener={this.listener}/>} />
      </Router>
    );
  }
}

export default App;
