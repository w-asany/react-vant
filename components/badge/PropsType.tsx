import {ReactNode} from "react";

export interface BadgeProps {
  dot: boolean;
  max: number | string;
  color: string;
  offset?: [number, number];
  content: number | string;
  tag: string

  children?: ReactNode
}
