import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, formatTime, getTodayDate, getDaysBetween } from '../../utils/dateUtils';
import { USERS } from '../../utils/constants';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Btn from '../ui/Btn';
import Avatar from '../ui/Avatar';
import EmptyState from '../ui/EmptyState';

const TH = ({ cols }) => (
  <thead>
    <tr>
      {cols.map((c) => (
        <th key={c} style={{ textAlign: 'left', padding: '8px 10px', fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '0.5px solid #f1f5f9', fontWeight: 500 }}>{c}</th>
      ))}
    </tr>
  </thead>
);

export default function AdminPanel({ showToast }) {
  const { attendance, progress, leaves, approveLeave, rejectLeave } = useApp();
  const [tab, setTab] = useState('leaves');

  const approve = (id) => { approveLeave(id); showToast('Leave approved ✓', 'success'); };
  const reject = (id) => { rejectLeave(id); showToast('Leave rejected', 'error'); };

  const pending = leaves.filter((l) => l.status === 'Pending');
  const today = getTodayDate();
  const presentToday = attendance.filter((a) => a.date === today && a.status === 'Present').length;
  const lateToday = attendance.filter((a) => a.date === today && a.status === 'Late').length;
  const employees = USERS.filter((u) => u.role === 'employee');

  const ATABS = [
    { id: 'leaves', label: 'Leave approvals', badge: pending.length },
    { id: 'attendance', label: 'All attendance' },
    { id: 'progress', label: 'All progress' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Employees', val: employees.length, icon: 'ti-users', bg: '#eff6ff', tc: '#1e40af' },
          { label: 'Pending leaves', val: pending.length, icon: 'ti-clock', bg: '#fff7ed', tc: '#9a3412' },
          { label: 'Present today', val: presentToday, icon: 'ti-user-check', bg: '#f0fdf4', tc: '#166534' },
          { label: 'Late today', val: lateToday, icon: 'ti-alert-triangle', bg: '#fef3c7', tc: '#92400e' },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: 12, padding: '16px 18px' }}>
            <i className={`ti ${s.icon}`} style={{ fontSize: 20, color: s.tc, display: 'block', marginBottom: 8 }} />
            <div style={{ fontSize: 26, fontWeight: 700, color: s.tc }}>{s.val}</div>
            <div style={{ fontSize: 11, color: s.tc, opacity: .7, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sub tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#f8fafc', padding: 4, borderRadius: 10, alignSelf: 'flex-start', border: '0.5px solid #f1f5f9' }}>
        {ATABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '7px 16px', borderRadius: 7, fontSize: 13, fontWeight: tab === t.id ? 500 : 400, background: tab === t.id ? '#fff' : 'transparent', color: tab === t.id ? '#0f172a' : '#94a3b8', border: tab === t.id ? '0.5px solid #e2e8f0' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            {t.label}
            {t.badge > 0 && <span style={{ background: '#ef4444', color: '#fff', borderRadius: 10, fontSize: 10, padding: '1px 6px', fontWeight: 700 }}>{t.badge}</span>}
          </button>
        ))}
      </div>

      {/* Leave approvals */}
      {tab === 'leaves' && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '0.5px solid #f1f5f9', fontSize: 14, fontWeight: 500, color: '#0f172a' }}>Leave requests</div>
          {leaves.length === 0 ? <div style={{ padding: 20 }}><EmptyState icon="ti-calendar-off" text="No leave requests yet." /></div> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <TH cols={['Employee', 'Type', 'Dates', 'Days', 'Reason', 'Status', 'Action']} />
                <tbody>
                  {leaves.map((l) => {
                    const u = USERS.find((x) => x.id === l.userId);
                    return (
                      <tr key={l.id} style={{ borderBottom: '0.5px solid #f8fafc' }}>
                        <td style={{ padding: '12px 10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar name={u?.name} size={26} /><span style={{ fontWeight: 500, color: '#0f172a' }}>{u?.name}</span></div></td>
                        <td style={{ padding: '12px 10px', color: '#64748b' }}>{l.type}</td>
                        <td style={{ padding: '12px 10px', color: '#94a3b8', fontSize: 12 }}>{formatDate(l.startDate)} → {formatDate(l.endDate)}</td>
                        <td style={{ padding: '12px 10px', color: '#64748b' }}>{getDaysBetween(l.startDate, l.endDate)}d</td>
                        <td style={{ padding: '12px 10px', color: '#94a3b8', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.reason}</td>
                        <td style={{ padding: '12px 10px' }}><Badge s={l.status} /></td>
                        <td style={{ padding: '12px 10px' }}>
                          {l.status === 'Pending' ? (
                            <div style={{ display: 'flex', gap: 6 }}>
                              <Btn onClick={() => approve(l.id)} variant="success" size="sm">Approve</Btn>
                              <Btn onClick={() => reject(l.id)} variant="danger" size="sm">Reject</Btn>
                            </div>
                          ) : <span style={{ fontSize: 12, color: '#94a3b8' }}>—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* All attendance */}
      {tab === 'attendance' && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '0.5px solid #f1f5f9', fontSize: 14, fontWeight: 500, color: '#0f172a' }}>All attendance records</div>
          {attendance.length === 0 ? <div style={{ padding: 20 }}><EmptyState icon="ti-calendar-x" text="No attendance records yet." /></div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <TH cols={['Employee', 'Date', 'Clock in', 'Clock out', 'Status']} />
              <tbody>
                {[...attendance].sort((a, b) => new Date(b.date) - new Date(a.date)).map((r) => {
                  const u = USERS.find((x) => x.id === r.userId);
                  return (
                    <tr key={r.id} style={{ borderBottom: '0.5px solid #f8fafc' }}>
                      <td style={{ padding: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar name={u?.name} size={24} /><span style={{ fontWeight: 500, color: '#0f172a', fontSize: 13 }}>{u?.name}</span></div></td>
                      <td style={{ padding: '10px', color: '#64748b' }}>{formatDate(r.date)}</td>
                      <td style={{ padding: '10px', color: '#64748b', fontFamily: 'monospace', fontSize: 12 }}>{formatTime(r.clockIn)}</td>
                      <td style={{ padding: '10px', color: '#64748b', fontFamily: 'monospace', fontSize: 12 }}>{formatTime(r.clockOut)}</td>
                      <td style={{ padding: '10px' }}><Badge s={r.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {/* All progress */}
      {tab === 'progress' && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '0.5px solid #f1f5f9', fontSize: 14, fontWeight: 500, color: '#0f172a' }}>All progress logs</div>
          {progress.length === 0 ? <div style={{ padding: 20 }}><EmptyState icon="ti-clipboard" text="No progress logged yet." /></div> : (
            <div>
              {[...progress].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((p) => {
                const u = USERS.find((x) => x.id === p.userId);
                return (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 20px', borderBottom: '0.5px solid #f8fafc' }}>
                    <Avatar name={u?.name} size={30} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{p.title}</span>
                        <Badge s={p.status} />
                      </div>
                      {p.description && <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 3 }}>{p.description}</div>}
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{u?.name} · {formatDate(p.date)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
