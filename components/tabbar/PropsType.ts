import { ReactNode } from "react";

export type TabBarProvide = {
  props: {
    route?: boolean;
    modelValue: number | string;
    activeColor?: string;
    inactiveColor?: string;
  };
  setActive: (active: number | string) => void;
};

export interface TabBarProps {
  // TODO
  // route: boolean;
  zIndex: number | string;
  placeholder: boolean;
  activeColor: string;
  beforeChange: Function;
  inactiveColor: string;
  modelValue: number | string;
  border: boolean; // true
  fixed: boolean; // true
  safeAreaInsetBottom?: boolean

  style?: Record<string, any>;
  items: ReactNode[];
}
