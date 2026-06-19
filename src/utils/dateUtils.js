export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatTime = (time) => {
  if (!time) return '--:--';
  return new Date(time).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const getTodayDate = () => new Date().toISOString().split('T')[0];

export const getAttendanceStatus = (clockInTime) => {
  if (!clockInTime) return 'Absent';
  const clockIn = new Date(clockInTime);
  const threshold = new Date(clockIn);
  threshold.setHours(9, 30, 0, 0);
  return clockIn > threshold ? 'Late' : 'Present';
};

export const getDaysBetween = (start, end) => {
  const diff = Math.abs(new Date(end) - new Date(start));
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
};
