export const calculateQueue = (appointments, avgTime = 10) => {
  const position = appointments.length + 1;

  const tokenNumber = position;

  const waitingTime = position === 1 ? 0 : (position - 1) * avgTime;

  return {
    queuePosition: position,
    tokenNumber,
    waitingTime,
  };
};