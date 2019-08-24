(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{49:function(e,t,n){e.exports=n(87)},54:function(e,t,n){},55:function(e,t,n){},77:function(e,t){},80:function(e,t,n){},81:function(e,t,n){},86:function(e,t,n){},87:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(44),i=n.n(o),s=(n(54),n(45)),c=n(2),l=n(3),m=n(5),u=n(4),p=n(6),h=n(10),d=n(15),b=(n(55),n(46)),f=n.n(b),y=(n(80),function(e){function t(){return Object(c.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"LoginScreen"},r.a.createElement("form",{onSubmit:this.props.handleSubmit},r.a.createElement("label",{className:"Label"},"What is your name?",r.a.createElement("input",{type:"text",className:"Input",name:"playerName",value:this.props.playerName,onChange:this.props.handleChange}))))}}]),t}(a.Component)),j=(n(81),function(e){function t(){return Object(c.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"SelectionScreen"},r.a.createElement(d.b,{to:"/create",className:"Link"},"CREAR"),r.a.createElement(d.b,{to:"/join",className:"Link"},"UNIRSE"))}}]),t}(a.Component)),O=(n(86),function(e){function t(){return Object(c.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"CreateScreen"},r.a.createElement("form",{onSubmit:this.props.handleSubmit},r.a.createElement("label",{className:"Label"},"What is the room's name going to be?",r.a.createElement("input",{type:"text",className:"Input",name:"roomName",value:this.props.roomName,onChange:this.props.handleChange}))))}}]),t}(a.Component)),g=function(e){function t(){return Object(c.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"RoomMiniature",onClick:function(){return e.props.joinRoom(e.props.room.roomName)}},"Name: ",this.props.room.roomName," | Players: ",this.props.room.numPlayers)}}]),t}(a.Component),E=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).renderRooms=function(){return n.props.rooms.map(function(e){return r.a.createElement(g,{room:e,key:e.roomName,joinRoom:n.props.joinRoom})})},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.listenForRooms(),this.props.askForRooms()}},{key:"render",value:function(){return r.a.createElement("div",null,this.renderRooms())}}]),t}(a.Component),N=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).renderPlayers=function(){return n.props.players.map(function(e){return r.a.createElement("p",null,e.playerName)})},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.listenForPlayers(),this.props.askForPlayers()}},{key:"render",value:function(){return r.a.createElement("div",{className:"LobbyScreen"},"LOBBY SCREEN Players:",this.renderPlayers(),r.a.createElement("button",null,"Listo"))}}]),t}(a.Component),R=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e))).emitter=function(e,t){n.state.socket.emit(e,t)},n.listener=function(e,t){n.state.socket.on(e,t)},n.handleChange=function(e){n.setState(Object(s.a)({},e.target.name,e.target.value))},n.handleLoginSubmit=function(e){n.state.playerName.length>0&&(n.emitter("addPlayer",n.state.playerName.trim()),n.setState({loggedIn:!0}),e.preventDefault())},n.handleRoomSubmit=function(e){n.state.roomName.length>0&&(n.emitter("createRoom",n.state.roomName.trim()),n.setState({joinedRoom:!0}),e.preventDefault())},n.handleJoinRoom=function(e){n.setState({roomName:e,joinedRoom:!0})},n.askForRooms=function(){n.emitter("listRooms")},n.listenForRooms=function(){n.listener("listRooms",n.updateRooms)},n.updateRooms=function(e){n.emitter("logger","Rooms received"+JSON.stringify(e)),n.setState({rooms:e})},n.askForPlayers=function(){n.emitter("joinRoom",n.state.roomName)},n.listenForPlayers=function(){n.listener("updatePlayers",n.updatePlayers)},n.updatePlayers=function(e){n.emitter("logger","Players received"+JSON.stringify(e)),n.setState({players:e})},n.renderScreen=function(e,t,n){return e?r.a.createElement(h.a,{to:t}):n},n.playerReady=function(){},n.playerUnready=function(){},n.state={socket:f()(),playerName:"",loggedIn:!1,roomName:"",joinedRoom:!1,rooms:[],players:[]},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(d.a,null,r.a.createElement(h.b,{exact:!0,path:"/",render:function(){return e.renderScreen(e.state.loggedIn,"/select",r.a.createElement(y,{playerName:e.state.playerName,handleSubmit:e.handleLoginSubmit,handleChange:e.handleChange}))}}),r.a.createElement(h.b,{exact:!0,path:"/select",component:j}),r.a.createElement(h.b,{exact:!0,path:"/create",render:function(){return e.renderScreen(e.state.joinedRoom,"/lobby",r.a.createElement(O,{roomName:e.state.roomName,handleSubmit:e.handleRoomSubmit,handleChange:e.handleChange}))}}),r.a.createElement(h.b,{exact:!0,path:"/join",render:function(){return e.renderScreen(e.state.joinedRoom,"/lobby",r.a.createElement(E,{listenForRooms:e.listenForRooms,askForRooms:e.askForRooms,rooms:e.state.rooms,joinRoom:e.handleJoinRoom}))}}),r.a.createElement(h.b,{exact:!0,path:"/lobby",render:function(){return r.a.createElement(N,{listenForPlayers:e.listenForPlayers,askForPlayers:e.askForPlayers,players:e.state.players})}}),r.a.createElement(h.b,{exact:!0,path:"/game",render:function(){return r.a.createElement(N,{emitter:e.emitter,listener:e.listener})}}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[49,1,2]]]);
//# sourceMappingURL=main.1cc2a681.chunk.js.map