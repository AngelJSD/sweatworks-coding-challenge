export function formatDate(date: string | undefined) {
  if (!date) {
    return '';
  }
  const selectedDate = new Date(date);
  return `${selectedDate.getUTCMonth() + 1}/${selectedDate.getUTCDate()}/${selectedDate.getUTCFullYear()}`;
}
