export default function(settings, note) {
	const isMyNote = note.isMyNote;
	console.log(settings);

	const includesMutedWords = (text: string) =>
		text
			? settings.mutedWords.some(q => q.length > 0 && !q.some(word =>
				word.startsWith('/') && word.endsWith('/') ? !(new RegExp(word.substr(1, word.length - 2)).test(text)) : !text.includes(word)))
			: false;

	return !isMyNote && includesMutedWords(note.text);
}
