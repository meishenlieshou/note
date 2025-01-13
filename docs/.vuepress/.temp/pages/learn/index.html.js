import comp from "/works/note/docs/.vuepress/.temp/pages/learn/index.html.vue"
const data = JSON.parse("{\"path\":\"/learn/\",\"title\":\"学习笔记\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"学习笔记\",\"createTime\":\"2024年10月11日 07:08:43\",\"permalink\":\"/learn/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":1.12,\"words\":337},\"filePathRelative\":\"notes/学习/README.md\",\"bulletin\":false}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
