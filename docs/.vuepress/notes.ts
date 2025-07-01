import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

const learnNote = defineNoteConfig({
	dir: "Learnings",
	link: "/learn",
	sidebar: [
		{
			text: "ReactJS",
			prefix: "/notes/learn/react/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "Fullstack",
			prefix: "/notes/learn/fullstack/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "Open Source",
			prefix: "/notes/learn/opensource/",
			items: "auto", //自动获取目录下的文件
			collapsed: true,
		},
		{
			text: "Techs",
			prefix: "/notes/learn/techs/",
			items: "auto", //自动获取目录下的文件
			collapsed: true,
		},
		{
			text: "VueJS",
			items: "auto",
			prefix: "/notes/learn/vue/",
			collapsed: true,
		},
		{
			text: "Database",
			items: "auto",
			prefix: "/notes/learn/db/",
			collapsed: true,
		},
		{
			text: "Flutter",
			prefix: "/notes/learn/flutter/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "Build Tools",
			prefix: "/notes/learn/build/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "SEO",
			prefix: "/notes/learn/seo/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "AI",
			prefix: "/notes/learn/ai/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "DevOps",
			prefix: "/notes/learn/devops/",
			items: "auto",
			collapsed: true,
		},
	],
});

const pitNote = defineNoteConfig({
	dir: "Problems",
	link: "/pit",
	sidebar: [
		{
			text: "IT",
			items: "auto",
			prefix: "/notes/pit/IT/",
			collapsed: true,
		},
		{
			text: "Daily",
			items: "auto",
			prefix: "/notes/pit/daily/",
			collapsed: true,
		},
		{
			text: "Share",
			items: "auto",
			prefix: "/notes/pit/share/",
			collapsed: true,
		},
	],
});

const researchNote = defineNoteConfig({
	dir: "Research",
	link: "/research",
	sidebar: [
		{ text: "Spanish", link: "/research/WrmHvcacG3FoYTFAKid/" },
		{ text: "Spanish", link: "/research/fdsakfdfdsa932fdsaa/" }
	],
});

export const notes = defineNotesConfig({
	dir: "notes",
	link: "/",
	notes: [learnNote, pitNote, researchNote],
});
