import { LoadingType } from "../loading/PropsType";

export type ToastType = 'text' | 'loading' | 'success' | 'fail' | 'html';
export type ToastPosition = 'top' | 'middle' | 'bottom';

export type ToastOptions = {
  icon?: string;
  type?: ToastType;
  mask?: boolean;
  message?: string | number;
  onClose?: () => void;
  onOpened?: () => void;
  overlay?: boolean;
  duration?: number;
  position?: ToastPosition;
  className?: unknown;
  transition?: string;
  iconPrefix?: string;
  loadingType?: LoadingType;
  forbidClick?: boolean;
  closeOnClick?: boolean;
  overlayClass?: unknown;
  overlayStyle?: Record<string, any>;
  closeOnClickOverlay?: boolean;
}


export interface ToastProps {
  icon: string;
  show: boolean;
  overlay: boolean;
  message: number | string;
  className: any,
  iconPrefix: String,
  loadingType: LoadingType;
  forbidClick: boolean;
  overlayClass: any,
  overlayStyle: Record<string, any>;
  closeOnClick: boolean;
  closeOnClickOverlay: boolean;
  type: ToastType;
  duration: number; // 2000
  position: ToastPosition; // middle
  transition: string;


  onUpdateShow: (isShow: boolean) => void
}

