import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, formatTime } from '../../utils/dateUtils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Btn from '../ui/Btn';
import EmptyState from '../ui/EmptyState';
import FilterPills from '../ui/FilterPills';

export default function AttendancePage() {
  const { myAttendance, clockIn, clockOut, getTodayAttendance } = useApp();
  const todayA = getTodayAttendance();
  const [filter, setFilter] = useState('All');
  const sorted = [...myAttendance].sort((a, b) => new Date(b.date) - new Date(a.date));
  const rows = filter === 'All' ? sorted : sorted.filter((a) => a.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#0f172a', marginBottom: 20 }}>Today's attendance</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Clock in', val: formatTime(todayA?.clockIn) },
            { label: 'Clock out', val: formatTime(todayA?.clockOut) },
            { label: 'Status', status: todayA?.status || 'Absent' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '16px', background: '#f8fafc', borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{item.label}</div>
              {item.status
                ? <Badge s={item.status} />
                : <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'monospace', color: '#0f172a' }}>{item.val}</div>
              }
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn onClick={clockIn} disabled={!!todayA} full size="lg">
            <i className="ti ti-login" style={{ fontSize: 15 }} /> Clock In
          </Btn>
          <Btn onClick={clockOut} disabled={!todayA || !!todayA.clockOut} variant="secondary" full size="lg">
            <i className="ti ti-logout" style={{ fontSize: 15 }} /> Clock Out
          </Btn>
        </div>
        {todayA && !todayA.clockOut && <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 12 }}>You're clocked in — don't forget to clock out.</p>}
        {todayA?.clockOut && <p style={{ textAlign: 'center', fontSize: 12, color: '#16a34a', marginTop: 12 }}>✓ Day complete. Great work!</p>}
      </Card>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#0f172a' }}>Attendance history</div>
          <FilterPills options={['All', 'Present', 'Late', 'Absent']} value={filter} onChange={setFilter} />
        </div>
        {rows.length === 0 ? <EmptyState icon="ti-calendar-x" text="No records found" /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Date', 'Clock in', 'Clock out', 'Duration', 'Status'].map((c) => (
                  <th key={c} style={{ textAlign: 'left', padding: '8px 10px', fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '0.5px solid #f1f5f9', fontWeight: 500 }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const dur = r.clockIn && r.clockOut ? Math.round((new Date(r.clockOut) - new Date(r.clockIn)) / 36e5 * 10) / 10 + 'h' : '—';
                return (
                  <tr key={r.id} style={{ borderBottom: '0.5px solid #f8fafc' }}>
                    <td style={{ padding: '11px 10px', fontWeight: 500, color: '#0f172a' }}>{formatDate(r.date)}</td>
                    <td style={{ padding: '11px 10px', fontFamily: 'monospace', color: '#64748b', fontSize: 12 }}>{formatTime(r.clockIn)}</td>
                    <td style={{ padding: '11px 10px', fontFamily: 'monospace', color: '#64748b', fontSize: 12 }}>{formatTime(r.clockOut)}</td>
                    <td style={{ padding: '11px 10px', color: '#94a3b8' }}>{dur}</td>
                    <td style={{ padding: '11px 10px' }}><Badge s={r.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
