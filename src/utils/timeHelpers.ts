import dayjs from 'dayjs';
import { Venue, Day } from '@/types';

const dayjsDayToDay: Record<number, Day> = {
  0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat',
};

export function formatScheduleWindow(window: { start: string; end: string }): string {
  if (window.start === '00:00' && window.end === '23:59') return 'All Day';
  const fmt = (t: string) => dayjs(`2000-01-01 ${t}`, 'YYYY-MM-DD HH:mm').format('h:mm A');
  return `${fmt(window.start)}–${fmt(window.end)}`;
}

export function isVenueOpenNow(venue: Venue): boolean {
  const now = dayjs();
  const currentDay = dayjsDayToDay[now.day()];
  const check = dayjs(`2000-01-01 ${now.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');

  return venue.schedule.some((window) => {
    if (!window.days.includes(currentDay)) return false;

    const start = dayjs(`2000-01-01 ${window.start}`, 'YYYY-MM-DD HH:mm');
    const end = dayjs(`2000-01-01 ${window.end}`, 'YYYY-MM-DD HH:mm');

    if (end.isAfter(start)) {
      return check.isAfter(start) && check.isBefore(end);
    }
    // midnight-spanning window: e.g. 23:00–01:00
    return check.isAfter(start) || check.isBefore(end);
  });
}
