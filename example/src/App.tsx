import { BottomTab } from './BottomTab';
import Navigator from 'react-native-unnecessary-navigation';
import {
  Details,
  Home,
  Profile,
  Settings,
  NotificationDetails,
  Notifications,
  Search,
  SearchResults,
  ResultDetails,
  Preferences,
} from './Screens';
import { Dimensions, StyleSheet, View } from 'react-native';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const routerSetup = [
  [
    { component: Home, routeName: 'home' },
    { component: Details, routeName: 'details' },
    { component: Profile, routeName: 'profile' },
  ],
  [
    { component: Settings, routeName: 'settings' },
    { component: Preferences, routeName: 'preferences' },
  ],
  [
    { component: Notifications, routeName: 'notifications' },
    { component: NotificationDetails, routeName: 'notificationDetails' },
  ],
  [
    { component: Search, routeName: 'search' },
    { component: SearchResults, routeName: 'searchResults' },
    { component: ResultDetails, routeName: 'resultDetails' },
  ],
];

export default function Root() {
  return (
    <View style={styles.container}>
      <Navigator routerSetup={routerSetup} bottomTab={<BottomTab />} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  screen: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
  },
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
