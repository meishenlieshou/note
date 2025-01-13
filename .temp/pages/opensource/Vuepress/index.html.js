import comp from "/works/note/.temp/pages/opensource/Vuepress/index.html.vue"
const data = JSON.parse("{\"path\":\"/opensource/Vuepress/\",\"title\":\"Vuepress\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vuepress\",\"createTime\":\"2024/10/16 13:56:25\",\"permalink\":\"/opensource/Vuepress/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":13},\"filePathRelative\":\"notes/学习/开源项目/Vuepress.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10006,\"name\":\"notes\"},{\"id\":\"014e12\",\"sort\":10007,\"name\":\"学习\"},{\"id\":\"a2cc8e\",\"sort\":10009,\"name\":\"开源项目\"}],\"bulletin\":false}")
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
