import { Venue } from '@/types';
import { formatDays, isVenueOpenNow } from './timeHelpers';

// 2025-01-14 is a Tuesday
const TUE = (time: string) => new Date(`2025-01-14T${time}:00`);
const WED = (time: string) => new Date(`2025-01-15T${time}:00`);

const makeVenue = (overrides: Partial<Venue> = {}): Venue => ({
  id: 'test',
  name: 'Test Venue',
  address: '123 Main St',
  dealDescription: '$5 pints',
  dealTypes: ['dollar_off'],
  hasFoodSpecials: false,
  lastVerified: '2025-01-01',
  schedule: [],
  tags: [],
  ...overrides,
});

const tuesdayWindow = { days: ['tue'] as Venue['schedule'][0]['days'], start: '14:00', end: '17:00' };

describe('formatDays', () => {
  it('returns the label for a single day', () => {
    expect(formatDays(['mon'])).toBe('Mon');
  });

  it('returns a range for consecutive days', () => {
    expect(formatDays(['mon', 'tue', 'wed'])).toBe('Mon – Wed');
  });

  it('returns a comma list for non-consecutive days', () => {
    expect(formatDays(['mon', 'wed', 'fri'])).toBe('Mon, Wed, Fri');
  });
});

describe('isVenueOpenNow', () => {
  beforeEach(() => { jest.useFakeTimers(); });
  afterEach(() => { jest.useRealTimers(); });

  describe('single window', () => {
    it('returns true when inside the window', () => {
      jest.setSystemTime(TUE('15:00'));
      expect(isVenueOpenNow(makeVenue({ schedule: [tuesdayWindow] }))).toBe(true);
    });

    it('returns true at exactly the first minute of happy hour', () => {
      jest.setSystemTime(TUE('14:00'));
      expect(isVenueOpenNow(makeVenue({ schedule: [tuesdayWindow] }))).toBe(true);
    });

    it('returns true at exactly the last minute of happy hour', () => {
      jest.setSystemTime(TUE('16:59'));
      expect(isVenueOpenNow(makeVenue({ schedule: [tuesdayWindow] }))).toBe(true);
    });

    it('returns false one minute before happy hour starts', () => {
      jest.setSystemTime(TUE('13:59'));
      expect(isVenueOpenNow(makeVenue({ schedule: [tuesdayWindow] }))).toBe(false);
    });

    it('returns false one minute after happy hour ends', () => {
      jest.setSystemTime(TUE('17:01'));
      expect(isVenueOpenNow(makeVenue({ schedule: [tuesdayWindow] }))).toBe(false);
    });

    it('returns false when today is not in the window', () => {
      jest.setSystemTime(TUE('15:00'));
      const venue = makeVenue({ schedule: [{ days: ['mon', 'wed'], start: '14:00', end: '17:00' }] });
      expect(isVenueOpenNow(venue)).toBe(false);
    });

    it('returns false when schedule is empty', () => {
      jest.setSystemTime(TUE('15:00'));
      expect(isVenueOpenNow(makeVenue({ schedule: [] }))).toBe(false);
    });
  });

  describe('multiple windows', () => {
    const venue = makeVenue({
      schedule: [
        { days: ['tue'], start: '12:00', end: '14:00' },
        { days: ['tue'], start: '16:00', end: '18:00' },
      ],
    });

    it('returns true when time falls in the first window', () => {
      jest.setSystemTime(TUE('13:00'));
      expect(isVenueOpenNow(venue)).toBe(true);
    });

    it('returns true when time falls in the second window', () => {
      jest.setSystemTime(TUE('17:00'));
      expect(isVenueOpenNow(venue)).toBe(true);
    });

    it('returns false when time falls between two windows', () => {
      jest.setSystemTime(TUE('15:00'));
      expect(isVenueOpenNow(venue)).toBe(false);
    });
  });

  describe('midnight-spanning window (e.g. 23:00–01:00)', () => {
    it('returns true when time is after start (before midnight)', () => {
      jest.setSystemTime(TUE('23:30'));
      const venue = makeVenue({ schedule: [{ days: ['tue'], start: '23:00', end: '01:00' }] });
      expect(isVenueOpenNow(venue)).toBe(true);
    });

    it('returns true when time is before end (after midnight)', () => {
      jest.setSystemTime(WED('00:30'));
      const venue = makeVenue({ schedule: [{ days: ['wed'], start: '23:00', end: '01:00' }] });
      expect(isVenueOpenNow(venue)).toBe(true);
    });

    it('returns false when time is between end and start', () => {
      jest.setSystemTime(TUE('14:00'));
      const venue = makeVenue({ schedule: [{ days: ['tue'], start: '23:00', end: '01:00' }] });
      expect(isVenueOpenNow(venue)).toBe(false);
    });
  });
});
