import { getRecentEvents } from './ScheduleRecord';
import moment from 'moment';

function createTime(day, past) {
  return past
    ? new Date().getTime() - day * 86400000
    : new Date().getTime() + day * 86400000;
}

describe('Testing getRecentEvents()', () => {
  it('should sort data from near date to far date', () => {
    const date1 = moment(createTime(10, true)).format('YYYY-MM-DD');
    const date2 = moment(createTime(8, true)).format('YYYY-MM-DD');
    const date3 = moment(createTime(5, true)).format('YYYY-MM-DD');
    const testEvents = [
      {
        extendedProps: { completed: true },
        start: date1,
      },
      {
        extendedProps: { completed: true },
        start: date2,
      },
      {
        extendedProps: { completed: true },
        start: date3,
      },
    ];

    const expectedValue = [
      {
        extendedProps: { completed: true },
        start: date3,
      },
      {
        extendedProps: { completed: true },
        start: date2,
      },
      {
        extendedProps: { completed: true },
        start: date1,
      },
    ];

    expect(getRecentEvents(testEvents)).toStrictEqual(expectedValue);
  });

  it('should exclude events with future date', () => {
    const date1 = moment(createTime(10, false)).format('YYYY-MM-DD');
    const date2 = moment(createTime(10, true)).format('YYYY-MM-DD');
    const date3 = moment(createTime(5, false)).format('YYYY-MM-DD');
    const testEvents = [
      {
        extendedProps: { completed: true },
        start: date1,
      },
      {
        extendedProps: { completed: true },
        start: date2,
      },
      {
        extendedProps: { completed: true },
        start: date3,
      },
    ];

    const expectedValue = [
      {
        extendedProps: { completed: true },
        start: date2,
      },
    ];
    expect(getRecentEvents(testEvents)).toStrictEqual(expectedValue);
  });

  it('should exclude events with date past than 30 days', () => {
    const date1 = moment(createTime(5, true)).format('YYYY-MM-DD');
    const date2 = moment(createTime(31, true)).format('YYYY-MM-DD');
    const date3 = moment(createTime(32, true)).format('YYYY-MM-DD');
    const testEvents = [
      {
        extendedProps: { completed: true },
        start: date1,
      },
      {
        extendedProps: { completed: true },
        start: date2,
      },
      {
        extendedProps: { completed: true },
        start: date3,
      },
    ];

    const expectedValue = [
      {
        extendedProps: { completed: true },
        start: date1,
      },
    ];
    expect(getRecentEvents(testEvents)).toStrictEqual(expectedValue);
  });
});
