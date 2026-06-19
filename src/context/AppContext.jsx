import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [attendance, setAttendance] = useLocalStorage('ep_attendance', []);
  const [progress, setProgress] = useLocalStorage('ep_progress', []);
  const [leaves, setLeaves] = useLocalStorage('ep_leaves', []);

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendance.find((a) => a.date === today) || null;
  };

  const clockIn = () => {
    const today = new Date().toISOString().split('T')[0];
    if (attendance.find((a) => a.date === today)) return;
    const now = new Date();
    const threshold = new Date();
    threshold.setHours(9, 30, 0, 0);
    const status = now > threshold ? 'Late' : 'Present';
    setAttendance([
      ...attendance,
      { id: Date.now(), date: today, clockIn: now.toISOString(), clockOut: null, status },
    ]);
  };

  const clockOut = () => {
    const today = new Date().toISOString().split('T')[0];
    setAttendance(
      attendance.map((a) =>
        a.date === today ? { ...a, clockOut: new Date().toISOString() } : a
      )
    );
  };

  const addProgress = (entry) => {
    setProgress([
      {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        ...entry,
      },
      ...progress,
    ]);
  };

  const updateProgress = (id, updates) =>
    setProgress(progress.map((p) => (p.id === id ? { ...p, ...updates } : p)));

  const deleteProgress = (id) =>
    setProgress(progress.filter((p) => p.id !== id));

  const applyLeave = (leave) => {
    setLeaves([
      {
        id: Date.now(),
        appliedOn: new Date().toISOString(),
        status: 'Pending',
        ...leave,
      },
      ...leaves,
    ]);
  };

  const cancelLeave = (id) =>
    setLeaves(
      leaves.map((l) =>
        l.id === id && l.status === 'Pending' ? { ...l, status: 'Cancelled' } : l
      )
    );

  return (
    <AppContext.Provider
      value={{
        attendance, progress, leaves,
        clockIn, clockOut, getTodayAttendance,
        addProgress, updateProgress, deleteProgress,
        applyLeave, cancelLeave,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
