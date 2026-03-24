import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Moon, Sun, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  return (
    <div className="app-container">
      <header className="header temple-border">
        <Link to="/" className="header-logo">
          <Sun color="#DC143C" size={32} />
          <h1>JyotishPeeth</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/predict">Prediction</Link>
          <Link to="/palm-reading">Palm Reading</Link>
          <Link to="/kundli">Kundli</Link>
        </nav>
      </header>
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>

      <footer className="footer temple-border">
        <div className="footer-quote">
          <Star color="#C6A962" size={24} />
          <p>Awaken your destiny</p>
          <Star color="#C6A962" size={24} />
        </div>
        <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
          © 2026 JyotishPeeth. All rights predicted.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
