<template>
<div class="gafaadew">
	<div class="form" :class="{ fixed }">
		<input v-show="useCw" ref="cw" class="cw" v-model="cw" :placeholder="$t('annotation')" v-autocomplete="{ model: 'cw' }">
		<textarea v-model="text" class="text" :class="{ withCw: useCw }" ref="text" :disabled="posting" :placeholder="placeholder" v-autocomplete="{ model: 'text' }" @keydown="onKeydown"></textarea>
		<footer>
			<button class="_button" v-tooltip="$t('useCw')" @click="useCw = !useCw" :class="{ active: useCw }"><fa :icon="faEyeSlash"/></button>
			<button class="_button" v-tooltip="$t('emoji')" @click="insertEmoji"><fa :icon="faLaughSquint"/></button>
			<button class="_button" v-tooltip="$t('officialNote')" v-if="$store.state.i.isAdmin || $store.state.i.isModerator" @click="announcement = !announcement" :class="{ active: announcement }"><fa :icon="faBullhorn"/></button>
			<button class="_button" v-tooltip="$t('makeNotePrivate')" @click="setVisibility" :class="{ active: isPrivate }"><fa :icon="isPrivate ? faLock : faUnlock"/></button>
			<div class="right">
				<span class="text-count" :class="{ over: trimmedLength(text) > max }">{{ max - trimmedLength(text) }}</span>
				<button class="submit _buttonPrimary" :disabled="!canPost" @click="post"><fa :icon="faPaperPlane"/></button>
			</div>
		</footer>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faPaperPlane, faUpload, faUnlock, faPhotoVideo, faCloud, faBullhorn, faLock } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash, faLaughSquint } from '@fortawesome/free-regular-svg-icons';
import insertTextAtCursor from 'insert-text-at-cursor';
import { length } from 'stringz';
import { parse } from '../../mfm/parse';
import { unique } from '../../prelude/array';

export default Vue.extend({
	components: {
	},

	props: {
		initialText: {
			type: String,
			required: false
		},
		initialNote: {
			type: Object,
			required: false
		},
		instant: {
			type: Boolean,
			required: false,
			default: false
		},
		fixed: {
			type: Boolean,
			required: false,
			default: false
		}
	},

	data() {
		return {
			posting: false,
			text: '',
			useCw: false,
			cw: null,
			isPrivate: false,
			announcement: false,
			autocomplete: null,
			recentHashtags: JSON.parse(localStorage.getItem('hashtags') || '[]'),
			faPaperPlane, faUpload, faUnlock, faEyeSlash, faLaughSquint, faPhotoVideo, faCloud, faBullhorn, faLock
		};
	},

	computed: {
		draftId(): string {
			return 'note';
		},

		placeholder() {
			const xs = [
				this.$t('_postForm._placeholders.a'),
				this.$t('_postForm._placeholders.b'),
				this.$t('_postForm._placeholders.c'),
				this.$t('_postForm._placeholders.d'),
				this.$t('_postForm._placeholders.e'),
				this.$t('_postForm._placeholders.f')
			];
			const x = xs[Math.floor(Math.random() * xs.length)];

			return x;
		},

		submitText() {
			return this.$t('note');
		},

		canPost(): boolean {
			return !this.posting &&
				1 <= this.text.length &&
				(length(this.text.trim()) <= this.max);
		},

		max(): number {
			return this.$store.state.instance.meta ? this.$store.state.instance.meta.maxNoteTextLength : 1000;
		}
	},

	mounted() {
		if (this.initialText) {
			this.text = this.initialText;
		}

		this.focus();

		this.isPrivate = this.$store.state.deviceUser.visibility === 'followers';

		this.$nextTick(() => {
			this.focus();
		});

		this.$nextTick(() => {
			// 書きかけの投稿を復元
			if (!this.instant) {
				const draft = JSON.parse(localStorage.getItem('drafts') || '{}')[this.draftId];
				if (draft) {
					this.text = draft.data.text;
					this.useCw = draft.data.useCw;
					this.cw = draft.data.cw;
				}
			}

			// 削除して編集
			if (this.initialNote) {
				const init = this.initialNote;
				this.text = init.text ? init.text : '';
				this.cw = init.cw;
				this.isPrivate = init.visibility === 'followers';
				this.announcement = init.announcement;
				this.useCw = init.cw != null;
			}

			this.$nextTick(() => this.watch());
		});
	},

	methods: {
		watch() {
			this.$watch('text', () => this.saveDraft());
			this.$watch('useCw', () => this.saveDraft());
			this.$watch('cw', () => this.saveDraft());
		},
		
		setVisibility() {
			this.isPrivate = !this.isPrivate;
			this.$store.commit('deviceUser/setVisibility', this.isPrivate ? 'followers' : 'public');
			this.$root.soundDirect(this.isPrivate ? 'lock' : 'unlock');
		},

		trimmedLength(text: string) {
			return length(text.trim());
		},

		addTag(tag: string) {
			insertTextAtCursor(this.$refs.text, ` #${tag} `);
		},

		focus() {
			(this.$refs.text as any).focus();
		},

		clear() {
			this.text = '';
		},

		onKeydown(e) {
			if ((e.which == 10 || e.which == 13) && (e.ctrlKey || e.metaKey) && this.canPost) this.post();
		},

		saveDraft() {
			if (this.instant) return;

			const data = JSON.parse(localStorage.getItem('drafts') || '{}');

			data[this.draftId] = {
				updatedAt: new Date(),
				data: {
					text: this.text,
					useCw: this.useCw,
					cw: this.cw,
				}
			};

			localStorage.setItem('drafts', JSON.stringify(data));
		},

		deleteDraft() {
			const data = JSON.parse(localStorage.getItem('drafts') || '{}');

			delete data[this.draftId];

			localStorage.setItem('drafts', JSON.stringify(data));
		},

		post() {
			this.posting = true;
			this.$root.api('notes/create', {
				text: this.text == '' ? undefined : this.text,
				announcement: this.announcement,
				visibility: this.isPrivate ? 'followers' : 'public',
				cw: this.useCw ? this.cw || '' : undefined,
			}).then(data => {
				this.clear();
				this.deleteDraft();
				this.$emit('posted');
			}).catch(err => {
			}).then(() => {
				this.posting = false;
				this.announcement = false;
			});

			if (this.text && this.text != '') {
				const hashtags = parse(this.text).filter(x => x.node.type === 'hashtag').map(x => x.node.props.hashtag);
				const history = JSON.parse(localStorage.getItem('hashtags') || '[]') as string[];
				localStorage.setItem('hashtags', JSON.stringify(unique(hashtags.concat(history))));
			}
		},

		cancel() {
			this.$emit('cancel');
		},

		async insertEmoji(ev) {
			const vm = this.$root.new(await import('./emoji-picker.vue').then(m => m.default), {
				source: ev.currentTarget || ev.target
			}).$once('chosen', emoji => {
				insertTextAtCursor(this.$refs.text, emoji);
				vm.close();
			});
		},
	}
});
</script>

