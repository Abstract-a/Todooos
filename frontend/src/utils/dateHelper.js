export const formatTime = (timestamp) => {
  const dateObj = new Date(timestamp);
  const date = dateObj.toISOString().split('T')[0];
  const time = dateObj.toTimeString().split(' ')[0].slice(0, 5);
  return `${date} at ${time}`;
};
