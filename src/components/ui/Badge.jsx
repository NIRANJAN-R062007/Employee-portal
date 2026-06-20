import React from 'react';
import { STATUS_BG, STATUS_COLOR } from '../../utils/constants';

export default function Badge({ s }) {
  return (
    <span style={{
      background: STATUS_BG[s] || '#f1f5f9',
      color: STATUS_COLOR[s] || '#374151',
      padding: '2px 9px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      display: 'inline-block',
    }}>
      {s}
    </span>
  );
}
