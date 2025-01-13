import comp from "/works/note/.temp/pages/tech/Gemini/index.html.vue"
const data = JSON.parse("{\"path\":\"/tech/Gemini/\",\"title\":\"Gemini\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Gemini\",\"createTime\":\"2024-10-16T22:08:05.000Z\",\"permalink\":\"/tech/Gemini/\",\"categories\":[\"人工智能\"],\"tags\":[\"AI\"],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":3.95,\"words\":1185},\"filePathRelative\":\"notes/学习/人工智能/Gemini.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10006,\"name\":\"notes\"},{\"id\":\"014e12\",\"sort\":10007,\"name\":\"学习\"},{\"id\":\"39cff9\",\"sort\":10008,\"name\":\"人工智能\"}],\"bulletin\":false}")
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
