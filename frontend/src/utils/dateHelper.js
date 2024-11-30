export const formatTime = (timestamp) => {
  const dateObj = new Date(timestamp);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(dateObj);
};
