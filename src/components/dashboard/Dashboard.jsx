import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, formatTime, getTodayDate } from '../../utils/dateUtils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';

export default function Dashboard({ setActiveTab }) {
  const { myAttendance, myProgress, myLeaves, getTodayAttendance } = useApp();
  const todayA = getTodayAttendance();
  const today = getTodayDate();
  const todayP = myProgress.filter((p) => p.date === today);
  const done = todayP.filter((p) => p.status === 'Completed').length;
  const pending = myLeaves.filter((l) => l.status === 'Pending').length;
  const hr = new Date().getHours();
  const greeting = hr < 12 ? 'Morning' : hr < 17 ? 'Afternoon' : 'Evening';

  const stats = [
    { label: "Today's status", val: todayA?.status || 'Not logged', sub: todayA ? 'In: ' + formatTime(todayA.clockIn) : 'Go to Attendance', tab: 'attendance', bg: todayA?.status === 'Present' ? '#f0fdf4' : todayA?.status === 'Late' ? '#fef3c7' : '#fef2f2', tc: todayA?.status === 'Present' ? '#166534' : todayA?.status === 'Late' ? '#92400e' : '#991b1b', icon: 'ti-clock' },
    { label: 'Tasks today', val: `${done}/${todayP.length}`, sub: 'Completed / Total', tab: 'progress', bg: '#eff6ff', tc: '#1e40af', icon: 'ti-clipboard-check' },
    { label: 'Pending leaves', val: pending, sub: 'Awaiting approval', tab: 'leaves', bg: '#fff7ed', tc: '#9a3412', icon: 'ti-calendar-off' },
    { label: 'Days logged', val: myAttendance.length, sub: 'Total attendance', tab: 'attendance', bg: '#faf5ff', tc: '#6b21a8', icon: 'ti-chart-bar' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Greeting */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#0f172a', marginBottom: 3 }}>
          Good {greeting} 👋
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>{formatDate(new Date())} · Here's your overview</div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 14 }}>
        {stats.map((s, i) => (
          <div key={i} onClick={() => setActiveTab(s.tab)}
            style={{ background: s.bg, borderRadius: 14, padding: '18px 18px 16px', cursor: 'pointer', border: '0.5px solid transparent' }}>
            <i className={`ti ${s.icon}`} style={{ fontSize: 20, color: s.tc, display: 'block', marginBottom: 12 }} />
            <div style={{ fontSize: 22, fontWeight: 700, color: s.tc, marginBottom: 4 }}>{s.val}</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: s.tc, opacity: .85 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: s.tc, opacity: .55, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>Recent progress</span>
            <button onClick={() => setActiveTab('progress')} style={{ fontSize: 12, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
          </div>
          {myProgress.length === 0
            ? <EmptyState icon="ti-clipboard" text="No progress logged yet" />
            : myProgress.slice(0, 5).map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '0.5px solid #f1f5f9' }}>
                  <span style={{ fontSize: 13, color: '#64748b', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 10 }}>{p.title}</span>
                  <Badge s={p.status} />
                </div>
              ))
          }
        </Card>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>Leave requests</span>
            <button onClick={() => setActiveTab('leaves')} style={{ fontSize: 12, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
          </div>
          {myLeaves.length === 0
            ? <EmptyState icon="ti-calendar-off" text="No leave requests yet" />
            : myLeaves.slice(0, 5).map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '0.5px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{l.type} leave</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{formatDate(l.startDate)}</div>
                  </div>
                  <Badge s={l.status} />
                </div>
              ))
          }
        </Card>
      </div>
    </div>
  );
}
