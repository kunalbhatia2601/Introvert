import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';


import "./App.css"
import Events from './components/Events';
import PerEvent from './components/PerEvent';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Chat from './components/Chat';
import ChatBot from './components/ChatBot';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            
          <Route path="/event/:id" element={<PerEvent />} />
          <Route path="/chatbot" element={<ChatBot />} />

            
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/signup" element={<Signup />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;