import React, { useState } from 'react';
import {socket} from '../App';
import '../App.css';


function EntryForm() {
    const [username, setUsername] = useState('');
    const saveUsername = () => {
        // Tell the server your username
        console.log(username)
        socket.emit('add user', username);
      }
    return (
        <div className="Form">
            <p>Username</p>
            <input onChange={event => setUsername(event.target.value)} />
            <button onClick={ saveUsername }>Submit</button>
        </div>
      );
}

export default EntryForm;