import React from 'react';

const VARIANTS = {
  primary:   { background: '#2563eb', color: '#fff', border: 'none' },
  secondary: { background: 'transparent', color: '#64748b', border: '0.5px solid #cbd5e1' },
  danger:    { background: '#fee2e2', color: '#dc2626', border: 'none' },
  success:   { background: '#dcfce7', color: '#16a34a', border: 'none' },
  ghost:     { background: 'transparent', color: '#94a3b8', border: 'none' },
};

const SIZES = {
  sm: { padding: '6px 14px', fontSize: 12 },
  md: { padding: '9px 18px', fontSize: 13 },
  lg: { padding: '12px 22px', fontSize: 14 },
};

export default function Btn({ children, onClick, disabled, variant = 'primary', size = 'md', full, style }) {
  return (
    <button
      onClick={disabled ? null : onClick}
      style={{
        ...SIZES[size],
        ...VARIANTS[variant],
        fontWeight: 500,
        borderRadius: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        width: full ? '100%' : undefined,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
