import comp from "/works/note/.temp/pages/notes/问题/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E9%97%AE%E9%A2%98/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/问题/README.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10002,\"name\":\"notes\"},{\"id\":\"8482a7\",\"sort\":10003,\"name\":\"问题\"}],\"bulletin\":false}")
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
