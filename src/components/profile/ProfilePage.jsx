import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Btn from '../ui/Btn';

export default function ProfilePage() {
  const { currentUser, setCurrentUser, myAttendance, myProgress, myLeaves } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: currentUser.name, dept: currentUser.dept, phone: currentUser.phone || '' });

  const rate = myAttendance.length
    ? Math.round(myAttendance.filter((a) => a.status === 'Present').length / myAttendance.length * 100)
    : 0;
  const done = myProgress.filter((p) => p.status === 'Completed').length;
  const approved = myLeaves.filter((l) => l.status === 'Approved').length;
  const roleColor = currentUser.role === 'admin' ? '#7c3aed' : '#2563eb';

  const stats = [
    { label: 'Attendance rate', val: rate + '%', icon: 'ti-calendar-check', bg: '#eff6ff', tc: '#1e40af' },
    { label: 'Tasks done', val: done, icon: 'ti-clipboard-check', bg: '#f0fdf4', tc: '#166534' },
    { label: 'Leaves approved', val: approved, icon: 'ti-beach', bg: '#fff7ed', tc: '#9a3412' },
    { label: 'Days logged', val: myAttendance.length, icon: 'ti-chart-bar', bg: '#faf5ff', tc: '#6b21a8' },
  ];

  const save = () => { setCurrentUser({ ...currentUser, ...form }); setEditing(false); };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: roleColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: '#fff' }}>
              {currentUser.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#0f172a', marginBottom: 5 }}>{currentUser.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Badge s={currentUser.role} />
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{currentUser.dept}</span>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Joined {formatDate(currentUser.joined)}</div>
            </div>
          </div>
          <Btn onClick={() => { setEditing(!editing); if (editing) setForm({ name: currentUser.name, dept: currentUser.dept, phone: currentUser.phone || '' }); }} variant="secondary" size="sm">
            {editing ? 'Cancel' : 'Edit profile'}
          </Btn>
        </div>

        {editing ? (
          <div style={{ borderTop: '0.5px solid #f1f5f9', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 13 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
              {[['Full name', 'name'], ['Phone', 'phone'], ['Department', 'dept']].map(([label, key]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>{label}</label>
                  <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Email</label>
                <input value={currentUser.email} disabled />
              </div>
            </div>
            <Btn onClick={save} full>Save changes</Btn>
          </div>
        ) : (
          <div style={{ borderTop: '0.5px solid #f1f5f9', paddingTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            {[
              { label: 'Email', val: currentUser.email, icon: 'ti-mail' },
              { label: 'Phone', val: currentUser.phone || '—', icon: 'ti-phone' },
              { label: 'Department', val: currentUser.dept, icon: 'ti-building' },
              { label: 'Employee ID', val: 'EMP-00' + currentUser.id, icon: 'ti-id' },
            ].map((f) => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderBottom: '0.5px solid #f8fafc' }}>
                <i className={`ti ${f.icon}`} style={{ fontSize: 15, color: '#94a3b8', width: 18 }} />
                <div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{f.val}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <i className={`ti ${s.icon}`} style={{ fontSize: 22, color: s.tc, display: 'block', marginBottom: 8 }} />
            <div style={{ fontSize: 22, fontWeight: 700, color: s.tc }}>{s.val}</div>
            <div style={{ fontSize: 11, color: s.tc, opacity: .7, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
