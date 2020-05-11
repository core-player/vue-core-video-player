module.exports = {
  base: '/vue-core-video-player/',
  title: '',
  description: 'vue-core-video-player is a lightweight video player For Vue.js. It is easy to use and friendly development to developers',
  themeConfig: {
    logo: 'https://img1.wxzxzj.com/logo-white-mini.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: 'https://github.com/core-player/vue-core-video-player-examples' },
      { text: 'Github', link: 'https://github.com/core-player/vue-core-video-player' }
    ],
    search: false,
    locales: {
      '/' : {
        sidebar: [
          {
            title: 'Introduction',
            path: '/',
            children: [
              ['/get-started', 'Get Started'],
              ['/configuration', 'Configuration'],
              ['/i18n', 'i18n']
            ]
          },
          {
            title: 'In-Depth',
            path: '/',
            collapsable: false, 
            children: [
              ['/events', 'Events'],
            ]
          },
          {
            title: 'Plugins',
            path: '/',
            collapsable: false, 
            children: [
              ['/core-hls', 'HLS'],
            ]
          }
        ]
      },
      '/zh/' : {
        sidebar: [
          {
            title: '简介',   // 必要的
            path: '/zh/',      // 可选的, 应该是一个绝对路径
            collapsable: true, 
            children: [
              ['/zh/get-started', '快速开始'],
              ['/zh/configuration', '基本配置'],
              ['/zh/i18n', 'i18n']
            ]
          },
          {
            title: '进阶',
            path: '/',
            collapsable: false, 
            children: [
              ['/events', 'Events'],
            ]
          },
          {
            title: '插件支持',
            path: '/',
            collapsable: false, 
            children: [
              ['/core-hls', 'HLS'],
            ]
          }
        ]
      }
    }
    
  },
  locales: {
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US',
      title: '',
      description: 'vue-core-video-player is a lightweight video player For Vue.js. It is easy to use and friendly development to developers'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '',
      description: 'vue-core-video-player 是一款基于 vue.js 的轻量级播放插件， 它非常易于上手，对开发非常友好。易于配置，完善的事件订阅系统和 UI 扩展'
    }
  }
}