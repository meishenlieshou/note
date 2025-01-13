import comp from "/works/note/.temp/pages/notes/学习/全栈技术/Nodejs.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E5%AD%A6%E4%B9%A0/%E5%85%A8%E6%A0%88%E6%8A%80%E6%9C%AF/Nodejs.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/学习/全栈技术/Nodejs.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10006,\"name\":\"notes\"},{\"id\":\"014e12\",\"sort\":10007,\"name\":\"学习\"},{\"id\":\"bf1b48\",\"sort\":10010,\"name\":\"全栈技术\"}],\"bulletin\":false}")
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
