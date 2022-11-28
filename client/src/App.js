import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");


function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(true);

  const joinRoom = () => {
    if(username !== "" || room !== "") {
      socket.emit("join_room", room);
      setShow(false);
    }
  }

  return (
    <div className="App">
      {
      show? (
      <div className='login'>
        <div className='fields'>
          <label>Username:</label>
          <input type="text" onChange={e => {setUsername(e.target.value)}}/>
        </div>
        <div className='fields'>
          <label>Room:</label>
          <input type="text" onChange={e => {setRoom(e.target.value)}}/>
        </div>
        <button onClick={joinRoom}>Join Room</button>
      </div>
      ) : <Chat socket={socket} username={username} room={room}/>
      }
    </div>
  );
}

export default App;
