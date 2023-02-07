export default {
  title: '前端知识库',
  description: "Front end project and tips sharing",
  base: '/',
  // 主题
  appearance: true,
  // 删除后部紧跟的.html
  cleanUrls: true,
  srcDir: 'src/',

  // 主题配置
  themeConfig: {
    siteTitle: '前端知识库',
    logo: "/logo.png",
    nav: [
      { text: "指南", link: "/guide/installation" },
      { text: "组件", link: "/examples/button" },
    ],

    // 显示标题级别数量
    outline: 'deep',


    sidebar: {
      "/guide/": [
        {
          text: "基础",
          items: [
            {
              text: "安装",
              link: "/guide/installation",
            },
            {
              text: "快速开始",
              link: "/guide/quickstart",
            },
          ],
        },
        {
          text: "进阶",
          items: [
            {
              text: "xx",
              link: "/xx",
            },
          ],
        },
      ],
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
    socialLinks: [
      { icon: "github", link: "https://gitee.com/geeksdidi" }
    ],
  },
}