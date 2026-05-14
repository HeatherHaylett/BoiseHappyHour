import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Venue, VenueTag } from '@/types';
import { isVenueOpenNow } from '@/utils/timeHelpers';
import { Tag } from '@/components/Tag';
import { TimeBadge } from '@/components/TimeBadge';
import { typography } from '@/constants/typography';

type Props = {
  venue: Venue;
  onPress: () => void;
};

const TAG_ICONS: Partial<Record<VenueTag, keyof typeof Ionicons.glyphMap>> = {
  patio: 'partly-sunny-outline',
  dog_outside: 'partly-sunny-outline',
  dog_inside: 'home-outline',
  live_music: 'musical-notes-outline',
  sports_tv: 'tv-outline',
  heated_patio: 'flame-outline',
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

      <View style={styles.tags}>
        {isOpen && (
          <Tag
            variant="green"
            label="happening now"
            icon={<Ionicons name="time-outline" size={12} color="#008951" />}
          />
        )}
        {venue.tags.map((tag) => {
          const iconName = TAG_ICONS[tag];
          return (
            <Tag
              key={tag}
              variant="outline"
              label={tag.replace(/_/g, ' ')}
              icon={iconName ? <Ionicons name={iconName} size={12} color="#5e5e5e" /> : undefined}
            />
          );
        })}
      </View>

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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
