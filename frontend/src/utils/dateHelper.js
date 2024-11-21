export const formatTime = (timestamp) => {
  const dateObj = new Date(timestamp);
  const date = dateObj.toISOString().split('T')[0];
  const time = dateObj.toTimeString().split(' ')[0].slice(0, 5);
  return `${date} at ${time}`;
};

export const getCurrentDate = () => {
  const now = new Date();

  const year = now.getFullYear().toString().slice(2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} - ${hours}:${minutes}`;
};
