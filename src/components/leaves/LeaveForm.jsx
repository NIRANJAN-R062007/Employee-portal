import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTodayDate, getDaysBetween } from '../../utils/dateUtils';

const EMPTY = { type: 'Sick', startDate: getTodayDate(), endDate: getTodayDate(), reason: '' };

export default function LeaveForm() {
  const { applyLeave } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(false);
  const days = getDaysBetween(form.startDate, form.endDate);
  const isValid = form.reason.trim() && form.startDate && form.endDate && form.endDate >= form.startDate;
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!isValid) return;
    applyLeave(form);
    setForm(EMPTY);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">Apply for Leave</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
          <select name="type" value={form.type} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sick</option><option>Casual</option><option>Earned</option>
          </select>
        </div>
        <div className="flex items-end">
          <div className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-xs text-blue-500 font-medium uppercase tracking-wide">Duration</p>
            <p className="text-2xl font-bold text-blue-700">{days}</p>
            <p className="text-xs text-blue-500">{days === 1 ? 'day' : 'days'}</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" name="endDate" value={form.endDate} min={form.startDate} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
        <textarea name="reason" value={form.reason} onChange={handleChange} rows={3}
          placeholder="Brief reason for leave..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button onClick={handleSubmit} disabled={!isValid}
        className="w-full py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        {saved ? '✓ Leave Applied!' : 'Submit Leave Request'}
      </button>
    </div>
  );
}
