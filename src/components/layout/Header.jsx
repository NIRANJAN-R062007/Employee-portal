import React, { useState, useEffect } from 'react';
import { formatDate } from '../../utils/dateUtils';

export default function Header({ activeTab, tabs }) {
  const currentTab = tabs.find((t) => t.id === activeTab);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{currentTab?.label}</h2>
        <p className="text-sm text-gray-400">{formatDate(time)}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-mono text-gray-500">
          {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Online
        </span>
      </div>
    </header>
  );
}
