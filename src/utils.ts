import type { RouterSetup } from "./types";
import type { TransformedRoutes } from "./types";

const transformRoutes = (routes: RouterSetup): TransformedRoutes => {
    return routes.reduce((level, routeLevel, y) => {
        const screens = routeLevel.reduce((acc, route, x) => {
            acc[route.routeName] = {
                component: route.component,
                x,
                y,
            };
            return acc;
        }, {} as TransformedRoutes);
        return { ...level, ...screens };
    }, {} as TransformedRoutes);
};

const maxPosition = (transformedRoutes: TransformedRoutes, axis: 'x' | 'y') => Object.values(transformedRoutes).reduce(
    (max, route) => (route[axis] > max ? route[axis] : max),
    0
) + 1

export { transformRoutes, maxPosition }