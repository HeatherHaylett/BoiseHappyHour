import {
  View, Text, TouchableOpacity, Linking, StyleSheet,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Venue } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '@/constants/typography';
import { TimeBadge } from '@/components/TimeBadge';
import { VenueTags } from '@/components/VenueTags';
import { isVenueOpenNow, timeRemainingInWindow } from '@/utils/timeHelpers';
import venues from '../../data/venues.json';

type Route = RouteProp<RootStackParamList, 'VenueDetail'>;

const allVenues = venues as Venue[];

function Schedule({ venue, isOpen }: { venue: Venue, isOpen: boolean }) {
  const countdown = timeRemainingInWindow(venue);
  return (
    <View style={styles.schedule}>
      <View style={styles.runtime}>
        <Text style={typography.label}>HAPPY HOUR</Text>
        <TimeBadge start={venue.schedule[0].start} end={venue.schedule[0].end} />
      </View>
      {isOpen && (
        <View style={styles.timer}>
          <Text style={typography.label}>ENDS IN</Text>
          <Text style={{ textAlign: 'right' }}>{countdown}</Text>
        </View>
      )}
    </View>
  );
}

export default function VenueDetailScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const venue = allVenues.find((v) => v.id === route.params.venueId);

  if (!venue) {
    return (
      <View style={styles.container}>
        <Text>Venue not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>[ back ]</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isOpen = isVenueOpenNow(venue);

  function openAddress() {
    Linking.openURL(`https://maps.apple.com/?q=${encodeURIComponent(venue!.address)}`);
  }

  function openPhone() {
    Linking.openURL(`tel:${venue!.phone}`);
  }

  function openWebsite() {
    Linking.openURL(venue!.website!);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={typography.h2}>{venue.name}</Text>
          <View style={styles.addressContainer}>
            <Ionicons name="map-outline" size={12} color="white" />
            <TouchableOpacity onPress={openAddress}>
              <Text style={typography.body}>{venue.address}</Text>
            </TouchableOpacity>
          </View>
          <VenueTags tags={venue.tags} isOpen={isOpen} />
        </View>
      </View>
      <Schedule venue={venue} isOpen={isOpen} />
      <View style={styles.section}>
        <Text>Food specials: {venue.hasFoodSpecials ? 'yes' : 'no'}</Text>
      </View>
      {venue.phone ? (
        <TouchableOpacity onPress={openPhone}>
          <Text>{venue.phone}</Text>
        </TouchableOpacity>
      ) : null}
      {venue.website ? (
        <TouchableOpacity onPress={openWebsite}>
          <Text>{venue.website}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#C57100',
    padding: 20,
  },
  headerTitle: {
    gap: 4,
  },
  runtime: {
    gap: 8,
    justifyContent: 'flex-start',
  },
  schedule: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  section: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    gap: 8,
  },
  timer: {
    gap: 8,
    justifyContent: 'flex-end',
  },
});
