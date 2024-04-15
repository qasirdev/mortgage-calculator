import { formatDate, getPreviousMonthDate } from './formatDate';

describe('formatCurrency', () => {
  it('should format the date with default format', () => {
    const currentDate = new Date('2024-04-15');
    const formattedDateto = formatDate(currentDate);

    const previousMonthDate = getPreviousMonthDate(currentDate); 
    const formattedDatefrom = formatDate(previousMonthDate);

    expect(formattedDateto).toEqual('15/Apr/2024');
    expect(formattedDatefrom).toEqual('15/Mar/2024');
  });

});
