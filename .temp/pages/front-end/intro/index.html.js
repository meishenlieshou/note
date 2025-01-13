import comp from "/works/note/.temp/pages/front-end/intro/index.html.vue"
const data = JSON.parse("{\"path\":\"/front-end/intro/\",\"title\":\"Wasm技术\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Wasm技术\",\"createTime\":\"2024-10-16T18:34:06.000Z\",\"permalink\":\"/front-end/intro/\",\"author\":\"JamesLeo\",\"categories\":[\"前端技术\"],\"tags\":[\"混合编程\",\"性能优化\"],\"description\":null,\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":2.8,\"words\":839},\"filePathRelative\":\"notes/学习/UI开发语言生态/Wasm技术.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10006,\"name\":\"notes\"},{\"id\":\"014e12\",\"sort\":10007,\"name\":\"学习\"},{\"id\":\"bda210\",\"sort\":10009,\"name\":\"UI开发语言生态\"}],\"bulletin\":false}")
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
