import $ from 'cafy';
import define from '../../define';
import { Notes } from '../../../../models';
import { ApiError } from '../../error';
import { tanzakuColors } from '../../../../types';
import { isTanabata } from '../../../../misc/is-tanabata';

export const meta = {
	desc: {
		'ja-JP': '自分の短冊を編集します。',
		'en-US': 'Edit my tanzaku.'
	},

	tags: ['notes'],

	requireCredential: true as const,

	params: {
		tanzakuColor: {
			validator: $.str.or(tanzakuColors as unknown as string[]),
		},
	},

	errors: {
		noSuchTanzaku: {
			message: 'You have no owned tanzaku.',
			code: 'NO_SUCH_TANZAKU',
			id: 'b5c90186-4ab0-49c8-9bba-a1f76c282ba4'
		},

		outOfTanabataSeason: {
			message: 'It is not Tanabata season today',
			code: 'OUT_OF_TANABATA_SEASON',
			id: 'cdeb9e85-a582-4cf7-9646-65f4f2d0bea4'
		},
	}
};

export default define(meta, async (ps, user) => {
	const tanzaku = await Notes.findOne({
		userId: user.id,
		tanabataYear: new Date().getFullYear(),
	});

	if (!tanzaku) throw new ApiError(meta.errors.noSuchTanzaku);

	// 7/1 - 7/7 でなければエラー
	if (!isTanabata()) {
		throw new ApiError(meta.errors.outOfTanabataSeason);
	}

	await Notes.update(tanzaku.id, {
		tanzakuColor: ps.tanzakuColor as typeof tanzakuColors[number],
	});
});
