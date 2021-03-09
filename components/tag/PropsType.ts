import { ReactNode } from "react";

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface TagProps {
  size?: string;
  color?: string;
  plain?: boolean;
  round?: boolean;
  textColor?: string;
  closeable?: boolean;
  type?: TagType;
  mark: boolean;
  show?: boolean;
  onClose?: () => void;

  children: ReactNode
}
