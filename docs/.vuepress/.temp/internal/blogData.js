export const blogPostData = [{"path":"/read/Jo1uDAd76bLlvYid/","title":"《Effective TypeScript》","categoryList":[{"id":"0fb9cf","sort":10001,"name":"reads"}],"tags":["typescript","English book"],"createTime":"2025/02/02 08:40:05","lang":"en-US","excerpt":""},{"path":"/blog/hwup3mht/","title":"月开支预算","categoryList":[{"id":"eea645","sort":10000,"name":"thoughts"}],"createTime":"2024/11/03 13:46:53","lang":"en-US","excerpt":""},{"path":"/blog/IAFDKLDSDSXX/","title":"大A疯了","categoryList":[{"id":"eea645","sort":10000,"name":"thoughts"}],"tags":["A股","经济"],"createTime":"2024/10/17 02:26:26","lang":"en-US","excerpt":""}]

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogPostData) {
    __VUE_HMR_RUNTIME__.updateBlogPostData(blogPostData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ blogPostData }) => {
    __VUE_HMR_RUNTIME__.updateBlogPostData(blogPostData)
  })
}
