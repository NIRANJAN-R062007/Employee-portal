import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';

const STATUS_BADGE = {
  Completed: 'bg-green-100 text-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
};

export default function ProgressList() {
  const { progress, updateProgress, deleteProgress } = useApp();
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const grouped = progress.reduce((acc, p) => { (acc[p.date] = acc[p.date] || []).push(p); return acc; }, {});
  const dates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
  const startEdit = (p) => { setEditId(p.id); setEditForm({ title: p.title, description: p.description, status: p.status }); };
  const saveEdit = (id) => { updateProgress(id, editForm); setEditId(null); };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">Progress Log</h3>
      {dates.length === 0
        ? <p className="text-gray-400 text-center py-10">No entries yet.</p>
        : <div className="space-y-6">
            {dates.map((date) => (
              <div key={date}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{formatDate(date)}</p>
                <div className="space-y-3">
                  {grouped[date].map((p) => editId === p.id
                    ? <div key={p.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50 space-y-3">
                        <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          rows={2} className="w-full px-3 py-2 border border-gray-200 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>In Progress</option><option>Completed</option>
                        </select>
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit(p.id)} className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Save</button>
                          <button onClick={() => setEditId(null)} className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300">Cancel</button>
                        </div>
                      </div>
                    : <div key={p.id} className="flex items-start justify-between border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-800 truncate">{p.title}</p>
                            <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[p.status]}`}>{p.status}</span>
                          </div>
                          {p.description && <p className="text-xs text-gray-500 mt-1">{p.description}</p>}
                        </div>
                        <div className="flex gap-2 ml-4 shrink-0">
                          <button onClick={() => startEdit(p)} className="text-xs text-blue-600 hover:underline">Edit</button>
                          <button onClick={() => deleteProgress(p.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                        </div>
                      </div>
                  )}
                </div>
              </div>
            ))}
          </div>}
    </div>
  );
}
