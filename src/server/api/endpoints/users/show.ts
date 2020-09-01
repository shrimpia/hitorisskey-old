import $ from 'cafy';
import define from '../../define';
import { ApiError } from '../../error';
import { ID } from '../../../../misc/cafy-id';
import { Users } from '../../../../models';
import { populateVirtualUser } from '../../../../misc/populate-virtual-user';

export const meta = {
	desc: {
		'ja-JP': '指定したユーザーの情報を取得します。'
	},

	tags: ['users'],

	requireCredential: false as const,

	params: {
		userId: {
			validator: $.optional.type(ID),
			desc: {
				'ja-JP': '対象のユーザーのID',
				'en-US': 'Target user ID'
			}
		},
		username: {
			validator: $.optional.str
		},

		host: {
			validator: $.optional.nullable.str
		}
	},

	res: {
		type: 'object' as const,
		optional: false as const, nullable: false as const,
		ref: 'User',
	},

	errors: {
		noSuchUser: {
			message: 'No such user.',
			code: 'NO_SUCH_USER',
			id: '4362f8dc-731f-4ad8-a694-be5a88922a24'
		},
	}
};

export default define(meta, async (ps, me) => {
	// 仮想ユーザーを求めていれば返す
	const v = populateVirtualUser();
	if (ps.userId === v.id || ps.username === v.username) return v;

	const isAdminOrModerator = me && (me.isAdmin || me.isModerator);

	if (ps.host) {
		throw new ApiError(meta.errors.noSuchUser);
	}

	const q: any = ps.userId != null
		? { id: ps.userId }
		: { usernameLower: ps.username!.toLowerCase(), host: null };

	const user = await Users.findOne(q);

	if (user == null || (!isAdminOrModerator && user.isSuspended)) {
		throw new ApiError(meta.errors.noSuchUser);
	}

	const { twoFactorEnabled, usePasswordLessLogin, securityKeys, username, id, isSuspended, isSilenced, isModerator, isAdmin } = await Users.pack(user, me, { detail: true });

	return { twoFactorEnabled, usePasswordLessLogin, securityKeys, username, id, isSuspended, isSilenced, isModerator, isAdmin  };
});
