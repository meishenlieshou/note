import comp from "/works/note/docs/.vuepress/.temp/pages/article/ibdctrae/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/ibdctrae/\",\"title\":\"自定义组件\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"自定义组件\",\"tags\":[\"预览\",\"组件\"],\"createTime\":\"2025/01/07 00:10:45\",\"permalink\":\"/article/ibdctrae/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.07,\"words\":20},\"filePathRelative\":\"preview/custom-component.example.md\",\"categoryList\":[{\"id\":\"5ebeb6\",\"sort\":10001,\"name\":\"preview\"}],\"bulletin\":false}")
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
