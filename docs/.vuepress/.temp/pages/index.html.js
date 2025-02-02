import comp from "C:/Users/Administrator/Desktop/workspace/note/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"pageLayout\":\"home\",\"externalLinkIcon\":false,\"config\":[{\"type\":\"hero\",\"full\":true,\"background\":\"https://raw.githubusercontent.com/meishenlieshou/note/refs/heads/main/images/0ac58e8df16be00aec603e000c530c586f422d85ff5420a56b5d9e438908d732.png\",\"hero\":{\"name\":\"DIARY SPACE\",\"tagline\":null,\"text\":\"A diary is a quiet river where thoughts flow freely, carrying whispers of yesterday into the hands of tomorrow.\",\"actions\":[{\"theme\":\"brand\",\"text\":\"Blog\",\"link\":\"/blog/\"},{\"theme\":\"alt\",\"text\":\"Github →\",\"link\":\"https://github.com/meishenlieshou\"}]}}],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.17,\"words\":51},\"filePathRelative\":\"README.md\",\"categoryList\":[],\"bulletin\":false}")
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
