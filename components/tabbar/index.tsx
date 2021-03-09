import React  from "react";
import { createNamespace } from '../utils';
// import { BORDER_TOP_BOTTOM } from '../utils/constant';
// import { callInterceptor } from '../utils/interceptor';
// import { TabBarProps } from "./PropsType";


const [bem] = createNamespace('tabbar');

console.log(bem)

export const TABBAR_KEY = 'vanTabbar';

export default function TabBar() {
  return <></>
}


// export default function TabBar(props: TabBarProps) {
//
//   const root = useRef()
//   const { linkChildren } = useChildren(TABBAR_KEY);
//   const renderPlaceholder = usePlaceholder(root, bem);
//
//   const isUnfit = () => {
//     if (props.safeAreaInsetBottom !== null) {
//       return !props.safeAreaInsetBottom;
//     }
//     // enable safe-area-inset-bottom by default when fixed
//     return !props.fixed;
//   };
//
//   const renderTabbar = () => {
//     const { fixed, zIndex, border } = props;
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



