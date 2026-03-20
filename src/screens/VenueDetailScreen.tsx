import {
  View, Text, TouchableOpacity, Linking, StyleSheet,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Venue } from '@/types';
import venues from '../../data/venues.json';

type Route = RouteProp<RootStackParamList, 'VenueDetail'>;

const allVenues = venues as Venue[];

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
      <View style={styles.section}>
        <Text>{venue.name}</Text>
        <TouchableOpacity onPress={openAddress}>
          <Text>{venue.address}</Text>
        </TouchableOpacity>
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
      <View style={styles.section}>
        <Text>Days: {venue.happyHourDays.join(', ')}</Text>
        <Text>Hours: {venue.happyHourStart}–{venue.happyHourEnd}</Text>
        <Text>{venue.dealDescription}</Text>
        <Text>Deal types: {venue.dealTypes.join(', ')}</Text>
      </View>
      <View style={styles.section}>
        <Text>Food specials: {venue.hasFoodSpecials ? 'yes' : 'no'}</Text>
        <Text>Drink specials: {venue.hasDrinkSpecials ? 'yes' : 'no'}</Text>
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
