import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const PalmReading = () => {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    setLoading(true);
    const formData = new FormData();
    for (let file of files) formData.append('hands', file);
    try {
      const res = await fetch('http://localhost:5000/api/palm-reading', {
        method: 'POST',
        body: formData
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
    if (!bullets) return null;
    let list = [];
    if (Array.isArray(bullets)) {
      list = bullets;
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
    list = list.map(s => s.replace(/^(?:<[^>]+>|[\s\W])*([a-z])/i, (match, letter) => match.slice(0, -1) + letter.toUpperCase()));

    return (
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.05rem' }}>
        {list.map((b, i) => (
          <li key={i} style={{ marginBottom: '1rem', paddingLeft: '0.5rem' }} dangerouslySetInnerHTML={{ __html: b }}></li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Mystic Palm Reading</h2>
      {!result ? (
        <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ padding: '3rem 1rem', border: '2px dashed var(--accent)', borderRadius: '8px', background: 'rgba(255,255,255,0.5)' }}>
            <Upload size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ marginBottom: '1rem' }}>Upload images of both your left and right palms for deep analysis</p>
            <input type="file" multiple accept="image/*" onChange={e => setFiles(e.target.files)} style={{ margin: '0 auto' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={loading || files.length === 0}>
            {loading ? 'Analyzing the Lines...' : 'Read My Palms'}
          </button>
        </form>
      ) : (
        <div className="glass-card" style={{ textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)', fontFamily: 'Cinzel', fontSize: '2rem' }}>Palmistry Insights</h3>
          
          <div style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(198, 169, 98, 0.5)', borderRadius: '12px', boxShadow: 'inset 0 0 20px rgba(198,169,98,0.1)' }}>
            
            {/* Left Hand Section */}
            <div style={{ marginBottom: '3rem' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem', fontFamily: 'Cinzel', fontSize: '1.6rem', borderBottom: '2px solid rgba(198, 169, 98, 0.3)', paddingBottom: '0.5rem' }}>The Left Hand</h4>
              <p style={{ color: 'var(--text-light)', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: result.leftHand?.represents || '' }}></p>
              <h5 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontFamily: 'Cinzel', fontSize: '1.2rem' }}>Line Patterns & Readings:</h5>
              {renderBullets(result.leftHand?.details)}
            </div>

            {/* Right Hand Section */}
            <div>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem', fontFamily: 'Cinzel', fontSize: '1.6rem', borderBottom: '2px solid rgba(198, 169, 98, 0.3)', paddingBottom: '0.5rem' }}>The Right Hand</h4>
              <p style={{ color: 'var(--text-light)', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: result.rightHand?.represents || '' }}></p>
              <h5 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontFamily: 'Cinzel', fontSize: '1.2rem' }}>Line Patterns & Readings:</h5>
              {renderBullets(result.rightHand?.details)}
            </div>

          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => {setResult(null); setFiles([])}} className="btn-primary">Analyze Another Reading</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default PalmReading;
