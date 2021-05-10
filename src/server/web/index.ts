/**
 * Web Client Server
 */

import * as fs from 'fs';
import ms = require('ms');
import * as Koa from 'koa';
import * as Router from '@koa/router';
import * as send from 'koa-send';
import * as favicon from 'koa-favicon';
import * as views from 'koa-views';
import * as glob from 'glob';
import * as MarkdownIt from 'markdown-it';

import { fetchMeta } from '../../misc/fetch-meta';
import { genOpenapiSpec } from '../api/openapi/gen-spec';
import config from '../../config';
import { Notes } from '../../models';
import getNoteSummary from '../../misc/get-note-summary';
import locales = require('../../../locales');

const markdown = MarkdownIt({
	html: true
});

const client = `${__dirname}/../../client/`;

// Init app
const app = new Koa();

// Init renderer
app.use(views(__dirname + '/views', {
	extension: 'pug',
	options: {
		version: config.version,
		config
	}
}));

// Serve favicon
app.use(favicon(`${__dirname}/../../../assets/favicon.png`));

// Common request handler
app.use(async (ctx, next) => {
	// IFrameの中に入れられないようにする
	ctx.set('X-Frame-Options', 'DENY');
	await next();
});

// Init router
const router = new Router();

//#region static assets

router.get('/assets/*', async ctx => {
	await send(ctx as any, ctx.path, {
		root: client,
		maxage: ms('7 days'),
	});
});

// Apple touch icon
router.get('/apple-touch-icon.png', async ctx => {
	await send(ctx as any, '/assets/apple-touch-icon.png', {
		root: client
	});
});

// ServiceWorker
router.get(/^\/sw\.(.+?)\.js$/, async ctx => {
	await send(ctx as any, `/assets/sw.${ctx.params[0]}.js`, {
		root: client
	});
});


router.get('/robots.txt', async ctx => {
	await send(ctx as any, '/assets/robots.txt', {
		root: client
	});
});

//#endregion

// URL preview endpoint
router.get('/url', require('./url-preview'));

router.get('/api.json', async ctx => {
	ctx.body = genOpenapiSpec();
});

router.get('/docs.json', async ctx => {
	const lang = ctx.query.lang;
	if (!Object.keys(locales).includes(lang)) {
		ctx.body = [];
		return;
	}
	const paths = glob.sync(__dirname + `/../../../src/docs/*.${lang}.md`);
	const docs: { path: string; title: string; }[] = [];
	for (const path of paths) {
		const md = fs.readFileSync(path, { encoding: 'utf8' });
		const parsed = markdown.parse(md, {});
		if (parsed.length === 0) return;

		const buf = [...parsed];
		const headingTokens = [];

		// もっとも上にある見出しを抽出する
		while (buf[0].type !== 'heading_open') {
			buf.shift();
		}
		buf.shift();
		while (buf[0].type as string !== 'heading_close') {
			const token = buf.shift();
			if (token) {
				headingTokens.push(token);
			}
		}

		docs.push({
			path: path.split('/').pop()!.split('.')[0],
			title: markdown.renderer.render(headingTokens, {}, {})
		});
	}

	ctx.body = docs;
});

// Note
router.get('/notes/:note', async ctx => {
	const note = await Notes.findOne(ctx.params.note);

	if (note) {
		const _note = await Notes.pack(note);
		const meta = await fetchMeta();
		await ctx.render('note', {
			note: _note,
			// TODO: Let locale changeable by instance setting
			summary: getNoteSummary(_note, locales['ja-JP']),
			instanceName: meta.name || 'Hitorisskey',
			icon: meta.iconUrl
		});

		if (['public', 'home'].includes(note.visibility)) {
			ctx.set('Cache-Control', 'public, max-age=180');
		} else {
			ctx.set('Cache-Control', 'private, max-age=0, must-revalidate');
		}

		return;
	}

	ctx.status = 404;
});

router.get('/flush', async ctx => {
	await ctx.render('flush');
});

// Render base html for all requests
router.get('*', async ctx => {
	const meta = await fetchMeta();
	await ctx.render('base', {
		img: meta.bannerUrl,
		title: meta.name || 'Hitorisskey',
		instanceName: meta.name || 'Hitorisskey',
		desc: meta.description,
		icon: meta.iconUrl
	});
	ctx.set('Cache-Control', 'public, max-age=300');
});

// Register router
app.use(router.routes());

module.exports = app;
