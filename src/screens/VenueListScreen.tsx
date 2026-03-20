import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RootStackParamList,
  FilterState,
  defaultFilters,
  Venue,
  DealType,
} from '@/types';
import { useVenues } from '@/hooks/useVenues';
import { isVenueOpenNow } from '@/utils/timeHelpers';

const DEAL_TYPE_LABELS: Record<DealType, string> = {
  BOGO: 'BOGO',
  percent_off: '% off',
  dollar_off: '$ off',
  flat_price: 'flat price',
  other: 'other',
};

type Nav = NativeStackNavigationProp<RootStackParamList, 'VenueList'>;

export default function VenueListScreen() {
  const navigation = useNavigation<Nav>();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const venues = useVenues(filters);

  function toggle(key: keyof Pick<FilterState, 'openNow' | 'hasFoodSpecials'>) {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleDealType(dt: DealType) {
    setFilters((prev) => {
      const active = prev.dealTypes.includes(dt);
      return {
        ...prev,
        dealTypes: active ? prev.dealTypes.filter((d) => d !== dt) : [...prev.dealTypes, dt],
      };
    });
  }

  const filterCount = useMemo(() => {
    let count = 0;
    if (filters.openNow) count += 1;
    if (filters.hasFoodSpecials) count += 1;
    count += filters.dealTypes.length;
    count += filters.tags.length;
    return count;
  }, [filters]);

  function renderItem({ item }: { item: Venue }) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('VenueDetail', { venueId: item.id })}
      >
        <Text>{item.name}</Text>
        <Text>{item.happyHourDays.join(', ')}  {item.happyHourStart}–{item.happyHourEnd}</Text>
        <Text>{item.dealDescription}</Text>
        <View style={styles.badges}>
          {isVenueOpenNow(item) && <Text>[ open now ]</Text>}
          {item.hasFoodSpecials && <Text>[ food ]</Text>}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search venues..."
          value={filters.searchQuery}
          onChangeText={(text) => setFilters((prev) => ({ ...prev, searchQuery: text }))}
        />
      </View>
      <View style={styles.filters}>
        <View style={styles.filterHeader}>
          <Text>{filterCount > 0 ? `Filters (${filterCount})` : 'Filters'}</Text>
          {filterCount > 0 && (
            <TouchableOpacity onPress={() => setFilters(defaultFilters)}>
              <Text>[ clear all ]</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => toggle('openNow')}>
          <Text>{filters.openNow ? '[x]' : '[ ]'} Open now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggle('hasFoodSpecials')}>
          <Text>{filters.hasFoodSpecials ? '[x]' : '[ ]'} Food specials</Text>
        </TouchableOpacity>
        <View style={styles.dealTypes}>
          {(Object.keys(DEAL_TYPE_LABELS) as DealType[]).map((dt) => (
            <TouchableOpacity key={dt} onPress={() => toggleDealType(dt)}>
              <Text>{filters.dealTypes.includes(dt) ? '[x]' : '[ ]'} {DEAL_TYPE_LABELS[dt]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No venues match your filters.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  input: {
    height: 32,
  },
  filters: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    gap: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  dealTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  empty: {
    padding: 16,
  },
});
