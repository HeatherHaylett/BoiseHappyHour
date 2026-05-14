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

export function timeRemainingInWindow(venue: Venue): string | null {
  const now = dayjs();
  const currentDay = dayjsDayToDay[now.day()];
  const nowBase = dayjs(`2000-01-01 ${now.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');

  const activeWindow = venue.schedule.find((window) => {
    if (!window.days.includes(currentDay)) return false;
    const start = dayjs(`2000-01-01 ${window.start}`, 'YYYY-MM-DD HH:mm');
    const end = dayjs(`2000-01-01 ${window.end}`, 'YYYY-MM-DD HH:mm');
    const isMidnightSpanning = !end.isAfter(start);
    return isMidnightSpanning
      ? nowBase.isAfter(start) || nowBase.isBefore(end)
      : nowBase.isAfter(start) && nowBase.isBefore(end);
  });

  if (!activeWindow) return null;

  const start = dayjs(`2000-01-01 ${activeWindow.start}`, 'YYYY-MM-DD HH:mm');
  const end = dayjs(`2000-01-01 ${activeWindow.end}`, 'YYYY-MM-DD HH:mm');
  const isMidnightSpanning = !end.isAfter(start);

  const [endH, endM] = activeWindow.end.split(':').map(Number);
  let endActual = now.hour(endH).minute(endM).second(0).millisecond(0);

  // midnight-spanning and we're in the pre-midnight portion — end is tomorrow
  if (isMidnightSpanning && now.isAfter(endActual)) {
    endActual = endActual.add(1, 'day');
  }

  const diffMinutes = endActual.diff(now, 'minute');
  if (diffMinutes <= 0) return null;

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
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
