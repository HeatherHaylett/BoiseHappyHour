import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from '@/types';
import VenueListScreen from '@/screens/VenueListScreen';
import VenueDetailScreen from '@/screens/VenueDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VenueList">
        <Stack.Screen name="VenueList" component={VenueListScreen} options={{ title: 'Boise Happy Hour' }} />
        <Stack.Screen name="VenueDetail" component={VenueDetailScreen} options={{ title: 'Venue' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
