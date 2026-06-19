import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatTime, formatDate } from '../../utils/dateUtils';

const STATUS_COLORS = {
  Present: 'bg-green-50 border-green-200 text-green-700',
  Late: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  Absent: 'bg-red-50 border-red-200 text-red-700',
};

const BADGE = {
  Completed: 'bg-green-100 text-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-gray-100 text-gray-500',
};

export default function Dashboard({ setActiveTab }) {
  const { attendance, progress, leaves, getTodayAttendance } = useApp();
  const todayRecord = getTodayAttendance();
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = progress.filter((p) => p.date === today);
  const completedToday = todayTasks.filter((p) => p.status === 'Completed').length;
  const pendingLeaves = leaves.filter((l) => l.status === 'Pending').length;

  const stats = [
    {
      label: "Today's Status", tab: 'attendance',
      value: todayRecord?.status ?? 'Not Logged',
      sub: todayRecord ? `In: ${formatTime(todayRecord.clockIn)}` : 'Go to Attendance',
      colorKey: todayRecord?.status ?? 'Absent',
    },
    { label: 'Tasks Today', tab: 'progress', value: `${completedToday} / ${todayTasks.length}`, sub: 'Completed / Total', colorKey: null },
    { label: 'Pending Leaves', tab: 'leaves', value: pendingLeaves, sub: 'Awaiting approval', colorKey: null },
    { label: 'Days Logged', tab: 'attendance', value: attendance.length, sub: 'Total attendance', colorKey: null },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <button key={i} onClick={() => setActiveTab(s.tab)}
            className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-md hover:-translate-y-0.5 ${s.colorKey ? STATUS_COLORS[s.colorKey] : 'bg-white border-gray-200 text-gray-700'}`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm font-medium mt-1">{s.label}</div>
            <div className="text-xs opacity-60 mt-0.5">{s.sub}</div>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Recent Progress</h3>
            <button onClick={() => setActiveTab('progress')} className="text-xs text-blue-600 hover:underline">View all</button>
          </div>
          {progress.length === 0
            ? <p className="text-gray-400 text-sm py-4 text-center">No progress logged yet.</p>
            : <ul className="space-y-2">{progress.slice(0, 5).map(p => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 truncate flex-1">{p.title}</span>
                  <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${BADGE[p.status]}`}>{p.status}</span>
                </li>))}</ul>}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Leave Requests</h3>
            <button onClick={() => setActiveTab('leaves')} className="text-xs text-blue-600 hover:underline">View all</button>
          </div>
          {leaves.length === 0
            ? <p className="text-gray-400 text-sm py-4 text-center">No leave requests yet.</p>
            : <ul className="space-y-2">{leaves.slice(0, 5).map(l => (
                <li key={l.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{l.type} · {formatDate(l.startDate)}</span>
                  <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${BADGE[l.status]}`}>{l.status}</span>
                </li>))}</ul>}
        </div>
      </div>
    </div>
  );
}
