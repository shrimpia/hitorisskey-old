export type Settings = typeof defaultSettings;
export type DeviceSettings = typeof defaultDeviceSettings;

export const defaultSettings = {
	mutedWords: [],
};

export const defaultDeviceSettings = {
	darkMode: false,
	syncDeviceDarkMode: true,

	autoReload: false,

	imageNewTab: false,
	animatedMfm: true,
	disableShowingAnimatedImages: false,
	animation: true,
	useOsNativeEmojis: false,
	lang: null,
};
