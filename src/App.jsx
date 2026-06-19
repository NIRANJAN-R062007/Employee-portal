import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import AttendanceLogger from './components/attendance/AttendanceLogger';
import AttendanceHistory from './components/attendance/AttendanceHistory';
import ProgressForm from './components/progress/ProgressForm';
import ProgressList from './components/progress/ProgressList';
import LeaveForm from './components/leaves/LeaveForm';
import LeaveHistory from './components/leaves/LeaveHistory';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'progress', label: 'Daily Progress' },
  { id: 'leaves', label: 'Leave Requests' },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'attendance': return <div className="space-y-6"><AttendanceLogger /><AttendanceHistory /></div>;
      case 'progress': return <div className="space-y-6"><ProgressForm /><ProgressList /></div>;
      case 'leaves': return <div className="space-y-6"><LeaveForm /><LeaveHistory /></div>;
      default: return null;
    }
  };
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} tabs={TABS} />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

export default function App() {
  return <AppProvider><AppContent /></AppProvider>;
}
