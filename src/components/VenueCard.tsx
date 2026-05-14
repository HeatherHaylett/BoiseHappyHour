import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Venue } from '@/types';
import { isVenueOpenNow } from '@/utils/timeHelpers';
import { VenueTags } from '@/components/VenueTags';
import { TimeBadge } from '@/components/TimeBadge';
import { typography } from '@/constants/typography';

type Props = {
  venue: Venue;
  onPress: () => void;
};

export function VenueCard({ venue, onPress }: Props) {
  const isOpen = isVenueOpenNow(venue);
  const firstWindow = venue.schedule[0];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>{venue.name}</Text>
        {firstWindow && (
          <TimeBadge start={firstWindow.start} end={firstWindow.end} />
        )}
      </View>

      <Text style={styles.deal}>{venue.dealDescription}</Text>

      <VenueTags tags={venue.tags} isOpen={isOpen} />

      <View style={styles.divider} />

      <View style={styles.addressRow}>
        <Ionicons name="location-outline" size={14} color="#9e9e9e" />
        <Text style={styles.address}>{venue.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e4e3',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    padding: 16,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    ...typography.h3,
    color: '#1e1e1e',
    flex: 1,
  },
  deal: {
    ...typography.body,
    color: '#5e5e5e',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e4e3',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  address: {
    ...typography.label,
    color: '#9e9e9e',
  },
});
