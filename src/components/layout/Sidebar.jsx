import React from 'react';
import Avatar from '../ui/Avatar';

export default function Sidebar({ activeTab, setTab, currentUser, tabs, onLogout }) {
  return (
    <aside style={{ width: 216, background: '#0f172a', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px', borderBottom: '0.5px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, background: '#2563eb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <i className="ti ti-building" style={{ fontSize: 16, color: '#fff' }} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Employee Portal</div>
          <div style={{ fontSize: 10, color: '#475569' }}>Hechaar · Internal</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '8px 11px', borderRadius: 8, fontSize: 13,
              fontWeight: activeTab === t.id ? 500 : 400,
              background: activeTab === t.id ? 'rgba(37,99,235,.9)' : 'transparent',
              color: activeTab === t.id ? '#fff' : '#94a3b8',
              border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
            }}
          >
            <i className={`ti ${t.icon}`} style={{ fontSize: 15, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{t.label}</span>
            {t.badge && (
              <span style={{ background: '#ef4444', color: '#fff', borderRadius: 10, fontSize: 10, padding: '1px 5px', fontWeight: 700 }}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '8px 8px 4px', borderTop: '0.5px solid rgba(255,255,255,.07)' }}>
        <button
          onClick={onLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 11px', borderRadius: 8, fontSize: 13, color: '#64748b', background: 'transparent', border: 'none', cursor: 'pointer', width: '100%' }}
        >
          <i className="ti ti-logout" style={{ fontSize: 15 }} />
          Sign out
        </button>
      </div>

      {/* User */}
      <div style={{ padding: '12px 14px', borderTop: '0.5px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={currentUser.name} size={32} bg={currentUser.role === 'admin' ? '#7c3aed' : '#2563eb'} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.name}</div>
          <div style={{ fontSize: 10, color: '#475569' }}>{currentUser.role === 'admin' ? 'HR Admin' : 'Employee'}</div>
        </div>
      </div>
    </aside>
  );
}
