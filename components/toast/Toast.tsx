import React, { useEffect } from 'react'
// Utils
import { createNamespace, isDef } from '../utils';
import { lockClick } from './lock-click';

// Components
import Icon from '../icon';
import Popup from '../popup';
import Loading from '../loading';
import { ToastProps } from "./PropsType";

const [bem] = createNamespace('toast');


export default function Toast(props: ToastProps) {
  const {
    icon,
    show,
    overlay,
    message,
    className,
    // iconPrefix,
    loadingType,
    forbidClick,
    overlayClass,
    overlayStyle,
    closeOnClick,
    closeOnClickOverlay,
    type,
    duration = 2000, // 2000
    position, // middle
    transition,
    onUpdateShow
  } = props

  let timer: NodeJS.Timeout;
  let clickable = false;

  const toggleClickable = () => {
    const newValue = show && forbidClick;
    if (clickable !== newValue) {
      clickable = newValue;
      lockClick(clickable);
    }
  };

  const onClick = () => {
    if (closeOnClick) {
      onUpdateShow?.(false)
    }
  };

  const clearTimer = () => {
    clearTimeout(timer);
  };

  const toggle = (show: boolean) => onUpdateShow?.(show)

  const renderIcon = () => {
    const hasIcon = icon || type === 'success' || type === 'fail';

    if (hasIcon) {
      return (
        <Icon
          type={icon || type}
          className={'' + bem('icon')}
          // classPrefix={iconPrefix}
        />
      );
    }

    if (type === 'loading') {
      return <Loading
        type={loadingType}
      />;
    }
  };

  const renderMessage = () => {

    if (isDef(message) && message !== '') {
      return type === 'html' ? (
        <div
          className={'' + bem('text')}
          dangerouslySetInnerHTML={{
            __html: String(message)
          }}
        />
      ) : (
        <div className={'' + bem('text')}>{message}</div>
      );
    }
  };

  useEffect(() => {
    toggleClickable()
  }, [show, forbidClick])

  useEffect(() => {
    clearTimer();
    if (show && duration > 0) {
      timer = setTimeout(() => {
        onUpdateShow(false)
      }, duration);
    }
  }, [show, duration])

  useEffect(() => {
    toggleClickable()
    return () => toggleClickable()
  }, [])

  return (<Popup
      show={show}
      className={[
        bem([position, {[type]: !icon}]),
        className,
      ]}
      overlay={overlay}
      lockScroll={false}
      transition={transition}
      overlayClass={overlayClass}
      overlayStyle={overlayStyle}
      closeOnClickOverlay={closeOnClickOverlay}
      onClick={onClick}
      onClosed={clearTimer}
      onUpdateShow={toggle}
    >
      {renderIcon()}
      {renderMessage()}
    </Popup>
  )
}


