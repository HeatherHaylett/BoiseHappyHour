import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, Venue } from '@/types';
import venues from '../../data/venues.json';

type Route = RouteProp<RootStackParamList, 'VenueDetail'>;

const allVenues = venues as Venue[];

export default function VenueDetailScreen() {
  const route = useRoute<Route>();
  const venue = allVenues.find((v) => v.id === route.params.venueId);

  if (!venue) {
    return (
      <View style={styles.container}>
        <Text>Venue not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>{venue.name}</Text>
        <Text>{venue.address}</Text>
        {venue.phone ? <Text>{venue.phone}</Text> : null}
        {venue.website ? <Text>{venue.website}</Text> : null}
      </View>
      <View style={styles.section}>
        <Text>Happy hour: {venue.happyHourStart}–{venue.happyHourEnd}</Text>
        <Text>Days: {venue.happyHourDays.join(', ')}</Text>
        <Text>{venue.dealDescription}</Text>
      </View>
      <View style={styles.section}>
        {venue.hasFoodSpecials && <Text>[ food specials ]</Text>}
        {venue.hasDrinkSpecials && <Text>[ drink specials ]</Text>}
        {venue.dogFriendly && <Text>[ dog friendly ]</Text>}
      </View>
      <View style={styles.section}>
        <Text>Last verified: {venue.lastVerified}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    gap: 8,
  },
});
