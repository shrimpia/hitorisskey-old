<template>
<section class="_card">
	<div class="_title"><fa :icon="faMicrophoneAltSlash"/> {{ $t('wordMute') }}</div>
	<div class="_content">
		<p v-text="$t('_wordMute.description')"/>
		<mk-textarea v-model="mutedWordsString">
			<span>{{ $t('_wordMute.words') }}</span>
			<template #desc>{{ $t('_wordMute.tips') }}</template>
		</mk-textarea>
		<mk-button @click="saveMutedWords()" primary inline :disabled="!changedMutedWords"><fa :icon="faSave"/> {{ $t('save') }}</mk-button>
	</div>
</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { faMicrophoneAltSlash } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import MkButton from '../../components/ui/button.vue';
import MkTextarea from '../../components/ui/textarea.vue';

export default Vue.extend({
	components: {
		MkButton, MkTextarea
	},
	data() {
		return {
			mutedWordsString: this.$store.state.settings.mutedWords.map(words => words.join(' ')).join('\n'),
			changedMutedWords: false,
			faMicrophoneAltSlash, faSave
		};
	},
	watch: {
		mutedWordsString() {
			this.changedMutedWords = true;
		}
	},
	methods: {
		saveMutedWords() {
			this.$store.dispatch('settings/set', { key: 'mutedWords', value: this.mutedWordsString.split('\n').map((line: string) => line.split(' ').filter(x => x != '')) })
			this.changedMutedWords = false;
			this.$root.dialog({
				type: 'success',
				iconOnly: true, autoClose: true
			});
		}
	}
});
</script>
