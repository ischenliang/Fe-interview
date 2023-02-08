import interviewSide from './sidebar/interview'
import footnote from 'markdown-it-footnote'
// import gemoji from 'remark-gemoji'
import mark from 'markdown-it-mark'

export default {
  title: '前端进阶知识库',
  description: "Front end project and tips sharing",
  base: '/',
  // 主题
  appearance: true,
  // 删除后部紧跟的.html
  cleanUrls: true,
  srcDir: 'src/',
  outDir: 'dist/',

  head: [
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/c/font_3885313_5ymzb8w90tj.css' }],
    ['script', { src: 'https://unpkg.com/mermaid@9.3.0/dist/mermaid.min.js' }],
  ],

  // markdown配置
  markdown: {
    config: (md) => {
      // 脚标
      md.use(footnote)
      // github表情包
      // md.use(gemoji)

      // 标记
      md.use(mark)
    }
  },

  // 主题配置
  themeConfig: {
    siteTitle: '前端知识库',
    logo: "/logo.png",

    // 顶部导航栏
    nav: [
      { text: "🔥面试题库", link: "/interview/guide" },
      { text: "🤤学习路线", link: "/roadmap/" },
      { text: "🌹学习资源", link: "/resources/" },
      { text: "✍️每日一题", link: "/daily/" },
      {
        text: "❤️学习总结",
        items: [
          { text: 'HTML/CSS', link: "/note/html-css" },
          { text: 'JavaScript', link: "/note/javascript" },
          { text: 'HTTP/浏览器', link: "/note/http-browser" },
          { text: "Vue框架篇", link: "/note/vue" },
          { text: "玩转Vue3", link: "/note/vue3" },
          { text: "构建工具篇", link: "/note/build-tool" },
        ]
      },
      // {
      //   text: "🍻面经相关",
      //   items: [
      //     { text: '面试经历', link: "/examples/button" },
      //     { text: '面试技巧', link: "/examples/button" },
      //     { text: '简历技巧', link: "/examples/button" },
      //     { text: '自我介绍', link: "/examples/button" }
      //   ]
      // },
    ],

    // 显示标题级别数量
    outline: 'deep',


    // 侧边栏定义
    sidebar: {
      "/interview/": [...interviewSide],
      "/examples/": [
        {
          text: "基础组件",
          items: [
            {
              text: "Button按钮",
              link: "/examples/button",
            },
            {
              text: "Icon图标",
              link: "/examples/icon",
            },
          ],
        },
      ],
    },

    // 右上角社交账号
    socialLinks: [
      { icon: "github", link: "https://gitee.com/geeksdidi" }
    ],

    // 版权说明
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    },

    // 编辑说明
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GutHub 上编辑此页'
    },

    // 最后一次更新
    lastUpdatedText: 'Updated Date',

    // 分页栏
    docFooter: {
      prev: '上一篇文章',
      next: '下一篇文章'
    },

    // 手机端时“返回顶部”文案
    returnToTopLabel: '返回顶部',


    // algolia搜索
    // algolia: {
    //   appId: '...',
    //   apiKey: '...',
    //   indexName: '...'
    // }
  },
}