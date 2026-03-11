export function formatDate(date: string | undefined) {
  if (!date) {
    return '';
  }
  const selectedDate = new Date(date);
  const day = selectedDate.getUTCDate();
  selectedDate.setDate(day)
  return selectedDate.toLocaleDateString();
}
