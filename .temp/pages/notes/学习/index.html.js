import comp from "/works/note/.temp/pages/notes/学习/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E5%AD%A6%E4%B9%A0/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/学习/README.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10002,\"name\":\"notes\"},{\"id\":\"014e12\",\"sort\":10004,\"name\":\"学习\"}],\"bulletin\":false}")
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
