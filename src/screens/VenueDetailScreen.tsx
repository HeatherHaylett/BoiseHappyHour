import {
  View, Text, TouchableOpacity, Linking, StyleSheet,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Venue } from '@/types';

type Route = RouteProp<RootStackParamList, 'VenueDetail'>;
import { Ionicons } from '@expo/vector-icons';
import { typography } from '@/constants/typography';
import { TimeBadge } from '@/components/TimeBadge';
import { VenueTags } from '@/components/VenueTags';
import {
  formatDays, formatWindowTime, isVenueOpenNow, timeRemainingInWindow,
} from '@/utils/timeHelpers';
import venues from '../../data/venues.json';

const allVenues = venues as Venue[];

function Schedule({ venue, isOpen }: { venue: Venue, isOpen: boolean }) {
  const countdown = timeRemainingInWindow(venue);
  return (
    <View style={styles.schedule}>
      <View style={styles.runtime}>
        <Text style={[typography.label, styles.scheduleLabel]}>HAPPY HOUR</Text>
        <TimeBadge start={venue.schedule[0].start} end={venue.schedule[0].end} />
      </View>
      {isOpen && (
        <View style={styles.timer}>
          <Text style={[typography.label, styles.scheduleLabel]}>ENDS IN</Text>
          <Text style={styles.countdown}>{countdown}</Text>
        </View>
      )}
    </View>
  );
}

function VenueHeader({ venue, isOpen }: { venue: Venue, isOpen: boolean }) {

  return (
    <View style={styles.header}>
      <View style={styles.headerTitle}>
        <Text style={[typography.h2, styles.whiteText]}>{venue.name}</Text>
        <View style={styles.addressContainer}>
          <Ionicons name="map-outline" size={13} color="white" />
          <Text style={[typography.body, styles.whiteText]}>{venue.address}</Text>
        </View>
      </View>
      <VenueTags tags={venue.tags} isOpen={isOpen} />
    </View>
  )
}

function VenueBody({ venue }: { venue: Venue }) {
  function openAddress() {
    Linking.openURL(`https://maps.apple.com/?q=${encodeURIComponent(venue.address)}`);
  }
  function openPhone() {
    Linking.openURL(`tel:${venue.phone}`);
  }
  function openWebsite() {
    Linking.openURL(venue.website!);
  }

  return (
    <View style={styles.body}>
      <View style={styles.bodySection}>
        <Text style={[typography.label, styles.sectionLabel]}>TODAY'S DEALS</Text>
        <View style={styles.dealCard}>
          <View style={styles.dealIconWrap}>
            <Ionicons name="star-outline" size={17} color="#fda100" />
          </View>
          <Text style={styles.dealText}>{venue.dealDescription}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bodySection}>
        <Text style={[typography.label, styles.sectionLabel]}>HAPPY HOUR SCHEDULE</Text>
        {venue.schedule.map((w, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={i} style={styles.scheduleRow}>
            <Text style={[typography.body, styles.darkText]}>{formatDays(w.days)}</Text>
            <Text style={[typography.body, styles.darkText]}>{formatWindowTime(w.start, w.end)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.bodyInfo}>
        <Text style={[typography.label, styles.sectionLabel]}>INFO</Text>
        <TouchableOpacity style={styles.infoRow} onPress={openAddress}>
          <Ionicons name="map-outline" size={13} color="#000000" />
          <Text style={[typography.body, styles.darkText]}>{venue.address}</Text>
        </TouchableOpacity>
        {venue.phone ? (
          <TouchableOpacity style={styles.infoRow} onPress={openPhone}>
            <Ionicons name="call-outline" size={13} color="#000000" />
            <Text style={[typography.body, styles.darkText]}>{venue.phone}</Text>
          </TouchableOpacity>
        ) : null}
        {venue.website ? (
          <TouchableOpacity style={styles.infoRow} onPress={openWebsite}>
            <Ionicons name="globe-outline" size={13} color="#000000" />
            <Text style={[typography.body, styles.linkText]}>{venue.website}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
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

  return (
    <View style={styles.container}>
      <VenueHeader venue={venue} isOpen={isOpen} />
      <Schedule venue={venue} isOpen={isOpen} />
      <VenueBody venue={venue} />
    </View>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    opacity: 0.87,
  },
  body: {
    backgroundColor: '#ffffff',
    flex: 1,
    gap: 20,
    padding: 20,
  },
  bodyInfo: {
    flex: 1,
    gap: 12,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  bodySection: {
    gap: 12,
  },
  closedText: {
    color: '#727272',
  },
  container: {
    flex: 1,
  },
  countdown: {
    ...typography.h4,
    color: '#4a140f',
    textAlign: 'right',
  },
  darkText: {
    color: '#000000',
  },
  dealCard: {
    alignItems: 'center',
    backgroundColor: '#fbf9f6',
    borderColor: '#e5e4e3',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 12,
  },
  dealIconWrap: {
    alignItems: 'center',
    backgroundColor: '#fcefd8',
    borderRadius: 12,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  dealText: {
    ...typography.title,
    color: '#000000',
    flexShrink: 1,
  },
  divider: {
    backgroundColor: '#e5e4e3',
    height: 1,
  },
  header: {
    backgroundColor: '#C57100',
    gap: 12,
    padding: 20,
  },
  headerTitle: {
    gap: 4,
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  linkText: {
    ...typography.body,
    color: '#fda100',
  },
  runtime: {
    gap: 8,
  },
  schedule: {
    alignItems: 'center',
    backgroundColor: '#fbf9f6',
    borderBottomColor: '#e5e4e3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  scheduleLabel: {
    color: '#4a360f',
  },
  scheduleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    color: '#4a360f',
  },
  timer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  whiteText: {
    color: '#FFFFFF',
  },
});
