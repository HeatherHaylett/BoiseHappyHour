import dayjs from 'dayjs';
import { Venue, Day } from '@/types';

const dayjsDayToDay: Record<number, Day> = {
  0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat',
};

export function isVenueOpenNow(venue: Venue): boolean {
  const now = dayjs();
  const currentDay = dayjsDayToDay[now.day()];
  if (!venue.happyHourDays.includes(currentDay)) return false;

  const start = dayjs(`2000-01-01 ${venue.happyHourStart}`, 'YYYY-MM-DD HH:mm');
  const end = dayjs(`2000-01-01 ${venue.happyHourEnd}`, 'YYYY-MM-DD HH:mm');
  const check = dayjs(`2000-01-01 ${now.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');

  return check.isAfter(start) && check.isBefore(end);
}
