import comp from "/works/note/docs/.vuepress/.temp/pages/pit/index.html.vue"
const data = JSON.parse("{\"path\":\"/pit/\",\"title\":\"掉坑记录\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"掉坑记录\",\"createTime\":\"2024年10月10日 08:21:47\",\"permalink\":\"/pit/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":1.57,\"words\":470},\"filePathRelative\":\"notes/问题是如何解决的/README.md\",\"bulletin\":false}")
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
