import DefaultTheme from "vitepress/theme";
import "element-plus/dist/index.css";
import './style.scss'
import comment from "../components/git-talk.vue"

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    // 注册组件
    app.component("git-talk", comment)

    // 全局注册element-plus组件
    import("element-plus").then((module) => {
      app.use(module);
    })
  },
};