import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, getTodayDate, getDaysBetween } from '../../utils/dateUtils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Btn from '../ui/Btn';
import EmptyState from '../ui/EmptyState';
import FilterPills from '../ui/FilterPills';

export default function LeavePage() {
  const { myLeaves, applyLeave, cancelLeave } = useApp();
  const today = getTodayDate();
  const [form, setForm] = useState({ type: 'Sick', startDate: today, endDate: today, reason: '' });
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState('All');

  const days = getDaysBetween(form.startDate, form.endDate);
  const valid = form.reason.trim() && form.endDate >= form.startDate;

  const submit = () => {
    if (!valid) return;
    applyLeave(form);
    setForm({ type: 'Sick', startDate: today, endDate: today, reason: '' });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const sorted = [...myLeaves].sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));
  const rows = filter === 'All' ? sorted : sorted.filter((l) => l.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#0f172a', marginBottom: 18 }}>Apply for leave</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Leave type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Sick</option><option>Casual</option><option>Earned</option>
            </select>
          </div>
          <div style={{ background: '#eff6ff', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 12, border: '0.5px solid #bfdbfe' }}>
            <div style={{ fontSize: 11, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Duration</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#1d4ed8', lineHeight: 1.1 }}>{days}</div>
            <div style={{ fontSize: 11, color: '#1e40af' }}>{days === 1 ? 'day' : 'days'}</div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Start date</label>
            <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>End date</label>
            <input type="date" value={form.endDate} min={form.startDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Reason *</label>
          <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} rows={3} placeholder="Brief reason for your leave..." />
        </div>
        <Btn onClick={submit} disabled={!valid} full size="lg">{saved ? '✓ Leave applied!' : 'Submit leave request'}</Btn>
      </Card>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#0f172a' }}>Leave history</div>
          <FilterPills options={['All', 'Pending', 'Approved', 'Rejected', 'Cancelled']} value={filter} onChange={setFilter} />
        </div>
        {rows.length === 0 ? <EmptyState icon="ti-calendar-off" text="No leave requests found" /> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rows.map((l) => (
              <div key={l.id} style={{ border: '0.5px solid #f1f5f9', borderRadius: 10, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{l.type} leave</span>
                    <Badge s={l.status} />
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>· {getDaysBetween(l.startDate, l.endDate)}d</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{formatDate(l.startDate)} → {formatDate(l.endDate)}</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>{l.reason}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Applied: {formatDate(l.appliedOn)}</div>
                </div>
                {l.status === 'Pending' && (
                  <button onClick={() => cancelLeave(l.id)} style={{ marginLeft: 12, fontSize: 12, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>Cancel</button>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
