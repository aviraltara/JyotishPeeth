import React, { useState } from 'react';
import { motion } from 'framer-motion';

const KundliGenerator = () => {
  const [formData, setFormData] = useState({ name: '', dob: '', time: '', place: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/kundli', {
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Vedic Kundli Chart</h2>
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
            <input type="time" style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }} onChange={e => setFormData({...formData, time: e.target.value})} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Place of Birth</label>
            <input type="text" style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }} onChange={e => setFormData({...formData, place: e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Calculating Houses...' : 'Generate Kundli'}
          </button>
        </form>
      ) : (
        <div className="glass-card">
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>Chart for {formData.name}</h3>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}><strong>Lagna (Ascendant):</strong> {result.lagna}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {result.houses.map(h => (
              <div key={h.house} style={{ border: '1px solid var(--accent)', padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.5)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>House {h.house}</h4>
                <p style={{ fontWeight: 600 }}>{h.sign}</p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--primary)' }}>
                  {h.planets.length > 0 ? h.planets.join(', ') : '-'}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button onClick={() => setResult(null)} className="btn-primary">Generate Another</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default KundliGenerator;
