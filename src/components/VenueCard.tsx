import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Venue } from '@/types';
import { isVenueOpenNow } from '@/utils/timeHelpers';
import { Tag } from '@/components/Tag';

type Props = {
  venue: Venue;
  onPress: () => void;
};

export function VenueCard({ venue, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{venue.name}</Text>
      <Text>{venue.dealDescription}</Text>
      <View style={styles.tags}>
        {isVenueOpenNow(venue) && <Tag label="open now" />}
        {venue.hasFoodSpecials && <Tag label="food" />}
        {venue.tags.map((tag) => (
          <Tag key={tag} label={tag.replace(/_/g, ' ')} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 12,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
});
