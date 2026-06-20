import React, { useState } from 'react';
import { USERS } from '../utils/constants';
import Badge from '../components/ui/Badge';
import Btn from '../components/ui/Btn';
import Avatar from '../components/ui/Avatar';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (!email || !pass) return;
    setLoading(true); setErr('');
    setTimeout(() => {
      const u = USERS.find((x) => x.email === email && x.password === pass);
      if (u) onLogin(u);
      else { setErr('Invalid email or password'); setLoading(false); }
    }, 500);
  };

  const features = [
    'Clock in/out with late detection',
    'Log daily tasks and progress',
    'Apply and track leave requests',
    'Admin panel for HR management',
  ];

  const demos = [
    { role: 'employee', email: 'niranjan@demo.com', pass: 'ninja123', name: 'Niranjan R' },
    { role: 'admin', email: 'admin@demo.com', pass: 'admin123', name: 'HR Admin' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left branding panel */}
      <div style={{ width: '44%', background: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 360, height: 360, background: 'rgba(37,99,235,.07)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 240, height: 240, background: 'rgba(37,99,235,.05)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 52 }}>
            <div style={{ width: 36, height: 36, background: '#2563eb', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ti ti-building" style={{ fontSize: 18, color: '#fff' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#f8fafc' }}>Employee Portal</div>
              <div style={{ fontSize: 11, color: '#475569' }}>Hechaar · Internal</div>
            </div>
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: '#f8fafc', lineHeight: 1.2, marginBottom: 14 }}>Track. Log.<br />Grow.</div>
          <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.8, marginBottom: 40 }}>Your all-in-one internal platform for attendance, progress, and leave management.</p>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(37,99,235,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="ti ti-check" style={{ fontSize: 10, color: '#60a5fa' }} />
              </div>
              <span style={{ fontSize: 13, color: '#64748b' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#f8fafc' }}>
        <div style={{ width: '100%', maxWidth: 370 }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>Welcome back</div>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 30 }}>Sign in to continue</p>

          <div style={{ background: '#fff', borderRadius: 14, padding: 28, border: '0.5px solid #e2e8f0', marginBottom: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@demo.com" onKeyDown={(e) => e.key === 'Enter' && login()} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Password</label>
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter your password" onKeyDown={(e) => e.key === 'Enter' && login()} />
              </div>
            </div>
            {err && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: '9px 13px', borderRadius: 8, fontSize: 12, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                <i className="ti ti-alert-circle" style={{ fontSize: 14 }} />{err}
              </div>
            )}
            <Btn onClick={login} disabled={loading || !email || !pass} full size="lg">
              {loading ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className="ti ti-loader" style={{ fontSize: 14 }} />Signing in…</span> : 'Sign in'}
            </Btn>
          </div>

          {/* Demo credentials */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', border: '0.5px solid #e2e8f0' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Demo accounts — click to fill</div>
            {demos.map((d) => (
              <div key={d.role} onClick={() => { setEmail(d.email); setPass(d.pass); }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 11px', borderRadius: 8, cursor: 'pointer', marginBottom: 6, background: '#f8fafc', border: '0.5px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar name={d.name} size={26} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#0f172a' }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.email}</div>
                  </div>
                </div>
                <Badge s={d.role} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
