import { useState } from 'react';
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
} from '@/types';
import { useVenues } from '@/hooks/useVenues';

type Nav = NativeStackNavigationProp<RootStackParamList, 'VenueList'>;

export default function VenueListScreen() {
  const navigation = useNavigation<Nav>();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const venues = useVenues(filters);

  function toggle(key: keyof Pick<FilterState, 'openNow' | 'dogFriendly' | 'hasFoodSpecials' | 'hasDrinkSpecials'>) {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function renderItem({ item }: { item: Venue }) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('VenueDetail', { venueId: item.id })}
      >
        <Text>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text>{item.happyHourStart}–{item.happyHourEnd}</Text>
        {item.dogFriendly && <Text>[ dog friendly ]</Text>}
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
        <TouchableOpacity onPress={() => toggle('openNow')}>
          <Text>{filters.openNow ? '[x]' : '[ ]'} Open now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggle('dogFriendly')}>
          <Text>{filters.dogFriendly ? '[x]' : '[ ]'} Dog friendly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggle('hasFoodSpecials')}>
          <Text>{filters.hasFoodSpecials ? '[x]' : '[ ]'} Food specials</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggle('hasDrinkSpecials')}>
          <Text>{filters.hasDrinkSpecials ? '[x]' : '[ ]'} Drink specials</Text>
        </TouchableOpacity>
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
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 12,
  },
  empty: {
    padding: 16,
  },
});
