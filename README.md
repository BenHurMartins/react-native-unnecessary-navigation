# 🚀 react-native-unnecessary-navigation

A completely unnecessary yet functional navigation library for React Native! 🎉

This library lets you define screen navigation in a structured way, the question is not Why? but Why Not?

### Warning

- all screens are rendered at same time, so watchout for performance
- because all screens are rendered at same time, watchout for props, state management and screen initialization

---

## 📦 Installation

```sh
npm install react-native-unnecessary-navigation
```

or

```sh
yarn add react-native-unnecessary-navigation
```

---

## ✨ Features

✅ Superfluous but functional navigation.  
✅ Supports nested navigation structures.  
✅ TypeScript support for route parameters.  
✅ Bottom tab navigation support.  
✅ Uses React Context to manage navigation state.

https://github.com/user-attachments/assets/f8628314-8c19-4656-88d9-cbf543c8965c

---

## 🛠 Usage

### 📌 Defining Your Routes

The screen will render like a two dimensional array, each element should contain your screen and the `routeName`

```tsx
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
```

In the given example the screen setup will look like this:

```
[][][]
[][]
[][]
[][][][]
```

Then in the root of your project you can pass your navigator, it also works with Expo, you just need to add the navigator in the first index file inside `/app`

```tsx
export default function Root() {
  return (
    <View style={styles.container}>
      <Navigator routerSetup={routerSetup} bottomTab={<BottomTab />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
```

---

### 📌 Creating a Bottom Tab

The bottom tab is totally custom relies on `useNavigator` hook to navigate to the routes. It will be rendered as `absolute` position in the bottom of the navigator, you can choose to pass conditions to render it.

You can define a bottom tab navigation system like this:

```tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigator } from 'react-native-unnecessary-navigation';

const MAIN_ROUTES = [
  { key: 'home', label: 'Home' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'search', label: 'Search' },
  { key: 'profile', label: 'Profile' },
];

export const BottomTab = () => {
  const { currentRoute, navigate } = useNavigator();

  if (!MAIN_ROUTES.some((route) => route.key === currentRoute)) {
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
```

---

### 📌 Type-Safe Navigation with Params

For strict TypeScript support, define your navigation parameters like this:

```tsx
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
```

---

### 📌 Using Navigation in a Screen

```tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppNavigation, useAppParams } from './navigation';

export const Details = () => {
  const { navigate } = useAppNavigation();
  const { params } = useAppParams('details');
  const { id } = params || {};

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Text>{id}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigate('home')}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('profile')}
      >
        <Text>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
});
```

---

### Props

| Prop Name        | Type                      | Description                                                                                                        | Required | Default                             |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------- | ----------------------------------- |
| routerSetup      | Array<Array<RouteConfig>> | A 2D array defining your navigation structure. Each RouteConfig object should contain `component` and `routeName`. | Yes      | -                                   |
| bottomTab        | React.ReactNode           | Optional. A custom component to render as the bottom tab.                                                          | No       | null                                |
| easing           | EasingFunction            | Optional. The easing function for the navigation animation.                                                        | No       | `Easing.bezier(0.25, 0.1, 0.25, 1)` |
| duration         | number                    | Optional. The duration of the navigation animation in milliseconds.                                                | No       | 1000                                |
| xInitialPosition | number                    | Optional. The initial x position of the navigator.                                                                 | No       | 0                                   |
| yInitialPosition | number                    | Optional. The initial y position of the navigator.                                                                 | No       | 0                                   |

---

## 📜 License

MIT License. Do whatever you want with it.

---

## ❤️ Support

If you actually use this in a real app, please **seek help immediately.** 🤣
