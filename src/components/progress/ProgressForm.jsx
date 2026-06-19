import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const EMPTY = { title: '', description: '', status: 'In Progress' };

export default function ProgressForm() {
  const { addProgress } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!form.title.trim()) return;
    addProgress(form);
    setForm(EMPTY);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">Log Daily Progress</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
          <input name="title" value={form.title} onChange={handleChange}
            placeholder="e.g. Completed Supabase schema migration"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3}
            placeholder="What did you work on? Any blockers?"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <button onClick={handleSubmit} disabled={!form.title.trim()}
          className="w-full py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          {saved ? '✓ Logged!' : 'Log Progress'}
        </button>
      </div>
    </div>
  );
}
