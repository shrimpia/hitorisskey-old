<template>
<div class="vrcsvlkm" v-if="user && info">
	<portal to="title" v-if="user"><mk-user-name :user="user" :nowrap="false" class="name"/></portal>
	<portal to="avatar" v-if="user"><mk-avatar class="avatar" :user="user" :disable-preview="true"/></portal>

	<section class="_card _vMargin">
		<div class="_title">
			<mk-avatar class="avatar" :user="user"/>
			<mk-user-name class="name" :user="user"/>
			<span class="acct">@{{ user | acct }}</span>
			<span class="staff" v-if="user.isAdmin"><fa :icon="faBookmark"/></span>
			<span class="staff" v-if="user.isModerator"><fa :icon="farBookmark"/></span>
			<span class="punished" v-if="user.isSilenced"><fa :icon="faMicrophoneSlash"/></span>
			<span class="punished" v-if="user.isSuspended"><fa :icon="faSnowflake"/></span>
		</div>
		<div class="_content actions">
			<div style="flex: 1; padding-left: 1em;">
				<mk-switch v-if="$store.state.i.isAdmin && (this.moderator || !user.isAdmin)" @change="toggleModerator()" v-model="moderator">{{ $t('moderator') }}</mk-switch>
				<mk-switch @change="toggleSilence()" v-model="silenced">{{ $t('silence') }}</mk-switch>
				<mk-switch @change="toggleSuspend()" v-model="suspended">{{ $t('suspend') }}</mk-switch>
			</div>
			<div style="flex: 1; padding-left: 1em;">
				<mk-button @click="resetPassword"><fa :icon="faKey"/> {{ $t('resetPassword') }}</mk-button>
				<mk-button @click="deleteAllFiles"><fa :icon="faTrashAlt"/> {{ $t('deleteAllFiles') }}</mk-button>
			</div>
		</div>
		<div class="_content">
			<router-link :to="`${user.id}/notes`" class="_link"><fa :icon="faUser"/> {{ $t('timeline') }}</router-link>
		</div>
		<div class="_content rawdata">
			<pre><code>{{ JSON.stringify(info, null, 2) }}</code></pre>
		</div>
	</section>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faTimes, faBookmark, faKey, faSync, faMicrophoneSlash, faExternalLinkSquareAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake, faTrashAlt, faBookmark as farBookmark  } from '@fortawesome/free-regular-svg-icons';
import MkButton from '../../components/ui/button.vue';
import MkSwitch from '../../components/ui/switch.vue';
import Progress from '../../scripts/loading';

export default Vue.extend({
	components: {
		MkButton,
		MkSwitch,
	},

	data() {
		return {
			user: null,
			info: null,
			moderator: false,
			silenced: false,
			suspended: false,
			faTimes, faBookmark, farBookmark, faKey, faSync, faMicrophoneSlash, faSnowflake, faTrashAlt, faExternalLinkSquareAlt, faUser
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
			Progress.start();
			this.user = await this.$root.api('users/show', { userId: this.$route.params.user });
			this.info = await this.$root.api('admin/show-user', { userId: this.$route.params.user });
			this.moderator = this.info.isModerator;
			this.silenced = this.info.isSilenced;
			this.suspended = this.info.isSuspended;
			Progress.done();
		},

		/** 処理対象ユーザーの情報を更新する */
		async refreshUser() {
			this.user = await this.$root.api('users/show', { userId: this.user.id });
			this.info = await this.$root.api('admin/show-user', { userId: this.user.id });
		},

		openProfile() {
			window.open(Vue.filter('userPage')(this.user, null, true), '_blank');
		},

		async updateRemoteUser() {
			await this.$root.api('admin/update-remote-user', { userId: this.user.id }).then(res => {
				this.$root.dialog({
					type: 'success',
					iconOnly: true, autoClose: true
				});
			});
			await this.refreshUser();
		},

		async resetPassword() {
			const dialog = this.$root.dialog({
				type: 'waiting',
				iconOnly: true
			});

			this.$root.api('admin/reset-password', {
				userId: this.user.id,
			}).then(({ password }) => {
				this.$root.dialog({
					type: 'success',
					text: this.$t('newPasswordIs', { password })
				});
			}).catch(e => {
				this.$root.dialog({
					type: 'error',
					text: e
				});
			}).finally(() => {
				dialog.close();
			});
		},

		async toggleSilence() {
			const confirm = await this.$root.dialog({
				type: 'warning',
				showCancelButton: true,
				text: this.silenced ? this.$t('silenceConfirm') : this.$t('unsilenceConfirm'),
			});
			if (confirm.canceled) {
				this.silenced = !this.silenced;
			} else {
				await this.$root.api(this.silenced ? 'admin/silence-user' : 'admin/unsilence-user', { userId: this.user.id });
				await this.refreshUser();
			}
		},

		async toggleSuspend() {
			const confirm = await this.$root.dialog({
				type: 'warning',
				showCancelButton: true,
				text: this.suspended ? this.$t('suspendConfirm') : this.$t('unsuspendConfirm'),
			});
			if (confirm.canceled) {
				this.suspended = !this.suspended;
			} else {
				await this.$root.api(this.suspended ? 'admin/suspend-user' : 'admin/unsuspend-user', { userId: this.user.id });
				await this.refreshUser();
			}
		},

		async toggleModerator() {
			await this.$root.api(this.moderator ? 'admin/moderators/add' : 'admin/moderators/remove', { userId: this.user.id });
			await this.refreshUser();
		},

		async deleteAllFiles() {
			const confirm = await this.$root.dialog({
				type: 'warning',
				showCancelButton: true,
				text: this.$t('deleteAllFilesConfirm'),
			});
			if (confirm.canceled) return;
			const process = async () => {
				await this.$root.api('admin/delete-all-files-of-a-user', { userId: this.user.id });
				this.$root.dialog({
					type: 'success',
					iconOnly: true, autoClose: true
				});
			};
			await process().catch(e => {
				this.$root.dialog({
					type: 'error',
					text: e.toString()
				});
			});
			await this.refreshUser();
		},
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
