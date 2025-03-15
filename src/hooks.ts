import type { NavigationParamsMap } from "./types";

import { useContext } from "react";
import type { NavigatorContextType } from "./types";
import { NavigatorContext } from "./context";

export const useNavigator = <TParams extends NavigationParamsMap>() => {
    const context = useContext(NavigatorContext) as NavigatorContextType<TParams>;
    if (!context) {
        throw new Error('useNavigator must be used within a Navigator');
    }
    return { navigate: context.navigate, currentRoute: context.currentRoute };
};

export const useParams = <TParams extends NavigationParamsMap>(
    route: keyof TParams
) => {
    const context = useContext(NavigatorContext) as NavigatorContextType<TParams>;
    if (!context) {
        throw new Error('useNavigator must be used within a Navigator');
    }
    return { params: context.getParams(route) };
};