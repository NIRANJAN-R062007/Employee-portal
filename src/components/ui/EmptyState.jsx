import React from 'react';

export default function EmptyState({ icon, text }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
      <i className={`ti ${icon}`} style={{ fontSize: 36, display: 'block', marginBottom: 10, opacity: 0.25 }} />
      <div style={{ fontSize: 13 }}>{text}</div>
    </div>
  );
}
