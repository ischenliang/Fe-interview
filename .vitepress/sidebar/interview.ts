const arr = [
  {
    text: "导读",
    link: "/interview/guide",
  },
  {
    text: "HTML/CSS",
    items: [
      {
        text: "HTML篇",
        link: "/interview/html",
      },
      {
        text: "CSS篇",
        link: '/interview/css'
        // items: [
        //   { text: 'CSS', link: "/interview/css" },
        //   // { text: 'CSS3', link: "/interview/css3" },
        //   { text: 'Less', link: "/interview/less", },
        //   { text: 'Sass', link: "/interview/sass", },
        //   { text: 'Stylus', link: "/interview/stylus", }
        // ]
      },
    ],
  },
  {
    text: "JavaScript/jQuery/Typescript",
    items: [
      {
        text: "JavaScript篇",
        items: [
          { text: 'JavaScript基础', link: '/interview/javascript-base' },
          // { text: 'ECMAScript', link: '/interview/javascript-es' },
          // { text: 'websocket', link: '/interview/javascript-ws' },
          // { text: 'json', link: '/interview/javascript-json' },
          { text: 'ajax', link: '/interview/javascript-ajax' },
          { text: '设计模式', link: '/interview/javascript-mode' },
          { text: '手写题', link: '/interview/javascript-write' }
        ]
      },
      { text: "jQuery", link: "/interview/jquery" },
      { text: "Typescript", link: "/interview/typescript" }
    ],
  },
  {
    text: "Vue框架篇",
    items: [
      { text: 'vue', link: "/interview/vue" },
      { text: 'vue-router', link: "/interview/vue-router" },
      { text: 'vuex', link: "/interview/vuex" },
      { text: 'pinia', link: "/interview/pinia" },
      { text: 'nuxt.js', link: "/interview/nuxt" },
      { text: 'uniapp', link: "/interview/uniapp" },
        { text: 'axios', link: '/interview/axios' },
    ]
    // items: [
    //   { text: "vue2.x", link: "/interview/vue2" },
    //   { text: "vue-router3.x", link: "/interview/vue-router3" },
    //   // { text: "vue-cli", link: "/interview/vue-cli" },
    //   { text: "vuex3.x", link: "/interview/vuex3" },
    //   { text: "vue3.x", link: "/interview/vue3" },
    //   { text: "vue-router4.x", link: "/interview/vue-router4" },
    //   { text: "pinia", link: "/interview/pinia" },
    //   { text: "nuxt.js", link: "/interview/nuxt" },
    //   { text: "uniapp", link: "/interview/uniapp" },
    //   { text: 'axios', link: '/interview/axios' },
    // ],
  },
  {
    text: "构建工具篇",
    items: [
      { text: 'npm', link: '/interview/npm' },
      { text: "vue-cli", link: "/interview/vue-cli" },
      { text: "webpack", link: "/interview/webpack" },
      { text: "vite", link: "/interview/vite" },
      { text: "gulp", link: "/interview/gulp" },
      { text: "rollup", link: "/interview/rollup" },
      { text: "babel", link: "/interview/babel" },
      { text: 'eslint', link: '/interview/eslint' },
      { text: 'prettier', link: '/interview/prettier' }
    ],
  },
  {
    text: "Node篇",
    link: "/interview/node"
    // items: [
    //   { text: "node基础", link: "/interview/node" },
    //   { text: "koa全家桶", link: "/interview/koa" },
    //   { text: "express全家桶", link: "/interview/express" },
    //   { text: "egg全家桶", link: "/interview/egg" }
    // ],
  },
  {
    text: '测试篇',
    link: '/interview/test'
    // items: [
    //   { text: 'jest', link: '/interview/jest' },
    //   { text: 'mocha', link: '/interview/mocha' }
    // ]
  },
  {
    text: 'HTTP/浏览器',
    items: [
      { text: 'HTTP篇', link: '/interview/http' },
      { text: '浏览器篇', link: '/interview/browser' }
    ]
  },
  {
    text: '性能优化/安全',
    items: [
      { text: '性能优化篇', link: '/interview/performance' },
      { text: '安全篇', link: '/interview/security' }
    ]
  },
  {
    text: '微前端篇',
    items: [
      { text: 'qiankun.js', link: '/interview/qiankun' },
      { text: '无界', link: '/interview/wujie' }
    ]
  },
  {
    text: "UI框架篇",
    items: [
      { text: 'bootstrap篇', link: '/interview/bootstrap' },
      { text: 'layui篇', link: '/interview/layui' },
      {
        text: "element篇",
        items: [
          { text: 'element-ui', link: "/interview/element-ui" },
          { text: 'element-plus', link: "/interview/element-plus" }
        ],
      },
      {
        text: "iview篇",
        items: [
          { text: 'iview-ui', link: "/interview/iview-ui" },
          { text: 'iview-plus', link: "/interview/iview-plus" }
        ],
      },
      {
        text: "ant-design篇",
        items: [
          { text: 'ant-design-vue2', link: "/interview/ant-design2" },
          { text: 'ant-design-vue3', link: "/interview/ant-design3" }
        ],
      },
      {
        text: "vant篇",
        items: [
          { text: 'vant3-vue2', link: "/interview/vant3" },
          { text: 'vant4-vue3', link: "/interview/vant4" }
        ],
      },
    ],
  },
  {
    text: '数据统计篇',
    items: [
      { text: 'echarts.js', link: '/interview/echarts' },
      { text: 'd3.js', link: '/interview/d3' },
      { text: 'hightcharts.js', link: '/interview/hightcharts' }
    ]
  },
  {
    text: '静态网站生成器篇',
    items: [
      { text: 'vuepress', link: '/interview/vuepress' },
      { text: 'vitepress', link: '/interview/vitepress' }
    ]
  },
  {
    text: '插件开发篇',
    items: [
      { text: 'chrome插件', link: '/interview/chrome-plugin' },
      { text: 'vscode插件', link: '/interview/vscode-plugin' }
    ]
  },
  {
    text: '其他篇',
    items: [
      { text: 'Git', link: '/interview/git' },
      { text: 'svn', link: '/interview/svn' },
      { text: 'Linux', link: '/interview/linux' },
      { text: '数据库', link: '/interview/database' },
      { text: 'GraphQL', link: '/interview/graphql' }
    ]
  }
]
export default arr