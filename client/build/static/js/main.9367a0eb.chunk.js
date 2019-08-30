(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{50:function(e,t,a){e.exports=a(90)},55:function(e,t,a){},56:function(e,t,a){},78:function(e,t){},81:function(e,t,a){},82:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(45),c=a.n(o),i=(a(55),a(15)),l=a(46),s=a(2),m=a(3),u=a(5),p=a(4),h=a(6),d=a(10),y=a(16),b=(a(56),a(47)),f=a.n(b),j=(a(81),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"LoginScreen"},r.a.createElement("form",{onSubmit:this.props.handleSubmit},r.a.createElement("label",{className:"Label"},"What is your name?",r.a.createElement("input",{autoFocus:!0,type:"text",className:"Input",name:"playerName",value:this.props.playerName,onChange:this.props.handleChange})),r.a.createElement("button",{type:"submit",className:"Button"},"Continue")))}}]),t}(n.Component)),N=(a(82),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"SelectionScreen"},r.a.createElement(y.b,{to:"/create",className:"Link"},"CREAR"),r.a.createElement(y.b,{to:"/join",className:"Link"},"UNIRSE"))}}]),t}(n.Component)),O=(a(87),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"CreateScreen"},r.a.createElement("form",{onSubmit:this.props.handleSubmit},r.a.createElement("label",{className:"Label"},"What is the room's name going to be?",r.a.createElement("input",{autoFocus:!0,type:"text",className:"Input",name:"roomName",value:this.props.roomName,onChange:this.props.handleChange})),r.a.createElement("button",{type:"submit",className:"Button"},"Continue")))}}]),t}(n.Component)),E=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"RoomMiniature",onClick:function(){return e.props.joinRoom(e.props.room.roomName)}},"Name: ",this.props.room.roomName," | Players: ",this.props.room.numPlayers)}}]),t}(n.Component),g=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).renderRooms=function(e){return e.length?e.map(function(e){return r.a.createElement(E,{room:e,key:e.roomName,joinRoom:a.props.joinRoom})}):"No hay salas"},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.renderRooms(this.props.rooms))}}]),t}(n.Component),v=(a(88),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"Text"},this.props.player.playerName,r.a.createElement("span",{className:"Text-RightAlignment"},this.props.player.playerReady?"Ready":"Not Ready"))}}]),t}(n.Component)),R=(a(89),function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).renderPlayers=function(){return a.props.players.map(function(e){return r.a.createElement(v,{player:e})})},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{onClick:function(){return e.props.handlePlayerReady(e.props.roomName,e.props.player.playerReady)},className:"LobbyScreen"},r.a.createElement("h1",null,this.props.roomName),r.a.createElement(v,{player:this.props.player}),this.renderPlayers(),r.a.createElement("button",{className:"Button"},"Listo"))}}]),t}(n.Component)),S=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).emitter=function(e,t){a.state.socket.emit(e,t)},a.listener=function(e,t){a.state.socket.on(e,t)},a.updatePlayerStateProperty=function(e,t,n){a.setState(function(a){return{player:Object(l.a)({},a.player,Object(i.a)({},e,t))}},n)},a.handleLoginInput=function(e){a.updatePlayerStateProperty(e.target.name,e.target.value)},a.handleRoomInput=function(e){a.setState(Object(i.a)({},e.target.name,e.target.value))},a.handleLoginSubmit=function(e){a.state.player.playerName.length>0&&(a.emitter("addPlayer",a.state.player.playerName.trim()),a.setState({loggedIn:!0}),e.preventDefault())},a.handleRoomSubmit=function(e){a.state.roomName.length>0&&(a.emitter("createRoom",a.state.roomName.trim()),a.setState({joinedRoom:!0}),e.preventDefault())},a.handleJoinRoom=function(e){a.state.socket.off("listRooms"),a.setState({roomName:e,joinedRoom:!0},function(){return a.emitter("joinRoom",a.state.roomName)})},a.handlePlayerReady=function(e,t){a.emitter("playerReady",{roomName:e,playerReady:t})},a.renderScreen=function(e,t,a){return e?r.a.createElement(d.a,{to:t}):a},a.state={socket:f()(),joinedRoom:!1,loggedIn:!1,gameStarted:!1,roomName:"",rooms:[],player:{playerName:"",playerNumber:0,life:0,role:"",character:{name:"",description:""},distance:1,viewDistance:1,weapon:0,handCards:[],playedCards:[],playerReady:!1,playerTurn:!1,waitingOponentAction:!1},players:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.listener("updateGameState",function(t){return e.setState({player:t.player,players:t.players})}),this.listener("listRooms",function(t){return e.setState({rooms:t})}),this.listener("startGame",function(t){return e.setState({gameStarted:t})}),window.addEventListener("beforeunload",function(){return e.emitter("closingConnection",e.state.roomName)})}},{key:"render",value:function(){var e=this;return r.a.createElement(y.a,null,r.a.createElement(d.b,{exact:!0,path:"/",render:function(){return e.renderScreen(e.state.loggedIn,"/select",r.a.createElement(j,{playerName:e.state.player.playerName,handleSubmit:e.handleLoginSubmit,handleChange:e.handleLoginInput}))}}),r.a.createElement(d.b,{exact:!0,path:"/select",component:N}),r.a.createElement(d.b,{exact:!0,path:"/create",render:function(){return e.renderScreen(e.state.joinedRoom,"/lobby",r.a.createElement(O,{roomName:e.state.roomName,handleSubmit:e.handleRoomSubmit,handleChange:e.handleRoomInput}))}}),r.a.createElement(d.b,{exact:!0,path:"/join",render:function(){return e.renderScreen(e.state.joinedRoom,"/lobby",r.a.createElement(g,{rooms:e.state.rooms,joinRoom:e.handleJoinRoom}))}}),r.a.createElement(d.b,{exact:!0,path:"/lobby",render:function(){return r.a.createElement(R,{roomName:e.state.roomName,players:e.state.players,player:e.state.player,handlePlayerReady:e.handlePlayerReady})}}),r.a.createElement(d.b,{exact:!0,path:"/game",render:function(){return r.a.createElement(R,{emitter:e.emitter,listener:e.listener})}}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[50,1,2]]]);
//# sourceMappingURL=main.9367a0eb.chunk.js.map