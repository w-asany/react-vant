import React, { ReactNode } from 'react'
import { isDef, createNamespace } from '../utils';
import { isNumeric } from '../utils/validate/number';
import { BadgeProps } from "./PropsType";

const [bem] = createNamespace('badge');

export default function Badge(props: BadgeProps) {

  const {content, children, tag = '', dot, max, color, offset} = props

  console.log(tag as ReactNode)

  const hasContent = () => isDef(content) && props.content !== ''

  const renderContent = () => {
    if (!dot && hasContent()) {

      if (isDef(max) && isNumeric(content!) && +content > max) {
        return `${max}+`;
      }

      return content;
    }
  };

  const renderBadge = () => {
    if (hasContent() || dot) {
      const style: Record<string, any> = {
        background: color,
      };

      if (offset) {
        const [x, y] = offset;
        if (children) {
          style.top = `${y}px`;
          style.right = `${-x}px`;
        } else {
          style.marginTop = `${y}px`;
          style.marginLeft = `${x}px`;
        }
      }

      return (
        <div
          className={`${bem({dot})}`}
          style={style}
        >
          {renderContent()}
        </div>
      );
    }
  };

  // if (children) {
  //   return React.createElement(tag, {
  //     className: bem('wrapper'),
  //     children: <>
  //       {children}
  //       {renderBadge()}
  //     </>
  //   });
  // }

  return renderBadge();
}


