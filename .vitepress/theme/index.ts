import DefaultTheme from "vitepress/theme";
import "element-plus/dist/index.css";
import './style.scss'

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    // 全局注册element-plus组件
    import("element-plus").then((module) => {
      app.use(module);
    })
  },
};