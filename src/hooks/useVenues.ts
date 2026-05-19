import { useMemo } from 'react';
import { FilterState, Venue } from '@/types';
import { filterVenues } from '@/utils/filters';
import venues from '../../data/venues.json';

const allVenues = venues as Venue[];

export function useVenues(filters: FilterState): Venue[] {
  return useMemo(() => filterVenues(allVenues, filters), [filters]);
}
