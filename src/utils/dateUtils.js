export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

export const formatTime = (time) => {
  if (!time) return '--:--';
  return new Date(time).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
};

export const getTodayDate = () => new Date().toISOString().split('T')[0];
export const getNow = () => new Date().toISOString();

export const getDaysBetween = (start, end) =>
  Math.ceil(Math.abs(new Date(end) - new Date(start)) / 864e5) + 1;
