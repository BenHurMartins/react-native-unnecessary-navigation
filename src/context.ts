import { createContext } from 'react';
import type { NavigatorContextType } from './types';

export const NavigatorContext = createContext<NavigatorContextType<any>>(null);