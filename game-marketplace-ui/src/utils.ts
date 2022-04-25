export const timeDiffCalc = (dateFuture: number, dateNow: number) => {
  if (dateFuture < dateNow) return 'Sale Expired';
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = '';
  if (days > 0) {
    difference += days === 1 ? `${days}D ` : `${days}D `;
  }

  difference += hours === 0 || hours === 1 ? `${hours}H ` : `${hours}H `;

  difference += minutes === 0 || hours === 1 ? `${minutes}M` : `${minutes}M`;

  return difference;
};
