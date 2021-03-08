import React, { useEffect, useRef } from 'react'
import { isDef, addUnit, createNamespace } from '../utils';
import { ImageProps } from "./PropsType";
import { useState } from "react";

const [bem] = createNamespace('image');


export default function (props: ImageProps) {
  const {width, height, radius, onLoad, onError, src} = props
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const imageRef = useRef<any>();

  const style: Record<string, any> = {};

  if (isDef(props.width)) {
    style.width = addUnit(width);
  }

  if (isDef(props.height)) {
    style.height = addUnit(height);
  }

  if (isDef(props.radius)) {
    style.overflow = 'hidden';
    style.borderRadius = addUnit(radius);
  }

  // watch(
  //   () => props.src,
  //   () => {
  //     error.value = false;
  //     loading.value = true;
  //   }
  // );

  useEffect(() => {
    setLoading(true)
    setError(false)
  }, [src])

  const handleLoad = (event?: any) => {
    setLoading(false)
    onLoad(event)
  };

  const handleError = (event?: any) => {
    setError(true)
    setLoading(false)
    onError(event)
  };

  const renderLoadingIcon = () => {
    return <></>
    // if (slots.loading) {
    //   return slots.loading();
    // }
    //
    // return (
    //   <Icon
    //     name={props.loadingIcon}
    //     class={bem('loading-icon')}
    //     classPrefix={props.iconPrefix}
    //   />
    // );
  };

  const renderErrorIcon = () => {
    return <></>
    // if (slots.error) {
    //   return slots.error();
    // }
    //
    // return (
    //   <Icon
    //     name={props.errorIcon}
    //     class={bem('error-icon')}
    //     classPrefix={props.iconPrefix}
    //   />
    // );
  };

  const renderPlaceholder = () => {
    if (loading && props.showLoading) {
      return <div className={`${bem('loading')}`}>{renderLoadingIcon()}</div>;
    }
    if (error && props.showError) {
      return <div className={`${bem('error')}`}>{renderErrorIcon()}</div>;
    }
  };

  const renderImage = () => {
    if (error || !props.src) {
      return;
    }

    const attrs = {
      alt: props.alt,
      class: bem('img'),
      style: {
        objectFit: props.fit,
      },
    };

    if (props.lazyLoad) {
      return <img ref={imageRef} v-lazy={props.src} {...attrs} />;
    }

    return (
      <img src={props.src} onLoad={handleLoad} onError={handleError} {...attrs} />
    );
  };

  // const onLazyLoaded = ({el}: { el: HTMLElement }) => {
  //   if (el === imageRef.value && loading) {
  //     handleLoad();
  //   }
  // };
  //
  // const onLazyLoadError = ({el}: { el: HTMLElement }) => {
  //   if (el === imageRef.value && !error) {
  //     handleError();
  //   }
  // };

  // todo add lazyload
  // if ($Lazyload && inBrowser) {
  //   $Lazyload.$on('loaded', onLazyLoaded);
  //   $Lazyload.$on('error', onLazyLoadError);
  //
  //   onBeforeUnmount(() => {
  //     $Lazyload.$off('loaded', onLazyLoaded);
  //     $Lazyload.$off('error', onLazyLoadError);
  //   });
  // }

  return () => (
    <div className={`${bem({round: props.round})}`} style={style.value}>
      {renderImage()}
      {renderPlaceholder()}
    </div>
  );
}

// export default createComponent({
//   props: {
//
//   },
//
//   emits: ['load', 'error'],
//
//   setup(props, { emit, slots }) {
//
//   },
// });
