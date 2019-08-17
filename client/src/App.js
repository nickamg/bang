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
      rooms: [],
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
        this.emitter('addPlayer', this.state.playerName.trim());
        this.setState({ loggedIn: true });
        event.preventDefault();
    }
  }

  handleRoomSubmit = (event) => {
    if(this.state.roomName.length > 0) {
      this.emitter('createRoom', this.state.roomName.trim());
      this.setState({ joinedRoom: true });
      event.preventDefault();
    }
  }

  handleJoinRoom = (roomName) => {
    this.setState({ roomName, joinedRoom: true });
  }

  /**
   * Emits an event to trigger a response from the server.
   */
  askForRooms = () => {
    this.emitter('listRooms');
  }

  /**
   * Listens for a list of all the playable rooms.
   */
  listenForRooms = () => {
    this.listener('listRooms', this.updateRooms)
  }

  /**
   * Updates the component's state with the new rooms list.
   * @returns [ room: { roomName, numPlayers } ]
   */
  updateRooms = rooms => {
    this.emitter('logger', 'Rooms received' + JSON.stringify(rooms));
    this.setState({ rooms });
  }

  /**
   * Emits an event to trigger a response from the server.
   */
  askForPlayers = () => {
    this.emitter('joinRoom', this.state.roomName);
  }

  /**
   * Listens for an update on the player's list.
   */
  listenForPlayers = () => {
    this.listener('updatePlayers', this.updatePlayers)
  }

  /**
   * Updates the component's state with the new rooms list.
   * @returns [ room: { roomName, numPlayers } ]
   */
  updatePlayers = players => {
    this.emitter('logger', 'Players received' + JSON.stringify(players));
    this.setState({ players })
  }

  /**
   * Chooses the right path to display based on a set condition.
   * @param condition The condition that chooses if true to redirect, and if false to render the component associated to the current path.
   * @param redirectUrl The url to redirect.
   * @param component The component to be rendered in this path.
   */
  renderScreen = (condition, redirectUrl, component) => {
    if(condition) {
      return <Redirect to={redirectUrl} />
    } else {
      return component;
    }
  }

  playerReady = () => {
    
  }

  playerUnready = () => {
    
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => this.renderScreen(this.state.loggedIn, '/select', 
          <LoginScreen playerName={this.state.playerName} handleSubmit={this.handleLoginSubmit} handleChange={this.handleChange} />
          )}/>
        <Route exact path="/select" component={SelectionScreen} />
        <Route exact path="/create" render={() => this.renderScreen(this.state.joinedRoom, '/lobby', 
          <CreateScreen roomName={this.state.roomName} handleSubmit={this.handleRoomSubmit} handleChange={this.handleChange} />
          )} />
        <Route exact path="/join" render={() => this.renderScreen(this.state.joinedRoom, '/lobby',
          <JoinScreen listenForRooms={this.listenForRooms} askForRooms={this.askForRooms} rooms={this.state.rooms} joinRoom={this.handleJoinRoom} />
          )} />
        <Route exact path="/lobby" render={() => <LobbyScreen listenForPlayers={this.listenForPlayers} askForPlayers={this.askForPlayers} players={this.state.players} />} />
        <Route exact path="/game" render={() => <LobbyScreen emitter={this.emitter} listener={this.listener} />} />
      </Router>
    );
  }
}

export default App;
