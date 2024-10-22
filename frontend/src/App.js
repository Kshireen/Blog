import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Register from './components/Register';
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <div className="App  min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-200">
        <Header />
        <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8 mt-[33vh] p-4">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
