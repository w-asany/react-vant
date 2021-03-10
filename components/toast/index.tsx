// import { isObject, inBrowser } from '../utils';
// import VanToast from './Toast';
// import { ToastType, ToastOptions } from './PropsType'
// const defaultOptions: ToastOptions = {
//   icon: '',
//   type: 'text',
//   message: '',
//   className: '',
//   overlay: false,
//   onClose: undefined,
//   onOpened: undefined,
//   duration: 2000,
//   iconPrefix: undefined,
//   position: 'middle',
//   transition: 'van-fade',
//   forbidClick: false,
//   loadingType: undefined,
//   overlayClass: '',
//   overlayStyle: undefined,
//   closeOnClick: false,
//   closeOnClickOverlay: false,
// };
//
// let queue: any[] = [];
// let allowMultiple = false;
// let currentOptions = { ...defaultOptions };
//
// // default options of specific type
// let defaultOptionsMap: Record<string, ToastOptions | null> = {};
//
// function parseOptions(message: string | ToastOptions): ToastOptions {
//   if (isObject(message)) {
//     return message;
//   }
//   return { message };
// }
//
// function createInstance() {
//   const { instance, unmount } = mountComponent({
//     setup() {
//       const message = ref('');
//       const { open, state, close, toggle } = usePopupState();
//
//       const onClosed = () => {
//         if (allowMultiple) {
//           queue = queue.filter((item) => item !== instance);
//           unmount();
//         }
//       };
//
//       const render = () => {
//         const attrs: Record<string, unknown> = {
//           ...state,
//           onClosed,
//           'onUpdate:show': toggle,
//         };
//
//         if (message.value) {
//           attrs.message = message.value;
//         }
//
//         return <VanToast {...attrs} />;
//       };
//
//       // rewrite render function
//       (getCurrentInstance() as any).render = render;
//
//       return {
//         open,
//         clear: close,
//         message,
//       };
//     },
//   });
//
//   return instance;
// }
//
// function getInstance() {
//   if (!queue.length || allowMultiple) {
//     const instance = createInstance();
//     queue.push(instance);
//   }
//
//   return queue[queue.length - 1];
// }
//
// function Toast(options: string | ToastOptions = {}) {
//   if (!inBrowser) {
//     return {} as ComponentInstance;
//   }
//
//   const toast = getInstance();
//   const parsedOptions = parseOptions(options);
//
//   toast.open({
//     ...currentOptions,
//     ...defaultOptionsMap[parsedOptions.type || currentOptions.type!],
//     ...parsedOptions,
//   });
//
//   return toast;
// }
//
// const createMethod = (type: ToastType) => (options: string | ToastOptions) =>
//   Toast({
//     type,
//     ...parseOptions(options),
//   });
//
// Toast.loading = createMethod('loading');
// Toast.success = createMethod('success');
// Toast.fail = createMethod('fail');
//
// Toast.clear = (all?: boolean) => {
//   if (queue.length) {
//     if (all) {
//       queue.forEach((toast) => {
//         toast.clear();
//       });
//       queue = [];
//     } else if (!allowMultiple) {
//       queue[0].clear();
//     } else {
//       queue.shift()!.clear();
//     }
//   }
// };
//
// function setDefaultOptions(options: ToastOptions): void;
// function setDefaultOptions(type: ToastType, options: ToastOptions): void;
// function setDefaultOptions(type: ToastType | ToastOptions, options?: any) {
//   if (typeof type === 'string') {
//     defaultOptionsMap[type] = options;
//   } else {
//     Object.assign(currentOptions, type);
//   }
// }
//
// Toast.setDefaultOptions = setDefaultOptions;
//
// Toast.resetDefaultOptions = (type?: ToastType) => {
//   if (typeof type === 'string') {
//     defaultOptionsMap[type] = null;
//   } else {
//     currentOptions = { ...defaultOptions };
//     defaultOptionsMap = {};
//   }
// };
//
// Toast.allowMultiple = (value = true) => {
//   allowMultiple = value;
// };
//
// Toast.install = (app: App) => {
//   app.use(VanToast as any);
//   app.config.globalProperties.$toast = Toast;
// };
//
// export default Toast;
