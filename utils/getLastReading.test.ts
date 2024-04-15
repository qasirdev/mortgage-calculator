import getLastReading from './getLastReading';

describe('formatCurrency', () => {
  it('should return last reading', () => {
    const reading = getLastReading(`DATE,IUMABEDR
    31 Mar 2024,5.25`);

    expect(reading).toEqual('5.25');
  });
  it('should return last reading with zero intrest', () => {
    const reading = getLastReading(`DATE,IUMABEDR
    31 Mar 2024,0`);

    expect(reading).toEqual('0');
  });
  it('should return last reading from multiple readings', () => {
    const reading = getLastReading(`DATE,IUMABEDR
    31 Feb 2024,5.25
    31 Mar 2024,3.25`);

    expect(reading).toEqual('3.25');
  });

});
