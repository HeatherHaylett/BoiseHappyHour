export type DealType = 'BOGO' | 'percent_off' | 'dollar_off' | 'flat_price' | 'other';

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type VenueTag = 'dog_friendly' | 'patio' | 'live_music' | 'sports_tv' | 'heated_patio';

export type Venue = {
  id: string;
  name: string;
  address: string;
  happyHourDays: Day[];
  happyHourStart: string;
  happyHourEnd: string;
  dealTypes: DealType[];
  dealDescription: string;
  hasFoodSpecials: boolean;
  hasDrinkSpecials: boolean;
  tags: VenueTag[];
  phone?: string;
  website?: string;
  lastVerified: string;
};

export type FilterState = {
  searchQuery: string;
  openNow: boolean;
  dogFriendly: boolean;
  hasFoodSpecials: boolean;
  hasDrinkSpecials: boolean;
  dealTypes: DealType[];
};

export const defaultFilters: FilterState = {
  searchQuery: '',
  openNow: false,
  dogFriendly: false,
  hasFoodSpecials: false,
  hasDrinkSpecials: false,
  dealTypes: [],
};

export type RootStackParamList = {
  VenueList: undefined;
  VenueDetail: { venueId: string };
};
