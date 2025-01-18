import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

const learnNote = defineNoteConfig({
	dir: "学习",
	link: "/learn",
	sidebar: [
		{
			text: "人工智能",
			prefix: "/notes/学习/人工智能/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "全栈技术",
			prefix: "/notes/学习/全栈技术/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "开源项目", //类别名称
			prefix: "/notes/学习/开源项目/", //限定目录
			items: "auto", //自动获取目录下的文件
			collapsed: true,
		},
		{
			text: "原生技术", //类别名称
			prefix: "/notes/学习/原生技术/", //限定目录
			items: "auto", //自动获取目录下的文件
			collapsed: true,
		},
		{
			text: "Vue生态",
			items: [
				{ text: "Vuepress", link: "/notes/学习/Vue/关于vuepress.md" },
				{ text: "Pipia", link: "/notes/学习/Vue/学习Pipia.md" },
				{
					text: "Vue知识点",
					items: "auto",
					prefix: "/notes/学习/Vue/Vue知识点/",
					collapsed: false,
				},
				{ text: "Vite", link: "/notes/学习/Vue/Vite.md" },
			],
			collapsed: true,
		},
		{
			text: "数据库",
			items: "auto",
			prefix: "/notes/学习/数据库/",
			collapsed: true,
		},
		{
			text: "React生态",
			prefix: "/notes/学习/React/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "Flutter",
			prefix: "/notes/学习/Flutter/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "人机交互",
			prefix: "/notes/学习/人机交互/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "前端工程化",
			prefix: "/notes/学习/编译工具链/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "运维",
			prefix: "/notes/学习/运维/",
			items: "auto",
			collapsed: true,
		},
	],
});

const pitNote = defineNoteConfig({
	dir: "问题",
	link: "/pit",
	sidebar: [
		{
			text: "IT问题",
			items: "auto",
			prefix: "/notes/问题/IT/",
			collapsed: true,
		},
		{
			text: "日常问题",
			items: "auto",
			prefix: "/notes/问题/日常问题/",
			collapsed: true,
		},
		{
			text: "分享",
			items: "auto",
			prefix: "/notes/问题/生活分享/",
			collapsed: true,
		},
	],
});

const researchNote = defineNoteConfig({
	dir: "调研",
	link: "/research",
	sidebar: [{ text: "历史调研", items: "auto" }],
});

export const notes = defineNotesConfig({
	dir: "notes",
	link: "/",
	notes: [learnNote, pitNote, researchNote],
});
