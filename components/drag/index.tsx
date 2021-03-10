import {cloneElement, ReactElement, MouseEvent, TouchEvent, ReactNode, useRef } from 'react';
import Events from '../utils/events';

export type DragEvent = MouseEvent | TouchEvent;

export interface DragState {
  startTime?: Date;
  startX?: number;
  startY?: number;
  offsetX?: number;
  offsetY?: number;
  // currentX?: number;
  // currentY?: number;
}

export interface DragProps {
  children: ReactNode;
  onDragStart?: (event?: DragEvent, dragState?: DragState) => void;
  onDragMove?: (event?: DragEvent, dragState?: DragState) => boolean;
  onDragEnd?: (event?: DragEvent, dragState?: DragState) => void;
}

export default function Drag(props: DragProps) {
  const {
    children,
    onDragStart,
    onDragMove,
    onDragEnd
  } = props


  const dragStateRef = useRef<Record<string, any>>(Object.create(null))

  const isDragStart = () => {
    const dragState = dragStateRef.current
    return dragState.startX !== undefined && dragState.startY !== undefined;
  }

  const onTouchStart = (event) => {
    const currentDragState: Record<string, any> = {
      startTime: new Date()
    }

    if (!event.touches) {
      currentDragState.startX = event.clientX;
      currentDragState.startY = event.clientY;

      Events.on(document.body, 'mousemove', onTouchMove);
      Events.on(document.body, 'mouseup', onTouchEnd);
    } else {
      const touch = event.touches[0];
      currentDragState.startX = touch.pageX;
      currentDragState.startY = touch.pageY;
    }

    const state: DragState = {
      ...currentDragState,
    }

    dragStateRef.current = state
    if (typeof onDragStart === 'function') {
      onDragStart(event, state);
    }
  };

  const onTouchMove = (event) => {
    if (!isDragStart()) return false;

    let currentX: number
    let currentY: number

    if (!event.touches) {
      currentX = event.clientX;
      currentY = event.clientY;
    } else {
      const touch = event.touches[0];
      currentX = touch.pageX;
      currentY = touch.pageY;
    }

    const offsetX = currentX! - dragStateRef.current.startX!;
    const offsetY = currentY! - dragStateRef.current.startY!;

    const state: DragState = {
      ...dragStateRef.current,
      offsetX,
      offsetY,
    };

    if (typeof onDragMove === 'function' && !onDragMove(event, state)) {
      return;
    }

    dragStateRef.current = state
  };

  const onTouchEnd = (event) => {
    if (!isDragStart()) return false;

    if (event && !event.touches) {
      Events.off(document.body, 'mousemove', onTouchMove);
      Events.off(document.body, 'mouseup', onTouchEnd);
    }

    if (typeof onDragEnd === 'function') {
      onDragEnd(event, dragStateRef.current);
    }
    dragStateRef.current = Object.create(null)
  };


  return cloneElement(children as ReactElement<any>, {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown: onTouchStart,
    onMouseMove: onTouchMove,
    onMouseUp: onTouchEnd,
  });
}
