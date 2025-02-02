import { defineThemeConfig } from "vuepress-theme-plume";
import { navbar } from "./navbar";
import { notes } from "./notes";

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
	logo: "/plume.svg",

	appearance: true, // 配置 深色模式

	footer: {
		message: "This is Jack's note",
		copyright: ``,
	},

	social: [
		{ icon: "github", link: "https://github.com/meishenlieshou" },
		{ icon: "twitter", link: "https://x.com/meishenlieshou" },
		{ icon: "youtube", link: "https://www.youtube.com/@lichengouyang7698" },
	],
	// navbarSocialInclude: ['github'], // 允许显示在导航栏的 social 社交链接
	// aside: true, // 页内侧边栏， 默认显示在右侧
	// outline: [2, 3], // 页内大纲， 默认显示 h2, h3

	/**
	 * 文章版权信息
	 * @see https://theme-plume.vuejs.press/guide/features/copyright/
	 */
	// copyright: true,

	// prevPage: true,   // 是否启用上一页链接
	// nextPage: true,   // 是否启用下一页链接
	// createTime: true, // 是否显示文章创建时间

	/* 站点页脚 */
	// footer: {
	//   message: 'Power by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
	//   copyright: '',
	// },

	/**
	 * @see https://theme-plume.vuejs.press/config/basic/#profile
	 */
	profile: {
		avatar: "/plume.svg",
		name: "I'm Jack",
		description:
			"I love fearlessly, wholly, endlessly. In laughter, in silence, in every fleeting moment—love is my truth, my gift, my promise. Always, everywhere, forever.",
		circle: false,
		location: "Toronto",
	},

	navbar,
	notes,

	/**
	 * 公告板
	 * @see https://theme-plume.vuejs.press/guide/features/bulletin/
	 */
	// bulletin: {
	//   layout: 'top-right',
	//   contentType: 'markdown',
	//   title: '公告板标题',
	//   content: '公告板内容',
	// },

	/* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
	// transition: {
	//   page: true,        // 启用 页面间跳转过渡动画
	//   postList: true,    // 启用 博客文章列表过渡动画
	//   appearance: 'fade',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
	// },
});
