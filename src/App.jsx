import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import AttendancePage from './components/attendance/AttendancePage';
import ProgressPage from './components/progress/ProgressPage';
import LeavePage from './components/leaves/LeavePage';
import AdminPanel from './components/admin/AdminPanel';
import ProfilePage from './components/profile/ProfilePage';
import Toast from './components/ui/Toast';

const EMP_TABS = [
  { id: 'dashboard',  label: 'Dashboard',      icon: 'ti-layout-dashboard' },
  { id: 'attendance', label: 'Attendance',      icon: 'ti-clock' },
  { id: 'progress',   label: 'Daily progress',  icon: 'ti-clipboard-check' },
  { id: 'leaves',     label: 'Leave requests',  icon: 'ti-calendar-off' },
  { id: 'profile',    label: 'Profile',         icon: 'ti-user' },
];

function PortalApp() {
  const { currentUser, setCurrentUser, leaves } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type) => setToast({ msg, type });

  if (!currentUser) {
    return (
      <LoginPage
        onLogin={(u) => { setCurrentUser(u); setActiveTab('dashboard'); }}
      />
    );
  }

  const pendingCount = leaves.filter((l) => l.status === 'Pending').length;

  const ADMIN_TABS = [
    { id: 'dashboard',  label: 'Dashboard',      icon: 'ti-layout-dashboard' },
    { id: 'attendance', label: 'Attendance',      icon: 'ti-clock' },
    { id: 'progress',   label: 'Daily progress',  icon: 'ti-clipboard-check' },
    { id: 'leaves',     label: 'Leave requests',  icon: 'ti-calendar-off' },
    { id: 'admin',      label: 'Admin panel',     icon: 'ti-shield', badge: pendingCount || undefined },
    { id: 'profile',    label: 'Profile',         icon: 'ti-user' },
  ];

  const tabs = currentUser.role === 'admin' ? ADMIN_TABS : EMP_TABS;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':  return <Dashboard setActiveTab={setActiveTab} />;
      case 'attendance': return <AttendancePage />;
      case 'progress':   return <ProgressPage />;
      case 'leaves':     return <LeavePage />;
      case 'admin':      return <AdminPanel showToast={showToast} />;
      case 'profile':    return <ProfilePage />;
      default:           return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f8fafc' }}>
      <Sidebar
        activeTab={activeTab}
        setTab={setActiveTab}
        currentUser={currentUser}
        tabs={tabs}
        onLogout={() => { setCurrentUser(null); setActiveTab('dashboard'); }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header activeTab={activeTab} tabs={tabs} currentUser={currentUser} />
        <main style={{ flex: 1, overflowY: 'auto', padding: 22 }}>
          {renderContent()}
        </main>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PortalApp />
    </AppProvider>
  );
}
