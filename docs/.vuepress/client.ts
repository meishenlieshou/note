import { defineClientConfig } from "vuepress/client";
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import JackNoteList from "./theme/components/jack-note-list.vue";
// import CustomComponent from './theme/components/Custom.vue'
// import './theme/styles/custom.css'

export default defineClientConfig({
	enhance({ app }) {
		// built-in components
		app.component("JackNoteList", JackNoteList);
		// app.component('NpmBadge', NpmBadge)
		// app.component('NpmBadgeGroup', NpmBadgeGroup)
		// app.component('Swiper', Swiper) // you should install `swiper`

		// your custom components
		// app.component('CustomComponent', CustomComponent)
	},
});
