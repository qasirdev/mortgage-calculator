export const formatDate =(date: Date): string => {
  const day = date.getDate(); // Day of the month
  const month = date.toLocaleString('default', { month: 'short' }); // Abbreviated month (e.g., 'Apr')
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const getPreviousMonthDate = (currentDate: Date): Date => {
  const previousMonth = new Date(currentDate);
  previousMonth.setMonth(currentDate.getMonth() - 1); // Subtract one month
  return previousMonth;
}

