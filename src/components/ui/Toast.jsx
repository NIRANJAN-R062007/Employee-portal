import React, { useEffect } from 'react';

const STYLES = {
  success: { bg: '#f0fdf4', color: '#166534', icon: 'ti-circle-check' },
  error:   { bg: '#fef2f2', color: '#991b1b', icon: 'ti-circle-x' },
  info:    { bg: '#eff6ff', color: '#1e40af', icon: 'ti-info-circle' },
};

export default function Toast({ msg, type = 'info', onClose }) {
  const s = STYLES[type] || STYLES.info;
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      background: s.bg, color: s.color,
      padding: '12px 16px', borderRadius: 10, fontSize: 13, fontWeight: 500,
      zIndex: 9999, display: 'flex', alignItems: 'center', gap: 10,
      border: `0.5px solid ${s.color}33`, maxWidth: 300,
      boxShadow: '0 4px 16px rgba(0,0,0,.08)',
    }}>
      <i className={`ti ${s.icon}`} style={{ fontSize: 16 }} />
      <span style={{ flex: 1 }}>{msg}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: s.color, cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
    </div>
  );
}
