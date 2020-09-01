<template>
<div class="mmnnbwxb">
	<portal to="icon"><fa :icon="faInfoCircle"/></portal>
	<portal to="title">{{ $t('aboutMisskey') }}</portal>

	<section class="_card _vMargin">
		<div class="_content" style="text-align: center;">
			<img src="/assets/icons/512.png" alt="" style="display: block; width: 100px; margin: 0 auto; border-radius: 16px;"/>
			<div style="margin-top: 0.75em;">Hitorisskey</div>
			<div style="opacity: 0.5;">v{{ version }}</div>
		</div>
		<div class="_content">
			<div style="margin-bottom: 1em;">{{ $t('aboutMisskeyText') }}</div>
			<div style="margin-top: 1em;">📦 {{ $t('misskeySource') }}</div>
			<mk-url url="https://github.com/xeltica/hitorisskey"/>
			<div style="margin-top: 1em;">💴 {{ $t('misskeyDonate') }}</div>
			<mk-url url="https://www.patreon.com/syuilo"/>
		</div>
	</section>

	<section v-if="meta.sponsors" class="_card _vMargin">
		<div class="_title">
			<div class="_title"><fa :icon="faGem"/> {{ $t('sponsor') }}</div>
		</div>
		<div class="_content sponsors">
			<div style="margin-bottom: 1em" v-text="$t('sponsorDescription')" />
			<template v-if="meta.sponsors.premium.length > 0">
				<h1 style="margin-bottom: 1em" v-text="$t('premiumSponsor')" />
				<ul class="sponsor">
					<li v-for="s in meta.sponsors.premium" :key="s.name || s">
						<a v-if="s.url" :href="s.url" v-text="s.name || s"/>
						<span v-else v-text="s.name || s"/>
					</li>
				</ul>
			</template>
			<template v-if="meta.sponsors.normal.length > 0">
				<h1 style="margin-bottom: 1em" v-text="$t('sponsor')" />
				<ul class="sponsor">
					<li v-for="s in meta.sponsors.normal" :key="s.name || s">
						<mk-link v-if="s.url" :url="s.url" v-text="s.name || s"/>
						<span v-else v-text="s.name || s"/>
					</li>
				</ul>
			</template>
			<div style="margin-bottom: 1em" v-text="$t('thanksForSponsors')" />
			<mk-link v-if="meta.sponsors.url" :url="meta.sponsors.url" style="_buttonPrimary" v-text="$t('becomeSponsor')" />
		</div>
	</section>

	<section class="_card _vMargin info" v-if="meta">
		<div class="_content" v-if="meta.description">
			<div v-html="meta.description"></div>
		</div>
		<div class="_content table">
			<div v-if="meta.maintainerName"><b v-text="$t('administrator')"/><span v-text="meta.maintainerName"/></div>
			<div v-if="meta.maintainerEmail"><b/><span v-text="meta.maintainerEmail" /></div>
			<div><b v-text="$t('version')" /><span v-text="'v' + version" /></div>
		</div>
		<div class="_content" v-if="meta.tosUrl">
			<ul>
				<li v-if="meta.tosUrl"><a :href="meta.tosUrl" v-text="$t('tos')" /></li>
			</ul>
		</div>
		<div class="_content table">
			<div><b>Hitorisskey</b><span>v{{ version }}</span></div>
		</div>
	</section>

	<mk-instance-stats style="margin-top: var(--margin);"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faInfoCircle, faGem } from '@fortawesome/free-solid-svg-icons';
import { version } from '../config';
import MkInstanceStats from '../components/instance-stats.vue';
import MkLink from '../components/link.vue';

export default Vue.extend({
	metaInfo() {
		return {
			title: this.$t('instance') as string
		};
	},

	components: {
		MkInstanceStats,
		MkLink,
	},

	data() {
		return {
			version,
			serverInfo: null,
			faInfoCircle, faGem
		}
	},

	computed: {
		meta() {
			return this.$store.state.instance.meta;
		},
	},
});
</script>

<style lang="scss" scoped>
.mmnnbwxb {
	> .info {
		> .table {
			> div {
				display: flex;

				> * {
					flex: 1;
				}
			}
		}
	}
}

.sponsors {
	h1 {
		font-size: 100%;
		margin: 0;
	}

	> ul.sponsor {
		> li {
			> a {
				color: var(--link);
			}
		}
	}
}
</style>
