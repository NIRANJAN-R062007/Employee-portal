import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, formatTime } from '../../utils/dateUtils';

const STATUS_BADGE = {
  Present: 'bg-green-100 text-green-700',
  Late: 'bg-yellow-100 text-yellow-700',
  Absent: 'bg-red-100 text-red-700',
};

export default function AttendanceHistory() {
  const { attendance } = useApp();
  const [filter, setFilter] = useState('All');
  const sorted = [...attendance].sort((a, b) => new Date(b.date) - new Date(a.date));
  const filtered = filter === 'All' ? sorted : sorted.filter((a) => a.status === filter);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800">Attendance History</h3>
        <div className="flex gap-2">
          {['All', 'Present', 'Late', 'Absent'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0
        ? <p className="text-gray-400 text-center py-10">No records found.</p>
        : <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Date', 'Clock In', 'Clock Out', 'Duration', 'Status'].map((h) => (
                    <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 font-medium uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const dur = r.clockIn && r.clockOut
                    ? `${Math.round((new Date(r.clockOut) - new Date(r.clockIn)) / 3600000 * 10) / 10}h` : '—';
                  return (
                    <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-3 text-gray-700 font-medium">{formatDate(r.date)}</td>
                      <td className="py-3 px-3 text-gray-600 font-mono">{formatTime(r.clockIn)}</td>
                      <td className="py-3 px-3 text-gray-600 font-mono">{formatTime(r.clockOut)}</td>
                      <td className="py-3 px-3 text-gray-500">{dur}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[r.status]}`}>{r.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>}
    </div>
  );
}
