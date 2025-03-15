import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigator, useParams } from 'react-native-unnecessary-navigation';

export type NavigationParams = {
  home: undefined;
  details: { id: string };
  profile: undefined;
  settings: undefined;
  preferences: undefined;
  notifications: undefined;
  notificationDetails: { id: string };
  search: undefined;
  searchResults: undefined;
  resultDetails: { id: string };
};

export const useAppNavigation = useNavigator<NavigationParams>;
export const useAppParams = useParams<NavigationParams>;

export const Home = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}
    >
      <Text>Home</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('details', { id: '123' })}
      >
        <Text>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Details = () => {
  const { navigate } = useAppNavigation();
  const { params } = useAppParams('details');
  const { id } = params || {};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
      }}
    >
      <Text>Details</Text>
      <Text>{id}</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('home')}
      >
        <Text>go back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('profile')}
      >
        <Text>Go to profile</Text>
      </TouchableOpacity>
    </View>
  );
};
export const Profile = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
      }}
    >
      <Text>Profile</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('home')}
      >
        <Text>Go to home</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Settings = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple',
      }}
    >
      <Text>Settings</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('profile')}
      >
        <Text>Back to Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('preferences')}
      >
        <Text>Go to Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Preferences = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
      }}
    >
      <Text>Preferences</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('settings')}
      >
        <Text>Back to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Notifications = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
      }}
    >
      <Text>Notifications</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('home')}
      >
        <Text>Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('notificationDetails')}
      >
        <Text>View Notification Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export const NotificationDetails = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'coral',
      }}
    >
      <Text>Notification Details</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('notifications')}
      >
        <Text>Back to Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Search = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'cyan',
      }}
    >
      <Text>Search</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('home')}
      >
        <Text>Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('searchResults')}
      >
        <Text>View Search Results</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SearchResults = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightcyan',
      }}
    >
      <Text>Search Results</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('search')}
      >
        <Text>Back to Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('resultDetails')}
      >
        <Text>View Result Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ResultDetails = () => {
  const { navigate } = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      }}
    >
      <Text>Result Details</Text>
      <TouchableOpacity
        style={{ marginTop: 20, ...styles.button }}
        onPress={() => navigate('searchResults')}
      >
        <Text>Back to Search Results</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
