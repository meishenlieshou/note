import comp from "C:/Users/Administrator/Desktop/workspace/note/.temp/pages/learn/index.html.vue"
const data = JSON.parse("{\"path\":\"/learn/\",\"title\":\"README\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"README\",\"createTime\":\"2025/01/08 22:57:20\",\"permalink\":\"/learn/\",\"author\":\"JackSim\",\"categories\":[\"学习\"],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.05,\"words\":16},\"filePathRelative\":\"notes/学习/README.md\",\"bulletin\":false}")
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
