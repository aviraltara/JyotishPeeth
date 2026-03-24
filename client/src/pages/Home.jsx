import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Hand, Moon } from 'lucide-react';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-container"
    >
      <section className="hero" style={{ textAlign: 'center', margin: '4rem 0' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Discover Your Celestial Path</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Ancient Vedic wisdom meets modern technology. Explore your past, present, and future through our authentic astrological tools.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <Star size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
          <h3>Astrology Prediction</h3>
          <p style={{ margin: '1rem 0', color: 'var(--text-light)' }}>Get insights into your career, love, and health based on your birth details.</p>
          <Link to="/predict" className="btn-primary" style={{ display: 'inline-block' }}>Get Prediction</Link>
        </div>

        <div className="glass-card" style={{ textAlign: 'center' }}>
          <Hand size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
          <h3>Palm Reading</h3>
          <p style={{ margin: '1rem 0', color: 'var(--text-light)' }}>Upload images of your hands for instant personality and life trajectory analysis.</p>
          <Link to="/palm-reading" className="btn-primary" style={{ display: 'inline-block' }}>Read Palm</Link>
        </div>

        <div className="glass-card" style={{ textAlign: 'center' }}>
          <Moon size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
          <h3>Kundli Generator</h3>
          <p style={{ margin: '1rem 0', color: 'var(--text-light)' }}>Generate your authentic Vedic birth chart with detailed planetary positions.</p>
          <Link to="/kundli" className="btn-primary" style={{ display: 'inline-block' }}>Create Kundli</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
