import { ReactNode } from "react";

export type LoadingType = 'circular' | 'spinner';

export interface LoadingProps {
  size?: number | string;
  color?: string;
  vertical?: boolean
  textSize?: number | string;
  textColor?: string;
  type?: LoadingType;

  children?: ReactNode
}
