import { defineNoteConfig, defineNotesConfig } from "vuepress-theme-plume";

const learnNote = defineNoteConfig({
	dir: "Learnings",
	link: "/learn",
	sidebar: [
		{
			text: "AI",
			prefix: "/notes/learn/ai/",
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
			prefix: "/notes/learn/open-source/",
			items: "auto", //自动获取目录下的文件
			collapsed: true,
		},
		{
			text: "Programming",
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
			text: "ReactJS",
			prefix: "/notes/learn/react/",
			items: "auto",
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
			prefix: "/notes/learn/buildTools/",
			items: "auto",
			collapsed: true,
		},
		{
			text: "Operation&Maintenance",
			prefix: "/notes/learn/om",
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
			prefix: "/notes/problems/IT/",
			collapsed: true,
		},
		{
			text: "Daily",
			items: "auto",
			prefix: "/notes/problems/daily/",
			collapsed: true,
		},
		{
			text: "Share",
			items: "auto",
			prefix: "/notes/problems/share/",
			collapsed: true,
		},
	],
});

const researchNote = defineNoteConfig({
	dir: "Research",
	link: "/research",
	sidebar: [{ text: "Evers", items: "auto" }],
});

export const notes = defineNotesConfig({
	dir: "notes",
	link: "/",
	notes: [learnNote, pitNote, researchNote],
});
