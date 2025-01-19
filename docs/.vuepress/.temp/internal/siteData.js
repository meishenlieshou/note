export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"zh-CN\",\"title\":\"JackSimNote\",\"description\":\"\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/favicon.ico\"}],[\"meta\",{\"name\":\"author\",\"content\":\"Jack\"}],[\"meta\",{\"name\":\"keywords\",\"content\":\"vuepress, theme, plume\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
