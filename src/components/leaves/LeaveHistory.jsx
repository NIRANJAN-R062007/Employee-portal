import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, getDaysBetween } from '../../utils/dateUtils';

const STATUS_BADGE = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
  Cancelled: 'bg-gray-100 text-gray-500',
};

export default function LeaveHistory() {
  const { leaves, cancelLeave } = useApp();
  const [filter, setFilter] = useState('All');
  const sorted = [...leaves].sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));
  const filtered = filter === 'All' ? sorted : sorted.filter((l) => l.status === filter);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800">Leave History</h3>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0
        ? <p className="text-gray-400 text-center py-10">No leave requests found.</p>
        : <div className="space-y-3">
            {filtered.map((l) => (
              <div key={l.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-800">{l.type} Leave</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[l.status]}`}>{l.status}</span>
                      <span className="text-xs text-gray-400">· {getDaysBetween(l.startDate, l.endDate)} {getDaysBetween(l.startDate, l.endDate) === 1 ? 'day' : 'days'}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{formatDate(l.startDate)} → {formatDate(l.endDate)}</p>
                    <p className="text-sm text-gray-600">{l.reason}</p>
                    <p className="text-xs text-gray-400 mt-1">Applied: {formatDate(l.appliedOn)}</p>
                  </div>
                  {l.status === 'Pending' && (
                    <button onClick={() => cancelLeave(l.id)} className="ml-4 shrink-0 text-xs text-red-500 hover:text-red-700 hover:underline">Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>}
    </div>
  );
}
