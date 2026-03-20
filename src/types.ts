export type DealType = 'BOGO' | 'percent_off' | 'dollar_off' | 'flat_price' | 'other';

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type VenueTag = 'dog_outside' | 'dog_inside' | 'patio' | 'live_music' | 'sports_tv' | 'heated_patio';

export type HappyHourWindow = {
  days: Day[];
  start: string;  // "HH:mm" — use "00:00" for all day
  end: string;    // "HH:mm" — use "23:59" for all day
};

export type Venue = {
  id: string;
  name: string;
  address: string;
  schedule: HappyHourWindow[];
  dealTypes: DealType[];
  dealDescription: string;
  hasFoodSpecials: boolean;
  tags: VenueTag[];
  phone?: string;
  website?: string;
  lastVerified: string;
};

export type FilterState = {
  searchQuery: string;
  openNow: boolean;
  tags: VenueTag[]; 
  hasFoodSpecials: boolean;
  dealTypes: DealType[];
};

export const defaultFilters: FilterState = {
  searchQuery: '',
  openNow: false,
  tags: [],
  hasFoodSpecials: false,
  dealTypes: [],
};

export type RootStackParamList = {
  VenueList: undefined;
  VenueDetail: { venueId: string };
};
