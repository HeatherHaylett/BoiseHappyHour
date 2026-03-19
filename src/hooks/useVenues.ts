import { useMemo } from 'react';
import { Venue, FilterState } from '@/types';
import { isVenueOpenNow } from '@/utils/timeHelpers';
import venues from '../../data/venues.json';

const allVenues = venues as Venue[];

export function useVenues(filters: FilterState): Venue[] {
  return useMemo(() => allVenues.filter((venue) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      if (!venue.name.toLowerCase().includes(q) && !venue.address.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filters.openNow && !isVenueOpenNow(venue)) return false;
    if (filters.dogFriendly && !venue.dogFriendly) return false;
    if (filters.hasFoodSpecials && !venue.hasFoodSpecials) return false;
    if (filters.hasDrinkSpecials && !venue.hasDrinkSpecials) return false;
    if (filters.dealTypes.length > 0) {
      if (!filters.dealTypes.some((dt) => venue.dealTypes.includes(dt))) return false;
    }
    return true;
  }), [filters]);
}
