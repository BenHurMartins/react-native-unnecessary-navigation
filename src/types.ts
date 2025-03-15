export type EasingFunction = (t: number) => number;

export type NavigationParamsMap = Record<string, object | undefined>;

export type TransformedRoutes = {
    [key: string]: {
        component: React.ComponentType<any>;
        x: number;
        y: number;
    };
};

export type RouterSetup = {
    routeName: string;
    component: React.ComponentType<any>;
}[][];

export type NavigatorContextType<TParams extends NavigationParamsMap> = {
    currentRoute: keyof TParams;
    navigate: <T extends keyof TParams>(route: T, params?: TParams[T]) => void;
    getParams: <T extends keyof TParams>(route: T) => TParams[T];
} | null;


export type NavigatorProps = {
    routerSetup: RouterSetup;
    bottomTab: React.ReactNode;
    easing?: EasingFunction;
    duration?: number;
    xInitialPosition?: number;
    yInitialPosition?: number;
};
