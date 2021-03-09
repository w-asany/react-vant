import { ReactNode } from "react";

export type PullRefreshStatus =
  | 'normal'
  | 'loading'
  | 'loosing'
  | 'pulling'
  | 'success';

export interface PullRefreshProps {
  disabled: boolean;
  successText: string;
  pullingText: string;
  loosingText: string;
  loadingText: string
  modelValue: boolean; // false
  successDuration: number |string; // 500
  animationDuration: number | string; // 300
  headHeight: number | string; // DEFAULT_HEAD_HEIGHT

  style: Record<string, any>;

  onUpdateValue: (value: boolean) => void;
  onRefresh: () => void;
  children: ReactNode;
}
