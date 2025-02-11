export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"Seasoned Jack\",\"description\":\"\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/favicon.ico\"}],[\"meta\",{\"name\":\"author\",\"content\":\"Jack\"}],[\"meta\",{\"name\":\"keywords\",\"content\":\"Javascript, React, Vue, Front, Web, WebAssembly, GraphQL\"}]],\"locales\":{}}")

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
