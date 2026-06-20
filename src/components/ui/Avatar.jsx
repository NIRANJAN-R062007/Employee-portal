import React from 'react';

const COLORS = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706'];

export default function Avatar({ name, size = 34, bg }) {
  const color = bg || (name ? COLORS[name.charCodeAt(0) % COLORS.length] : '#6b7280');
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: size * 0.38,
      fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>
      {name ? name[0].toUpperCase() : '?'}
    </div>
  );
}
