export const sidebar = {"/":{"/learn":{"items":[{"text":"关于学习","link":"/notes/学习/README.md"},{"text":"VueJS","items":[{"text":"Vuepress","link":"/notes/学习/Vue/关于vuepress.md"},{"text":"Vuex","link":"/notes/学习/Vue/学习vuex.md"}],"collapsed":false},{"text":"React"}],"prefix":"/notes/学习/"},"/pit":{"items":[{"text":"问题是如何解决的","link":"/notes/问题是如何解决的/README.md"},{"text":"Synology添加自启动命令","link":"/notes/问题是如何解决的/Synology添加自启动命令.md"},{"text":"Webpack+requireJS项目ts改造","link":"/notes/问题是如何解决的/Webpack+requireJS项目ts改造.md"},{"text":"为什么走了VPN代理地址","link":"/notes/问题是如何解决的/为什么走了VPN代理地址.md"},{"text":"桑德贝租房","link":"/notes/问题是如何解决的/桑德贝租房.md"}],"prefix":"/notes/问题是如何解决的/"}},"__auto__":{},"__home__":{}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSidebar) {
    __VUE_HMR_RUNTIME__.updateSidebar(sidebar)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ sidebar }) => {
    __VUE_HMR_RUNTIME__.updateSidebar(sidebar)
  })
}
