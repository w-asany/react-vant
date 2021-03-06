import { ReactNode, CSSProperties } from 'react';

export default interface BasicSwipeProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  height?: string | number;
  loop?: boolean;
  activeIndex?: number;
  animationDuration?: number;
  swipeable?: boolean;
  autoPlay?: boolean;
  autoPlayIntervalTime?: number;
  moveDistanceRatio?: number;
  moveTimeSpan?: number;
  showPagination?: boolean;
  onChange?: (activeIndex?: number) => void;
  onChangeEnd?: (activeIndex?: number) => void;
  style?: CSSProperties;
  children?: ReactNode[];
}

export interface SwipeProps extends BasicSwipeProps {
  prefixCls?: string;
  className?: string;
}
