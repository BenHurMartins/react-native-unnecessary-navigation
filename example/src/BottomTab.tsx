import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigator } from 'react-native-unnecessary-navigation';

// Define our main routes for the bottom tab
const MAIN_ROUTES = [
  { key: 'home', label: 'Home' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'search', label: 'Search' },
  { key: 'profile', label: 'Profile' },
];

export const BottomTab = () => {
  const { currentRoute, navigate } = useNavigator();

  if (
    !['home', 'search', 'notifications', 'profile'].includes(
      currentRoute as string
    )
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      {MAIN_ROUTES.map((route) => (
        <TouchableOpacity
          key={route.key}
          style={[
            styles.tabItem,
            currentRoute === route.key && styles.activeTab,
          ]}
          onPress={() => navigate(route.key)}
        >
          <Text
            style={[
              styles.tabText,
              currentRoute === route.key && styles.activeText,
            ]}
          >
            {route.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
