import $ from 'cafy';
import define from '../../define';
import { Users } from '../../../../models';

export const meta = {
	tags: ['admin'],

	requireCredential: true as const,
	requireModerator: true,

	params: {
		limit: {
			validator: $.optional.num.range(1, 100),
			default: 10
		},

		offset: {
			validator: $.optional.num.min(0),
			default: 0
		},

		sort: {
			validator: $.optional.str.or([
				'+follower',
				'-follower',
				'+createdAt',
				'-createdAt',
				'+updatedAt',
				'-updatedAt',
			]),
		},

		state: {
			validator: $.optional.str.or([
				'all',
				'available',
				'admin',
				'moderator',
				'adminOrModerator',
				'silenced',
				'suspended',
			]),
			default: 'all'
		},

		origin: {
			validator: $.optional.str.or([
				'combined',
				'local',
				'remote',
			]),
			default: 'local'
		},

		username: {
			validator: $.optional.str,
			default: null
		},

		hostname: {
			validator: $.optional.str,
			default: null
		}
	}
};

export default define(meta, async (ps, me) => {
	const query = Users.createQueryBuilder('user');

	switch (ps.state) {
		case 'available': query.where('user.isSuspended = FALSE'); break;
		case 'admin': query.where('user.isAdmin = TRUE'); break;
		case 'moderator': query.where('user.isModerator = TRUE'); break;
		case 'adminOrModerator': query.where('user.isAdmin = TRUE OR isModerator = TRUE'); break;
		case 'alive': query.where('user.updatedAt > :date', { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) }); break;
		case 'silenced': query.where('user.isSilenced = TRUE'); break;
		case 'suspended': query.where('user.isSuspended = TRUE'); break;
	}

	if (ps.username) {
		query.andWhere('user.usernameLower like :username', { username: ps.username.toLowerCase() + '%' });
	}

	switch (ps.sort) {
		case '+createdAt': query.orderBy('user.createdAt', 'DESC', 'NULLS LAST'); break;
		case '-createdAt': query.orderBy('user.createdAt', 'ASC', 'NULLS LAST'); break;
		case '+updatedAt': query.orderBy('user.updatedAt', 'DESC', 'NULLS LAST'); break;
		case '-updatedAt': query.orderBy('user.updatedAt', 'ASC', 'NULLS LAST'); break;
		default: query.orderBy('user.id', 'ASC', 'NULLS LAST'); break;
	}

	query.take(ps.limit!);
	query.skip(ps.offset);

	const users = await query.getMany();

	return await Users.packMany(users, me, { detail: true });
});
