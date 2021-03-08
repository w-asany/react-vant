
export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';


export interface ImageProps {
  src: string;
  alt: string;
  fit: ImageFit;
  round: boolean;
  width: number | string;
  height: number | string;
  radius: number | string;
  lazyLoad: boolean;
  iconPrefix: string;
  showError: boolean;
  showLoading: boolean;
  errorIcon: string;
  loadingIcon: string;


  onLoad: (event: any) => void;
  onError: (event: any) => void;
}
