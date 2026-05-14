import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
/* eslint-disable camelcase */
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
/* eslint-enable camelcase */
import { RootStackParamList } from '@/types';
import VenueListScreen from '@/screens/VenueListScreen';
import VenueDetailScreen from '@/screens/VenueDetailScreen';
import { NavButton } from '@/components/NavButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // eslint-disable-next-line camelcase
  const [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="VenueList"
          screenOptions={{ headerShadowVisible: false }}
        >
          <Stack.Screen name="VenueList" component={VenueListScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="VenueDetail"
            component={VenueDetailScreen}
            options={({ navigation }) => ({
              title: '',
              headerStyle: { backgroundColor: '#C57100' },
              // eslint-disable-next-line react/no-unstable-nested-components
              headerLeft: () => <NavButton onPress={() => navigation.goBack()} />,
            })}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
