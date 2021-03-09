module.exports = {
  documents: [
    {
      key: 'introduce',
      name: '关于 React-Vant',
      module: () => import('@site/web/docs/introduce.md'),
      style: false,
    },
    {
      key: 'quick-start',
      name: '快速上手',
      module: () => import('@site/web/docs/quick-start.md'),
      style: false,
    },
    {
      key: 'change-log',
      name: '更新日志',
      module: () => import('@/CHANGELOG.md'),
      style: false,
    },
  ],
  components: {
    general: [
      {
        key: 'button',
        name: '按钮',
        module: () => import('@/components/button/demo.md'),
        style: true,
      },
      {
        key: 'icon',
        name: '图标',
        module: () => import('@/components/icon/demo.md'),
        style: true
      },
      {
        key: 'image',
        name: '图片',
        module: () => import('@/components/image/demo.md'),
        style: true,
      }
    ],
    form: [
      {
        key: 'field',
        name: '输入框',
        module: () => import('@/components/field/demo.md'),
        style: false,
      },
      {
        key: 'input',
        name: '文本框',
        module: () => import('@/components/input/demo.md'),
        style: false,
      },
    ],
    feedback: [
      {
        key: 'loading',
        name: '加载',
        module: () => import('@/components/loading/demo.md'),
        style: false,
      },
    ],
    view: [
      {
        key: 'badge',
        name: '徽标',
        module: () => import('@/components/badge/demo.md'),
        style: false,
      },
      {
        key: 'tag',
        name: '标签',
        module: () => import('@/components/tag/demo.md'),
        style: false
      }
    ],
    navigation: [],
    other: [],
  },
  design: [
    {
      key: 'download',
      name: '设计资源下载',
      module: () => import('@/site/web/pages/Design/Download'),
      style: false,
    },
  ],
};
