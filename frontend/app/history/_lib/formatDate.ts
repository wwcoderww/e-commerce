export default function (startDate: string, adjust: number) {
  const date = new Date(startDate);
  date.setUTCDate(date.getUTCDate() + adjust);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
