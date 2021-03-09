import React, { useEffect, useRef, useState } from 'react'
import { PullRefreshProps, PullRefreshStatus } from "./PropsType";
// Utils
import { preventDefault, getScrollTop, createNamespace } from '../utils';
// Components
import Loading from '../loading';

// Composition
import { useTouch } from '../hooks/use-touch';
import { useScrollParent } from '../hooks/use-scroll-parent'


const [bem] = createNamespace('pull-refresh');

const DEFAULT_HEAD_HEIGHT = 50;
const TEXT_STATUS = ['pulling', 'loosing', 'success'];

export default function PullRefresh(props: PullRefreshProps) {
  const {
    onUpdateValue,
    onRefresh,
    children,
    modelValue,
    successText,
    style,
    animationDuration,
    headHeight,
    disabled,
    successDuration
  } = props

  let reachTop: boolean;

  const root = useRef<any>();
  const scrollParent = useScrollParent(root);

  const [state, setState] = useState({
    status: 'normal' as PullRefreshStatus,
    distance: 0,
    duration: 0,
  })

  const touch = useTouch();

  const getHeadStyle = () => {
    if (headHeight !== DEFAULT_HEAD_HEIGHT) {
      return {
        height: `${headHeight}px`,
      };
    }
  };

  const isTouchable = () =>
    state.status !== 'loading' &&
    state.status !== 'success' &&
    !disabled;

  const ease = (distance: number) => {
    const currentHeadHeight: number = +headHeight;

    if (distance > headHeight) {
      if (distance < currentHeadHeight * 2) {
        distance = currentHeadHeight + (distance - currentHeadHeight) / 2;
      } else {
        distance = currentHeadHeight * 1.5 + (distance - currentHeadHeight * 2) / 4;
      }
    }

    return Math.round(distance);
  };

  const setStatus = (distance: number, isLoading?: boolean) => {
    state.distance = distance;

    if (isLoading) {
      state.status = 'loading';
    } else if (distance === 0) {
      state.status = 'normal';
    } else if (distance < headHeight) {
      state.status = 'pulling';
    } else {
      state.status = 'loosing';
    }
  };

  const getStatusText = () => {
    const {status} = state;
    if (status === 'normal') {
      return '';
    }
    return (props as any)[`${status}Text`];
  };

  const renderStatus = () => {
    const {
      status,
      // distance
    } = state;

    // if (slots[status]) {
    //   return slots[status]!({ distance });
    // }

    const nodes: any[] = [];

    if (TEXT_STATUS.indexOf(status) !== -1) {
      nodes.push(<div className={'' + bem('text')}>{getStatusText()}</div>);
    }
    if (status === 'loading') {
      nodes.push(<Loading size="16">{getStatusText()}</Loading>);
    }

    return nodes;
  };

  const showSuccessTip = () => {
    state.status = 'success';

    setTimeout(() => {
      setStatus(0);
    }, +successDuration);
  };

  const checkPosition = (event: TouchEvent) => {
    reachTop = getScrollTop(scrollParent.current!) === 0;

    if (reachTop) {
      state.duration = 0;
      touch.start(event);
    }
  };

  const onTouchStart = (event: any) => {
    if (isTouchable()) {
      checkPosition(event);
    }
  };

  const onTouchMove = (event: any) => {
    if (isTouchable()) {
      if (!reachTop) {
        checkPosition(event);
      }

      const {deltaY} = touch;
      touch.move(event);

      if (reachTop && deltaY >= 0 && touch.isVertical()) {
        preventDefault(event);
        setStatus(ease(deltaY));
      }
    }
  };

  const onTouchEnd = () => {
    if (reachTop && touch.deltaY && isTouchable()) {
      state.duration = +props.animationDuration;

      if (state.status === 'loosing') {
        setStatus(+props.headHeight, true);
        // emit('update:modelValue', true);
        onUpdateValue(true)

        // ensure value change can be watched
        setTimeout(() => {
          onRefresh()
        })
      } else {
        setStatus(0);
      }
    }
  };


  useEffect(() => {
    setState({
      ...state,
      duration: +animationDuration
    })

    if (modelValue) {
      setStatus(+props.headHeight, true);
    } else if (successText) {
      showSuccessTip();
    } else {
      setStatus(0, false);
    }
  }, [modelValue])

  return () => {
    const trackStyle = {
      transitionDuration: `${state.duration}ms`,
      transform: state.distance
        ? `translate3d(0,${state.distance}px, 0)`
        : '',
    };

    return (
      <div ref={root} style={style} className={'' + bem()}>
        <div
          className={'' + bem('track')}
          style={trackStyle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          <div className={'' + bem('head')} style={getHeadStyle()}>
            {renderStatus()}
          </div>
          {children}
        </div>
      </div>
    );
  };
}
