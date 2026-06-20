import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Btn from '../ui/Btn';
import EmptyState from '../ui/EmptyState';

export default function ProgressPage() {
  const { myProgress, addProgress, updateProgress, deleteProgress } = useApp();
  const [form, setForm] = useState({ title: '', description: '', status: 'In Progress' });
  const [saved, setSaved] = useState(false);
  const [editId, setEditId] = useState(null);
  const [ef, setEf] = useState({});

  const submit = () => {
    if (!form.title.trim()) return;
    addProgress(form);
    setForm({ title: '', description: '', status: 'In Progress' });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const saveEdit = (id) => { updateProgress(id, ef); setEditId(null); };

  const grouped = myProgress.reduce((acc, p) => {
    (acc[p.date] = acc[p.date] || []).push(p); return acc;
  }, {});
  const dates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#0f172a', marginBottom: 18 }}>Log daily progress</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Task title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Completed FastAPI endpoint for Gemini integration" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} placeholder="What did you work on? Any blockers?" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 5 }}>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={{ width: 'auto' }}>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <Btn onClick={submit} disabled={!form.title.trim()} full size="lg">{saved ? '✓ Logged!' : 'Log progress'}</Btn>
        </div>
      </Card>

      <Card>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#0f172a', marginBottom: 18 }}>Progress log</div>
        {dates.length === 0 ? <EmptyState icon="ti-clipboard" text="No entries yet. Log your first task above." /> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {dates.map((date) => (
              <div key={date}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{formatDate(date)}</span>
                  <div style={{ flex: 1, height: '0.5px', background: '#f1f5f9' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {grouped[date].map((p) => editId === p.id ? (
                    <div key={p.id} style={{ border: '0.5px solid #93c5fd', borderRadius: 10, padding: 14, background: '#eff6ff', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <input value={ef.title} onChange={(e) => setEf({ ...ef, title: e.target.value })} />
                      <textarea value={ef.description} onChange={(e) => setEf({ ...ef, description: e.target.value })} rows={2} />
                      <select value={ef.status} onChange={(e) => setEf({ ...ef, status: e.target.value })} style={{ width: 'auto' }}>
                        <option>In Progress</option><option>Completed</option>
                      </select>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Btn onClick={() => saveEdit(p.id)}>Save</Btn>
                        <Btn onClick={() => setEditId(null)} variant="secondary">Cancel</Btn>
                      </div>
                    </div>
                  ) : (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', border: '0.5px solid #f1f5f9', borderRadius: 10, padding: '12px 14px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: p.description ? 4 : 0 }}>
                          <span style={{ fontSize: 13, fontWeight: 500, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                          <Badge s={p.status} />
                        </div>
                        {p.description && <div style={{ fontSize: 12, color: '#94a3b8' }}>{p.description}</div>}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginLeft: 12, flexShrink: 0 }}>
                        <button onClick={() => { setEditId(p.id); setEf({ title: p.title, description: p.description, status: p.status }); }} style={{ fontSize: 12, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => deleteProgress(p.id)} style={{ fontSize: 12, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
