import React, { useEffect, useState } from "react";
import { createNamespace, addUnit, getSizeStyle } from '../utils';
import { LoadingProps } from "./PropsType";


const [bem] = createNamespace('loading');

const SpinIcon: JSX.Element[] = [];
for (let i = 0; i < 12; i++) {
  SpinIcon.push(<i/>);
}

const CircularIcon = (
  <svg className={'' + bem('circular')} viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="20" fill="none"/>
  </svg>
);

export default function Loading(props: LoadingProps) {
  const {size, color, children, type, vertical, textSize, textColor} = props

  const [spinnerStyle, setSpinnerStyle] = useState({
    color,
  })
  useEffect(() => {
    setSpinnerStyle({
      color,
      ...getSizeStyle(props.size),
    })
  }, [size])

  const renderText = () => {
    if (children) {
      return (
        <span
          className={'' + bem('text')}
          style={{
            fontSize: addUnit(textSize),
            color: textColor ?? color,
          }}
        >
            {children}
          </span>
      );
    }
  };

  return (
    <div className={'' + bem([type, {vertical}])}>
          <span className={'' + bem('spinner', type)} style={spinnerStyle}>
            {type === 'spinner' ? SpinIcon : CircularIcon}
          </span>
      {renderText()}
    </div>
  );
}
