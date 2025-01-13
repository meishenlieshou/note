import { defineNavbarConfig } from 'vuepress-theme-plume'
import { notes } from './notes'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  {
    text: '笔记',
    items: [
      { 
        text: '学习', 
        link: '/notes/学习/',
      },
      {
        text: '问题',
        link: '/notes/问题/',
      },
      {
        text: '调研',
        link: '/notes/调研/',
      }
    ]
  },
])
