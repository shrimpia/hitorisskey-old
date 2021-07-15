import { apiAsync } from ".";

export const fetchEveryoneNotesAsync = async (limit: number = 10) => {
	return (await apiAsync('notes/local-timeline', {limit})) as any[];
};

export const fetchMetaAsync = async () => {
	return (await apiAsync('meta'));
};
