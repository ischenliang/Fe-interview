import DefaultTheme from "vitepress/theme";
import "element-plus/dist/index.css";
import './style.scss'
// import comment from "../components/git-talk.vue"
// import ValineComment from "../components/valine-comment.vue"
// import PostMeta from "../components/post-meta.vue"
// import MermaidImg from "../components/mermaid-img.vue"
// import MathKatex from "../components/math-katex.vue"
// import LayoutTop from "../components/layout-top.vue"
import cTag from "../components/c-tag.vue"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { h } from "vue";

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // 注册组件
    // app.component("git-talk", comment)
    // app.component('valine-comment', ValineComment)
    // app.component('post-meta', PostMeta)
    // app.component('mermaid-img', MermaidImg)
    // app.component('math-katex', MathKatex)
    app.component('c-tag', cTag)

    // 全局注册element-plus组件
    import("element-plus").then((module) => {
      app.use(module);
    })
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 参考：https://vitepress.vuejs.org/guide/theme-introduction#extending-the-default-theme
      // 'layout-bottom': () => h(LayoutTop)
    })
  }
};