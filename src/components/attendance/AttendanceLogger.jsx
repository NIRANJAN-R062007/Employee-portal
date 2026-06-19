import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatTime } from '../../utils/dateUtils';

const STATUS_STYLE = {
  Present: 'bg-green-100 text-green-700 border border-green-200',
  Late: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Absent: 'bg-red-100 text-red-700 border border-red-200',
};

export default function AttendanceLogger() {
  const { getTodayAttendance, clockIn, clockOut } = useApp();
  const record = getTodayAttendance();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">Today's Attendance</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Clock In', val: record?.clockIn ? formatTime(record.clockIn) : '--:--', isStatus: false },
          { label: 'Clock Out', val: record?.clockOut ? formatTime(record.clockOut) : '--:--', isStatus: false },
          { label: 'Status', val: null, status: record?.status ?? 'Absent' },
        ].map((item, i) => (
          <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{item.label}</p>
            {item.status
              ? <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_STYLE[item.status]}`}>{item.status}</span>
              : <p className="text-2xl font-bold text-gray-800 font-mono">{item.val}</p>}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={clockIn} disabled={!!record}
          className="flex-1 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Clock In
        </button>
        <button onClick={clockOut} disabled={!record || !!record.clockOut}
          className="flex-1 py-3 rounded-lg font-medium text-white bg-gray-700 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Clock Out
        </button>
      </div>
      {record && !record.clockOut && <p className="text-xs text-center text-gray-400 mt-3">You're clocked in. Don't forget to clock out.</p>}
      {record?.clockOut && <p className="text-xs text-center text-green-600 mt-3">✓ Day complete. See you tomorrow!</p>}
    </div>
  );
}
