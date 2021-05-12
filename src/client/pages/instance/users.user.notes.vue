<template>
<div class="vrcsvlkm" v-if="user">
	<portal to="title" v-if="user"><mk-user-name :user="user" :nowrap="false" class="name"/></portal>
	<portal to="avatar" v-if="user"><mk-avatar class="avatar" :user="user" :disable-preview="true"/></portal>

	<x-notes v-if="pagination" ref="tl" class="_content" :pagination="pagination" @before="before" @after="after"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import XNotes from '../../components/notes.vue';
import Progress from '../../scripts/loading';

export default Vue.extend({
	components: {
		XNotes
	},
	
	data() {
		return {
			user: null,
			pagination: null as any,
		};
	},

	watch: {
		$route: 'fetch'
	},

	created() {
		this.fetch();
	},

	methods: {
		async fetch() {
			this.before();
			this.user = await this.$root.api('users/show', { userId: this.$route.params.user });
			// this.info = await this.$root.api('admin/show-user', { userId: this.$route.params.user });
			this.pagination = {
				endpoint: 'admin/show-users-notes',
				limit: 10,
				params: () => ({
					userId: this.$route.params.user,
				}),
			};
			this.after();
		},
		before() {
			Progress.start();
		},
		after() {
			Progress.done();
		}
	}
});
</script>

<style lang="scss" scoped>
.vrcsvlkm {
	display: flex;
	flex-direction: column;

	> ._card {
		> .actions {
			display: flex;
			box-sizing: border-box;
			text-align: left;
			align-items: center;
			margin-top: 16px;
			margin-bottom: 16px;
		}

		> .rawdata {
			> pre > code {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
