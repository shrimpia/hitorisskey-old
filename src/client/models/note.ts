import { Emoji } from "./emoji";
import { User } from "./User";

export interface Note {
	id: string;
	createdAt: Date;
	userId: string;
	user: User;
	text: string;
	cw: string;
	visibility: string;
	repliesCount: number;
	reactions: Record<string, number>;
	emojis: Emoji[];
	isTanzaku: boolean;
	isMyNote: boolean;
	isAnnouncement: boolean;
}
