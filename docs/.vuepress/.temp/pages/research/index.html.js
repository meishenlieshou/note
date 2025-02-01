import comp from "C:/Users/Administrator/Desktop/workspace/note/docs/.vuepress/.temp/pages/research/index.html.vue"
const data = JSON.parse("{\"path\":\"/research/\",\"title\":\"README\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"README\",\"createTime\":\"2025/01/08 22:57:20\",\"permalink\":\"/research/\",\"author\":\"JackSim\",\"categories\":[\"调研\"],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.05,\"words\":16},\"filePathRelative\":\"notes/research/README.md\",\"bulletin\":false}")
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
