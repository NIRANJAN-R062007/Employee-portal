import React from 'react';

export default function FilterPills({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {options.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{
            padding: '4px 11px', borderRadius: 20, fontSize: 11, fontWeight: 500,
            border: '0.5px solid #cbd5e1',
            background: value === f ? '#0f172a' : '#f8fafc',
            color: value === f ? '#fff' : '#64748b',
            cursor: 'pointer',
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
