import comp from "/works/note/.temp/pages/notes/调研/test.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E8%B0%83%E7%A0%94/test.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/调研/test.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10007,\"name\":\"notes\"},{\"id\":\"f36e18\",\"sort\":10010,\"name\":\"调研\"}],\"bulletin\":false}")
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
