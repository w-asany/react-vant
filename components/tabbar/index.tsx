import React from "react";
import { createNamespace } from '../utils';
import { TabBarProps } from "./PropsType";
// import { BORDER_TOP_BOTTOM } from '../utils/constant';
// import { callInterceptor } from '../utils/interceptor';
// import { TabBarProps } from "./PropsType";


const [bem] = createNamespace('tabbar');

console.log(bem)

export const TABBAR_KEY = 'vanTabbar';

export default function TabBar(props: TabBarProps) {
  console.log('props', props)
  const {
    border,
    zIndex,
    placeholder,
    items,
    safeAreaInsetBottom,
    fixed,
    style,
  } = props

  const isUnfit = () => {
    return safeAreaInsetBottom !== null ? !safeAreaInsetBottom : !fixed
  };

  console.log(placeholder, items, border)
  console.log(isUnfit)

  return <div style={{
    zIndex: Number(zIndex),
    ...style
  }}>

  </div>
}


// export  function TabBar(props: TabBarProps) {
//   const { fixed, zIndex, border } = props;
//   const root = useRef()
//   const { linkChildren } = useChildren(TABBAR_KEY);
//   const renderPlaceholder = usePlaceholder(root, bem);
//
//
//
//   const renderTabbar = () => {
//
//     return (
//       <div
//         ref={root}
//         style={{ zIndex: zIndex !== undefined ? +zIndex : undefined }}
//         class={[
//           bem({ unfit: isUnfit(), fixed }),
//           { [BORDER_TOP_BOTTOM]: border },
//         ]}
//       >
//         {slots.default?.()}
//       </div>
//     );
//   };
//
//   const setActive = (active: number | string) => {
//     if (active !== props.modelValue) {
//       callInterceptor({
//         interceptor: props.beforeChange,
//         args: [active],
//         done() {
//           emit('update:modelValue', active);
//           emit('change', active);
//         },
//       });
//     }
//   };
//
//   linkChildren({ props, setActive });
//
//   return () => {
//     if (props.fixed && props.placeholder) {
//       return renderPlaceholder(renderTabbar);
//     }
//     return renderTabbar();
//   };
//   return <></>
// }
