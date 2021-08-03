import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import EntryForm from './component/EntryForm';

export const socket = io('localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState([""]);
  const [userCount, setUserCount] = useState([]);
  // let array = [];

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('message', data => {
      setLastMessage(data);
    });
    socket.on('user count', data => {
      console.log("User Joined: " + JSON.stringify(data));
      setUserCount(data.userCount);
    });
    socket.on('user joined', data => {
      setLastMessage(data);
      console.log("Joined!!!!");
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
      socket.off('user count');
      socket.off('user joined');
    };
  });

  const sendMessage = () => {
    console.log(message);
    socket.emit('new message', message);
  }

    const numbers = lastMessage;
    console.log(numbers);
    // const Messages = numbers.map((number) =>
    //   <div key={number} className="Msg">{number}</div>
    // );
    // for (var i = 0, l = data.messages.length; i < l; i++) {
    //   var obj = data.messages[i];
    //   // ...
    // }
    // styleChange('--bg-ans', colourList[i]);
    // function styleChange(variable, value) {
    //   document.documentElement.style.setProperty(variable, value);
    // }
  return (
    <div className="App">
      <EntryForm/>
      <header className="App-header">
        <h1>TEST</h1>
        <p>Connected: { '' + isConnected }</p>
        <p>Users Online: {userCount} </p>
        {/* <div className="Messages">{Messages}</div> */}
        <input onChange={event => setMessage(event.target.value)} />
        <button onClick={ sendMessage }>Send Message!</button>
      </header>
    </div>
  );
}


export default App;