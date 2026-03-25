import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PredictionForm = () => {
  const [formData, setFormData] = useState({ name: '', dob: '', time: '', place: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://jyotishpeeth.onrender.com';
      const res = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderBullets = (bullets) => {
    let list = [];
    if (Array.isArray(bullets)) {
      list = bullets;
      // If the model gave an array of 1 long string, force it to split
      if (list.length === 1 && list[0].length > 100) {
        list = list[0].split(/(?:\.\s+|\n+)/).filter(s => s.trim().length > 5);
      }
    } else if (typeof bullets === 'string') {
      list = bullets.split(/[\n•-]+/).filter(s => s.trim().length > 5);
      if (list.length === 1) {
        list = bullets.split(/(?:\.\s+)/).filter(s => s.trim().length > 5);
      }
    }

    list = list.map(s => s.trim()).map(s => s.endsWith('.') || s.length < 5 ? s : s + '.');
    
    // Capitalize the first letter found, skipping any opening HTML tags like <b> or spaces
    list = list.map(s => s.replace(/^(?:<[^>]+>|[\s\W])*([a-z])/i, (match, letter) => match.slice(0, -1) + letter.toUpperCase()));

    return (
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '2.5rem', color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.05rem' }}>
        {list.map((b, i) => (
          <li key={i} style={{ marginBottom: '1rem', paddingLeft: '0.5rem' }} dangerouslySetInnerHTML={{ __html: b }}></li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: '750px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Seek Your Prediction</h2>
      {!result ? (
        <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
            <input type="text" style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Date of Birth</label>
            <input type="date" style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }} onChange={e => setFormData({...formData, dob: e.target.value})} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Time of Birth</label>
            <input type="time" style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }} onChange={e => setFormData({...formData, time: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Place of Birth</label>
            <input type="text" style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }} onChange={e => setFormData({...formData, place: e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Consulting the Stars...' : 'Reveal Destiny'}
          </button>
        </form>
      ) : (
        <div className="glass-card" style={{ textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>Your Reading</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.2rem' }}><strong>Rashi:</strong> <span style={{ color: 'var(--accent)' }}>{result.rashi}</span></p>
            <p style={{ fontSize: '1.2rem' }}><strong>Nakshatra:</strong> <span style={{ color: 'var(--accent)' }}>{result.nakshatra}</span></p>
          </div>
          
          <div style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(198, 169, 98, 0.5)', borderRadius: '12px', boxShadow: 'inset 0 0 20px rgba(198,169,98,0.1)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '1.2rem', fontFamily: 'Cinzel', fontSize: '1.5rem', borderBottom: '2px solid rgba(198, 169, 98, 0.3)', paddingBottom: '0.5rem' }}>Career Path</h4>
            {renderBullets(result.career)}

            <h4 style={{ color: 'var(--primary)', marginBottom: '1.2rem', fontFamily: 'Cinzel', fontSize: '1.5rem', borderBottom: '2px solid rgba(198, 169, 98, 0.3)', paddingBottom: '0.5rem' }}>Health Canvas</h4>
            {renderBullets(result.health)}

            <h4 style={{ color: 'var(--primary)', marginBottom: '1.2rem', fontFamily: 'Cinzel', fontSize: '1.5rem', borderBottom: '2px solid rgba(198, 169, 98, 0.3)', paddingBottom: '0.5rem' }}>Love & Stars</h4>
            {renderBullets(result.love)}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setResult(null)} className="btn-primary">Seek Another Reading</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default PredictionForm;
