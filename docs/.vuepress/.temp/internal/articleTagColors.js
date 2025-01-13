import './articleTagColors.css'
export const articleTagColors = {"AI":"can8","预览":"8wgy","组件":"42me","markdown":"migk","混合编程":"can8","性能优化":"4tup","Vue3":"p64a","Vuex":"164f","A股":"4roh","经济":"n94r","NAS":"42me","问题解决":"4tup","梯子":"p64a","NPM":"wv7v","科学上网":"u4vv","技术":"wv7v"}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateArticleTagColors) {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ articleTagColors }) => {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  })
}