<style lang="scss" scoped>
.gafaadew {
	background: var(--panel);

	> .form {
		max-width: 500px;
		margin: 0 auto;
		padding-top: 16px;

		&.fixed {
			max-width: unset;
		}

		> .preview {
			padding: 16px;
		}

		> .with-quote {
			margin: 0 0 8px 0;
			color: var(--accent);

			> button {
				padding: 4px 8px;
				color: var(--accentAlpha04);

				&:hover {
					color: var(--accentAlpha06);
				}

				&:active {
					color: var(--accentDarken30);
				}
			}
		}

		> .cw,
		> .text {
			display: block;
			box-sizing: border-box;
			padding: 0 24px;
			margin: 0;
			width: 100%;
			font-size: 16px;
			border: none;
			border-radius: 0;
			background: transparent;
			color: var(--fg);
			font-family: inherit;

			@media (max-width: 500px) {
				padding: 0 16px;
			}

			&:focus {
				outline: none;
			}

			&:disabled {
				opacity: 0.5;
			}
		}

		> .cw {
			z-index: 1;
			padding-bottom: 8px;
		}

		> .text {
			max-width: 100%;
			min-width: 100%;
			min-height: 90px;

			@media (max-width: 500px) {
				min-height: 80px;
			}

			&.withCw {
				padding-top: 8px;
			}
		}

		> .mk-uploader {
			margin: 8px 0 0 0;
			padding: 8px;
		}

		> .file {
			display: none;
		}

		> footer {
			padding: 0 16px 16px 16px;
			position: relative;

			@media (max-width: 500px) {
				padding: 0 8px 8px 8px;
			}

			> button {
				display: inline-block;
				padding: 0;
				margin: 0;
				font-size: 16px;
				width: 48px;
				height: 48px;
				border-radius: 6px;

				&:hover {
					background: var(--geavgsxy);
				}

				&.active {
					color: var(--accent);
				}
			}

		> .right {
			position: absolute;
			bottom: 0;
			right: 0;

			> .text-count {
				opacity: 0.7;
				line-height: 66px;

				@media (max-width: 500px) {
					line-height: 50px;
				}
			}

			> .submit {
				margin: 16px;
				padding: 0 12px;
				line-height: 34px;
				font-weight: bold;
				vertical-align: bottom;
				border-radius: 4px;

				@media (max-width: 500px) {
					margin: 8px;
				}

				&:disabled {
					opacity: 0.7;
				}
			}
		}
		}
	}
}
</style>
