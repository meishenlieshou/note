import comp from "C:/Users/Administrator/Desktop/workspace/note/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"pageLayout\":\"home\",\"externalLinkIcon\":false,\"config\":[{\"type\":\"banner\",\"full\":true,\"bannerMask\":0.5,\"banner\":\"https://raw.githubusercontent.com/meishenlieshou/note/refs/heads/main/images/bg.jpg\",\"hero\":{\"name\":\"DIARY SPACE\",\"tagline\":\"Jack\",\"text\":\"A diary is a quiet river where thoughts flow freely, carrying whispers of yesterday into the hands of tomorrow.\",\"actions\":[{\"theme\":\"brand\",\"text\":\"Blog\",\"link\":\"/blog/\"},{\"theme\":\"alt\",\"text\":\"Github →\",\"link\":\"https://github.com/meishenlieshou\"}]}}],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.18,\"words\":54},\"filePathRelative\":\"README.md\",\"categoryList\":[],\"bulletin\":false}")
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
