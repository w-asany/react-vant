import React from 'react'
import Icon from '../icon';
import { TagProps } from "./PropsType";
import { createNamespace } from "../utils";

const [bem] = createNamespace('tag');

export default function Tag(props: TagProps) {
  const {
    size,
    color,
    mark,
    plain = false,
    round = false,
    textColor,
    closeable = false,
    type = 'default',
    children,
    onClose
  } = props

  const handleClose = (event: any) => {
    event.stopPropagation();
    onClose?.()
  };

  const getStyle = () => {
    if (plain) {
      return {
        color: textColor || color,
      };
    }
    return {
      color: textColor,
      background: color,
    };
  };

  const classes: Record<string, boolean> = {mark, plain, round};
  if (size) {
    classes[size] = !!size;
  }

  const CloseIcon = closeable && (
    <Icon type="wrong" className={'' + bem('close')} onClick={handleClose}/>
  );

  return (
    <span style={getStyle()} className={'' + bem([classes, type])}>
      {children}
      {CloseIcon}
    </span>
  );

  // return (
  //   // TODO remove Transition
  //   // <Transition name={props.closeable ? 'van-fade' : undefined}>
  //     {props.show ? renderTag() : null}
  //   // </Transition>
  // );
}


