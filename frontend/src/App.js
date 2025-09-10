import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; // Import professional styling

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when a new message arrives
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off('receive_message');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    socket.emit('send_message', { message });
    setMessage('');
  };

  return (
    <div className="app-container">
      <div className="chat-box">
        {/* Optional: App Name / Logo */}
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Chat App</h2>

        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className="message">
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
