import { defineNavbarConfig } from "vuepress-theme-plume";

export const navbar = defineNavbarConfig([
	{ text: "Home", link: "/" },
	{ text: "Blog", link: "/blog/" },
	{ text: "Tags", link: "/blog/tags/" },
	{ text: "Archives", link: "/blog/archives/" },
	{
		text: "Learnings",
		link: "/notes/learn/",
	},
	{
		text: "Problems",
		link: "/notes/pit/",
	},
	{
		text: "Researchs",
		link: "/notes/research/",
	},
]);
