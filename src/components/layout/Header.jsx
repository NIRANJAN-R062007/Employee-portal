import React, { useState, useEffect } from 'react';
import Avatar from '../ui/Avatar';
import { formatDate } from '../../utils/dateUtils';

export default function Header({ activeTab, tabs, currentUser }) {
  const cur = tabs.find((t) => t.id === activeTab);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header style={{ background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#0f172a' }}>{cur?.label}</div>
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{formatDate(time)}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#94a3b8' }}>
          {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
        </span>
        <div style={{ width: '0.5px', height: 14, background: '#e2e8f0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Avatar name={currentUser.name} size={26} bg={currentUser.role === 'admin' ? '#7c3aed' : '#2563eb'} />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#64748b' }}>{currentUser.name.split(' ')[0]}</span>
        </div>
      </div>
    </header>
  );
}
