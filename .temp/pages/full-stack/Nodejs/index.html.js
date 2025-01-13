import comp from "/works/note/.temp/pages/full-stack/Nodejs/index.html.vue"
const data = JSON.parse("{\"path\":\"/full-stack/Nodejs/\",\"title\":\"Nodejs\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Nodejs\",\"createTime\":\"2024/10/16 21:53:40\",\"permalink\":\"/full-stack/Nodejs/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":13},\"filePathRelative\":\"notes/学习/全栈技术/Nodejs.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10006,\"name\":\"notes\"},{\"id\":\"014e12\",\"sort\":10007,\"name\":\"学习\"},{\"id\":\"bf1b48\",\"sort\":10010,\"name\":\"全栈技术\"}],\"bulletin\":false}")
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
