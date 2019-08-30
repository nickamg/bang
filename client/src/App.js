/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import io from 'socket.io-client';
import LoginScreen from './LoginScreen/LoginScreen';
import SelectionScreen from './SelectionScreen/SelectionScreen';
import CreateScreen from './CreateScreen/CreateScreen';
import JoinScreen from './JoinScreen/JoinScreen';
import LobbyScreen from './LobbyScreen/LobbyScreen';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      joinedRoom: false,
      loggedIn: false,
      gameStarted: false,
      roomName: '',
      rooms: [],
      player: {
        playerName: '',
        playerNumber: 0,
        life: 0,
        role: '',
        character: {
          name: '',
          description: '',
        },
        distance: 1,
        viewDistance: 1,
        weapon: 0,
        handCards: [],
        playedCards: [],
        playerReady: false,
        playerTurn: false,
        waitingOponentAction: false,
      },
      players: [],
    }
  }

  componentDidMount() {
    this.listener('updateGameState', (state) => this.setState({ player: state.player, players: state.players }));
    this.listener('listRooms', (rooms) => this.setState({ rooms }));
    this.listener('startGame', (gameStarted) => this.setState({ gameStarted }));
    window.addEventListener('beforeunload', () => this.emitter('closingConnection', this.state.roomName));
  }

  emitter = (event, message) => {
    this.state.socket.emit(event, message);
  }

  listener = (event, handler) => {
    this.state.socket.on(event, handler);
  }

  updatePlayerStateProperty = (property, value, next) => {
    this.setState(prevState => ({
      player: {
        ...prevState.player,
        [property]: value
      }
    }), next);
  }

  handleLoginInput = (event) => {
    this.updatePlayerStateProperty(event.target.name, event.target.value);
  }

  handleRoomInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLoginSubmit = (event) => {
    if(this.state.player.playerName.length > 0) {
        this.emitter('addPlayer', this.state.player.playerName.trim());
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
    this.state.socket.off('listRooms');
    this.setState({ roomName, joinedRoom: true }, () => this.emitter('joinRoom', this.state.roomName));
  }

  handlePlayerReady = (roomName, playerReady) => {
    this.emitter('playerReady', { roomName, playerReady });
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

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => this.renderScreen(this.state.loggedIn, '/select', 
          <LoginScreen playerName={this.state.player.playerName} handleSubmit={this.handleLoginSubmit} handleChange={this.handleLoginInput} />
          )}/>
        <Route exact path="/select" component={SelectionScreen} />
        <Route exact path="/create" render={() => this.renderScreen(this.state.joinedRoom, '/lobby', 
          <CreateScreen roomName={this.state.roomName} handleSubmit={this.handleRoomSubmit} handleChange={this.handleRoomInput} />
          )} />
        <Route exact path="/join" render={() => this.renderScreen(this.state.joinedRoom, '/lobby',
          <JoinScreen rooms={this.state.rooms} joinRoom={this.handleJoinRoom} />
          )} />
        <Route exact path="/lobby" render={() => <LobbyScreen roomName={this.state.roomName} players={this.state.players} player={this.state.player} handlePlayerReady={this.handlePlayerReady}/>} />
        <Route exact path="/game" render={() => <LobbyScreen emitter={this.emitter} listener={this.listener} />} />
      </Router>
    );
  }
}

export default App;
