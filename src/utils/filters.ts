import { FilterState, Venue } from '@/types';
import { isVenueOpenNow } from './timeHelpers';

export function filterVenues(venues: Venue[], filters: FilterState): Venue[] {
  return venues.filter((venue) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      if (!venue.name.toLowerCase().includes(q) && !venue.address.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filters.openNow && !isVenueOpenNow(venue)) return false;
    if (filters.tags.length > 0 && !filters.tags.some((t) => venue.tags.includes(t))) return false;
    if (filters.hasFoodSpecials && !venue.hasFoodSpecials) return false;
    if (filters.dealTypes.length > 0 && !filters.dealTypes.some((dt) => venue.dealTypes.includes(dt))) return false;
    return true;
  });
}
