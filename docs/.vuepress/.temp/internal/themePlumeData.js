export const themeData = {"locales":{"/":{"selectLanguageName":"English","selectLanguageText":"Languages","appearanceText":"Appearance","lightModeSwitchTitle":"Switch to light theme","darkModeSwitchTitle":"Switch to dark theme","editLinkText":"Edit this page","contributorsText":"Contributors","lastUpdatedText":"Last Updated","changelogText":"Changelog","changelogOnText":"On","changelogButtonText":"View All Changelog","copyrightText":"Copyright","copyrightAuthorText":"Copyright Ownership:","copyrightCreationOriginalText":"This article link:","copyrightCreationTranslateText":"This article is translated from:","copyrightCreationReprintText":"This article is reprint from:","copyrightLicenseText":"License under:","encryptButtonText":"Confirm","encryptPlaceholder":"Enter password","encryptGlobalText":"Only password can access this site","encryptPageText":"Only password can access this page","homeText":"Home","blogText":"Blog","tagText":"Tags","archiveText":"Archives","categoryText":"Categories","archiveTotalText":"{count} articles","footer":false,"logo":"/plume.svg","social":[{"icon":"github","link":"https://github.com/meishenlieshou"},{"icon":"twitter","link":"https://x.com/meishenlieshou"},{"icon":"youtube","link":"https://www.youtube.com/@lichengouyang7698"}],"profile":{"avatar":"/plume.svg","name":"I'm Jack","description":"I love fearlessly, wholly, endlessly. In laughter, in silence, in every fleeting moment—love is my truth, my gift, my promise. Always, everywhere, forever.","circle":false,"location":"Toronto"},"navbar":[{"text":"Home","link":"/"},{"text":"Blog","link":"/blog/"},{"text":"Tags","link":"/blog/tags/"},{"text":"Archives","link":"/blog/archives/"},{"text":"Notes","items":[{"text":"Learnings","link":"/notes/learn/"},{"text":"Problems","link":"/notes/problem/"},{"text":"Researchs","link":"/notes/research/"}]}]}},"appearance":true,"blog":{"pagination":15,"postList":true,"tags":true,"archives":true,"categories":true,"link":"/blog/","tagsLink":"/blog/tags/","archivesLink":"/blog/archives/","categoriesLink":"/blog/categories/","postCover":"right"},"navbarSocialInclude":["github","twitter","discord","facebook"],"aside":true,"outline":[2,3],"externalLinkIcon":true,"editLink":true,"contributors":true,"changelog":false,"prevPage":true,"nextPage":true,"footer":false,"logo":"/plume.svg","social":[{"icon":"github","link":"https://github.com/meishenlieshou"},{"icon":"twitter","link":"https://x.com/meishenlieshou"},{"icon":"youtube","link":"https://www.youtube.com/@lichengouyang7698"}],"profile":{"avatar":"/plume.svg","name":"I'm Jack","description":"I love fearlessly, wholly, endlessly. In laughter, in silence, in every fleeting moment—love is my truth, my gift, my promise. Always, everywhere, forever.","circle":false,"location":"Toronto"}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
