import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import Profile from './pages/profile';
import ShowAccount from './pages/showAccount';
import Header from './components/header';
import Footer from './components/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:accountId" element={<ShowAccount />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);