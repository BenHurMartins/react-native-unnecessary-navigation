// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Animated, Easing } from 'react-native';
import type {
  NavigatorContextType,
  NavigationParamsMap,
  NavigatorProps,
  RouterSetup,
  TransformedRoutes,
} from './types';
import { NavigatorContext } from './context';
import { useNavigator, useParams } from './hooks';
import { transformRoutes, maxPosition } from './utils';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

export default function Navigator<TParams extends NavigationParamsMap>(
  props: NavigatorProps
) {
  const {
    routerSetup,
    bottomTab,
    easing = Easing.bezier(0.25, 0.1, 0.25, 1),
    duration = 1000,
    xInitialPosition = 0,
    yInitialPosition = 0,
  } = props;

  const transformedRoutes = useMemo(
    () => transformRoutes(routerSetup),
    [routerSetup]
  );

  const scrollRef = useRef<any>(null);

  const [params, setParams] = useState<Record<keyof TParams, any>>();
  const [currentRoute, setCurrentRoute] = useState<keyof TParams>(
    Object.keys(transformedRoutes)[0] as keyof TParams
  );

  // Animated values for scrolling
  const scrollX = useRef(new Animated.Value(xInitialPosition)).current;
  const scrollY = useRef(new Animated.Value(yInitialPosition)).current;

  // Maximum position in the matrix
  const MAX_X = maxPosition(transformedRoutes, 'x');
  const MAX_Y = maxPosition(transformedRoutes, 'y');

  // Dimensions of the router
  const ROUTER_WIDTH = MAX_X * WIDTH;
  const ROUTER_HEIGHT = MAX_Y * HEIGHT;

  // Connect animated values to scroll position
  useEffect(() => {
    const xListener = scrollX.addListener(({ value }) => {
      if (scrollRef.current) {
        scrollRef.current?.scrollTo({
          x: value, // @ts-ignore
          y: scrollY._value,
          animated: false,
        });
      }
    });

    const yListener = scrollY.addListener(({ value }) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          // @ts-ignore
          x: scrollX._value,
          y: value,
          animated: false,
        });
      }
    });

    return () => {
      scrollX.removeListener(xListener);
      scrollY.removeListener(yListener);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }, [transformRoutes]);

  // Custom navigation function using React Native's Animated API
  const navigate = useCallback(
    <T extends keyof TParams>(screenKey: T, params: TParams[T]) => {
      setCurrentRoute(screenKey);
      const position = transformedRoutes[screenKey as string];
      if (!position) return;

      const x = position.x * WIDTH;
      const y = position.y * HEIGHT;

      // @ts-ignore
      setParams((t) => ({ ...t, [screenKey as keyof TParams]: params }));

      Animated.parallel([
        Animated.timing(scrollX, {
          toValue: x,
          duration,
          easing,
          useNativeDriver: false,
        }),
        Animated.timing(scrollY, {
          toValue: y,
          duration,
          easing,
          useNativeDriver: false,
        }),
      ]).start();
    },
    [scrollX, scrollY]
  );

  const getParams = useCallback(
    (route: keyof TParams) => {
      return params?.[route];
    },
    [params]
  );

  return (
    // @ts-ignore
    <NavigatorContext.Provider value={{ currentRoute, navigate, getParams }}>
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: ROUTER_WIDTH,
            height: ROUTER_HEIGHT,
          }}
        >
          {Object.values(transformedRoutes).map((route, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.screen,
                  {
                    left: route.x * WIDTH,
                    top: route.y * HEIGHT,
                  },
                ]}
              >
                <route.component />
              </View>
            );
          })}
        </Animated.ScrollView>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          {bottomTab}
        </View>
      </View>
    </NavigatorContext.Provider>
  );
}

const styles = StyleSheet.create({
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

export { useNavigator, useParams };

export type {
  NavigatorContextType,
  NavigationParamsMap,
  NavigatorProps,
  RouterSetup,
  TransformedRoutes,
};
