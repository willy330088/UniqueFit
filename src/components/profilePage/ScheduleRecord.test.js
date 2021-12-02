import { getRecentEvents } from './ScheduleRecord';
import moment from 'moment';

describe('Testing getRecentEvents()', () => {
  it('should sort data from near date to far date', () => {
    const date1 = moment(new Date().getTime() - 10 * 86400000).format(
      'YYYY-MM-DD'
    );
    const date2 = moment(new Date().getTime() - 8 * 86400000).format(
      'YYYY-MM-DD'
    );
    const date3 = moment(new Date().getTime() - 5 * 86400000).format(
      'YYYY-MM-DD'
    );
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
    const date1 = moment(new Date().getTime() + 10 * 86400000).format(
      'YYYY-MM-DD'
    );
    const date2 = moment(new Date().getTime() - 10 * 86400000).format(
      'YYYY-MM-DD'
    );
    const date3 = moment(new Date().getTime() + 5 * 86400000).format(
      'YYYY-MM-DD'
    );
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
    const date1 = moment(new Date().getTime() - 5 * 86400000).format(
      'YYYY-MM-DD'
    );
    const date2 = moment(new Date().getTime() - 31 * 86400000).format(
      'YYYY-MM-DD'
    );
    const date3 = moment(new Date().getTime() - 32 * 86400000).format(
      'YYYY-MM-DD'
    );
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
