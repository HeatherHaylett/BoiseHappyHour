import dayjs, { Dayjs } from 'dayjs';
import { Venue, Day, HappyHourWindow } from '@/types';

const DAY_ORDER: Day[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_LABELS: Record<Day, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
};
const dayjsDayToDay: Record<number, Day> = {
  0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat',
};

const parseTime = (t: string): Dayjs => dayjs(`2000-01-01 ${t}`, 'YYYY-MM-DD HH:mm');

function isWindowActive(window: HappyHourWindow, day: Day, check: Dayjs): boolean {
  if (!window.days.includes(day)) return false;
  const start = parseTime(window.start);
  const end = parseTime(window.end);
  if (end.isAfter(start)) return !check.isBefore(start) && check.isBefore(end);
  // midnight-spanning window: e.g. 23:00–01:00
  return check.isAfter(start) || check.isBefore(end);
}

export function formatDays(days: Day[]): string {
  const sorted = [...days].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
  if (sorted.length === 1) return DAY_LABELS[sorted[0]];
  const isConsecutive = sorted.every(
    (d, i) => i === 0 || DAY_ORDER.indexOf(d) === DAY_ORDER.indexOf(sorted[i - 1]) + 1,
  );
  if (isConsecutive) return `${DAY_LABELS[sorted[0]]} – ${DAY_LABELS[sorted[sorted.length - 1]]}`;
  return sorted.map((d) => DAY_LABELS[d]).join(', ');
}

export function formatWindowTime(start: string, end: string): string {
  const startD = parseTime(start);
  const endD = parseTime(end);
  const fmt = (d: Dayjs) => (d.minute() === 0 ? d.format('h') : d.format('h:mm'));
  const startAP = startD.format('A');
  const endAP = endD.format('A');
  return startAP === endAP
    ? `${fmt(startD)} – ${fmt(endD)} ${endAP}`
    : `${fmt(startD)} ${startAP} – ${fmt(endD)} ${endAP}`;
}

export function isVenueOpenNow(venue: Venue): boolean {
  const now = dayjs();
  const check = parseTime(now.format('HH:mm'));
  const today = dayjsDayToDay[now.day()];
  return venue.schedule.some((w) => isWindowActive(w, today, check));
}

export function timeRemainingInWindow(venue: Venue): string | null {
  const now = dayjs();
  const check = parseTime(now.format('HH:mm'));
  const today = dayjsDayToDay[now.day()];

  const activeWindow = venue.schedule.find((w) => isWindowActive(w, today, check));
  if (!activeWindow) return null;

  const [endH, endM] = activeWindow.end.split(':').map(Number);
  let endActual = now.hour(endH).minute(endM).second(0).millisecond(0);

  // midnight-spanning: if end < start the window crosses midnight; end is tomorrow if we're pre-midnight
  const isMidnightSpanning = activeWindow.end < activeWindow.start;
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
