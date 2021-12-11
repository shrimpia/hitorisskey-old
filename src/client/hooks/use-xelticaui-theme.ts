import { useEffect, useState } from "react";
import { ThemeType } from "../models/unions";
import { useSelector } from "../store";

export const useXelticaUITheme = () => {
	const {themeMode} = useSelector(state => state.setting);

	const [systemTheme, setSystemTheme] = useState<ThemeType>('light');

	useEffect(() => {
		const q = window.matchMedia('(prefers-color-scheme: dark)');
		const sync = (ev: MediaQueryListEvent) => setSystemTheme(ev.matches ? 'dark' : 'light');
		setSystemTheme(q.matches ? 'dark' : 'light');
		q.addListener(sync);
		
		return () => q.removeListener(sync);
	}, []);
	
	const setTheme = (mode: ThemeType) => {
		console.log('setTheme: ' + mode);
		if (mode === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	};

	setTheme(themeMode === 'system' ? systemTheme : themeMode);
};
