import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getTodayDate, getNow } from '../utils/dateUtils';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [attendance, setAttendance] = useLocalStorage('ep_attendance', []);
  const [progress, setProgress] = useLocalStorage('ep_progress', []);
  const [leaves, setLeaves] = useLocalStorage('ep_leaves', []);

  const myAttendance = attendance.filter((a) => a.userId === currentUser?.id);
  const myProgress = progress.filter((p) => p.userId === currentUser?.id);
  const myLeaves = leaves.filter((l) => l.userId === currentUser?.id);

  // Attendance
  const clockIn = () => {
    const today = getTodayDate();
    if (attendance.find((a) => a.userId === currentUser.id && a.date === today)) return;
    const now = new Date(), th = new Date();
    th.setHours(9, 30, 0, 0);
    setAttendance([...attendance, {
      id: Date.now(), userId: currentUser.id,
      date: today, clockIn: getNow(), clockOut: null,
      status: now > th ? 'Late' : 'Present',
    }]);
  };

  const clockOut = () => {
    const today = getTodayDate();
    setAttendance(attendance.map((a) =>
      a.userId === currentUser.id && a.date === today ? { ...a, clockOut: getNow() } : a
    ));
  };

  const getTodayAttendance = () => {
    const today = getTodayDate();
    return attendance.find((a) => a.userId === currentUser?.id && a.date === today) || null;
  };

  // Progress
  const addProgress = (entry) => {
    setProgress([{
      id: Date.now(), userId: currentUser.id,
      date: getTodayDate(), createdAt: getNow(), ...entry,
    }, ...progress]);
  };

  const updateProgress = (id, updates) =>
    setProgress(progress.map((p) => (p.id === id ? { ...p, ...updates } : p)));

  const deleteProgress = (id) => setProgress(progress.filter((p) => p.id !== id));

  // Leaves
  const applyLeave = (leave) => {
    setLeaves([{
      id: Date.now(), userId: currentUser.id,
      userName: currentUser.name, appliedOn: getNow(),
      status: 'Pending', ...leave,
    }, ...leaves]);
  };

  const cancelLeave = (id) =>
    setLeaves(leaves.map((l) =>
      l.id === id && l.status === 'Pending' ? { ...l, status: 'Cancelled' } : l
    ));

  // Admin actions
  const approveLeave = (id) =>
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status: 'Approved' } : l)));

  const rejectLeave = (id) =>
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status: 'Rejected' } : l)));

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      attendance, progress, leaves,
      myAttendance, myProgress, myLeaves,
      clockIn, clockOut, getTodayAttendance,
      addProgress, updateProgress, deleteProgress,
      applyLeave, cancelLeave, approveLeave, rejectLeave,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
