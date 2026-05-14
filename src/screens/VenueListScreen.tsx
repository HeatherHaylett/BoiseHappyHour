import { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
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
import { FilterButton } from '@/components/FilterButton';
import { VenueCard } from '@/components/VenueCard';
import { SearchBar } from '@/components/SearchBar';
import { typography } from '@/constants/typography';

const DEAL_TYPE_LABELS: Record<DealType, string> = {
  BOGO: 'BOGO',
  percent_off: '% off',
  dollar_off: '$ off',
  flat_price: 'flat price',
  other: 'other',
};

type Nav = NativeStackNavigationProp<RootStackParamList, 'VenueList'>;

function CardSeparator() {
  return <View style={styles.separator} />;
}

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
        dealTypes: active
          ? prev.dealTypes.filter((d) => d !== dt)
          : [...prev.dealTypes, dt],
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
      <VenueCard
        venue={item}
        onPress={() => navigation.navigate('VenueDetail', { venueId: item.id })}
      />
    );
  }

  const listHeader = (
    <View style={styles.listHeader}>
      <Text style={styles.heading}>Find your spot</Text>
      <SearchBar
        value={filters.searchQuery}
        onChangeText={(text) => setFilters((prev) => ({ ...prev, searchQuery: text }))}
      />
      <View style={styles.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterCount > 0 && (
            <TouchableOpacity onPress={() => setFilters(defaultFilters)} style={styles.clearAll}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          )}
          <FilterButton
            label="Happening now"
            active={filters.openNow}
            onPress={() => toggle('openNow')}
            icon={<Ionicons name="time-outline" size={13} color={filters.openNow ? '#ffffff' : '#1e1e1e'} />}
          />
          <FilterButton
            label="Food specials"
            active={filters.hasFoodSpecials}
            onPress={() => toggle('hasFoodSpecials')}
            icon={(
              <Ionicons
                name="restaurant-outline"
                size={13}
                color={filters.hasFoodSpecials ? '#ffffff' : '#1e1e1e'}
              />
            )}
          />
          {(Object.keys(DEAL_TYPE_LABELS) as DealType[]).map((dt) => (
            <FilterButton
              key={dt}
              label={DEAL_TYPE_LABELS[dt]}
              active={filters.dealTypes.includes(dt)}
              onPress={() => toggleDealType(dt)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={<Text style={styles.empty}>No venues match your filters.</Text>}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={CardSeparator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  listHeader: {
    gap: 12,
    marginBottom: 4,
  },
  heading: {
    ...typography.h1,
    color: '#1e1e1e',
  },
  filterRow: {
    marginHorizontal: -16,
  },
  filterScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  clearAll: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  clearAllText: {
    ...typography.label,
    color: '#fda100',
  },
  separator: {
    height: 12,
  },
  empty: {
    ...typography.body,
    color: '#9e9e9e',
    padding: 16,
    textAlign: 'center',
  },
});
