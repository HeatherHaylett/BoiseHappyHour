import { FilterState, Venue } from '@/types';
import { defaultFilters } from '@/types';
import { filterVenues } from './filters';

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

const withFilters = (overrides: Partial<FilterState>): FilterState => ({
  ...defaultFilters,
  ...overrides,
});

describe('filterVenues', () => {
  describe('search query', () => {
    const venues = [
      makeVenue({ id: '1', name: 'Barbarian Brewing', address: '100 Main St' }),
      makeVenue({ id: '2', name: 'Boise Fry Company', address: '200 Broad St' }),
    ];

    it('returns all venues when query is empty', () => {
      expect(filterVenues(venues, withFilters({ searchQuery: '' }))).toHaveLength(2);
    });

    it('filters by venue name case-insensitively', () => {
      const result = filterVenues(venues, withFilters({ searchQuery: 'barbarian' }));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('filters by address', () => {
      const result = filterVenues(venues, withFilters({ searchQuery: 'Broad' }));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });
  });

  describe('tags filter', () => {
    const venues = [
      makeVenue({ id: '1', tags: ['dog_outside', 'patio'] }),
      makeVenue({ id: '2', tags: ['live_music'] }),
      makeVenue({ id: '3', tags: [] }),
    ];

    it('returns all venues when no tags are selected', () => {
      expect(filterVenues(venues, withFilters({ tags: [] }))).toHaveLength(3);
    });

    it('excludes venues without any matching tag', () => {
      const result = filterVenues(venues, withFilters({ tags: ['dog_outside'] }));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });
  });

  describe('hasFoodSpecials filter', () => {
    const venues = [
      makeVenue({ id: '1', hasFoodSpecials: true }),
      makeVenue({ id: '2', hasFoodSpecials: false }),
    ];

    it('excludes venues without food specials when filter is active', () => {
      const result = filterVenues(venues, withFilters({ hasFoodSpecials: true }));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('returns all venues when filter is inactive', () => {
      expect(filterVenues(venues, withFilters({ hasFoodSpecials: false }))).toHaveLength(2);
    });
  });

  describe('dealTypes filter', () => {
    const venues = [
      makeVenue({ id: '1', dealTypes: ['BOGO'] }),
      makeVenue({ id: '2', dealTypes: ['dollar_off', 'percent_off'] }),
      makeVenue({ id: '3', dealTypes: ['flat_price'] }),
    ];

    it('returns only venues matching selected deal types', () => {
      const result = filterVenues(venues, withFilters({ dealTypes: ['BOGO'] }));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('returns all venues when no deal types are selected', () => {
      expect(filterVenues(venues, withFilters({ dealTypes: [] }))).toHaveLength(3);
    });
  });

  describe('openNow filter', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    it('excludes venues not open at current time', () => {
      jest.setSystemTime(new Date('2025-01-14T15:00:00')); // Tue 3pm
      const venues = [
        makeVenue({ id: '1', schedule: [{ days: ['tue'], start: '14:00', end: '17:00' }] }),
        makeVenue({ id: '2', schedule: [{ days: ['tue'], start: '18:00', end: '21:00' }] }),
      ];
      const result = filterVenues(venues, withFilters({ openNow: true }));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });
  });

  describe('multiple filters', () => {
    const venues = [
      makeVenue({ id: '1', name: 'Bar A', hasFoodSpecials: true, tags: ['patio'] }),
      makeVenue({ id: '2', name: 'Bar B', hasFoodSpecials: false, tags: ['patio'] }),
      makeVenue({ id: '3', name: 'Bar C', hasFoodSpecials: true, tags: [] }),
    ];

    it('ANDs all active filters together', () => {
      const result = filterVenues(venues, withFilters({ hasFoodSpecials: true, tags: ['patio'] }));
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('returns the full list when all filters are cleared', () => {
      expect(filterVenues(venues, defaultFilters)).toHaveLength(3);
    });
  });
});
