import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/react';

import { Index } from './pages';
import { globalStyle } from './globalStyle';

import 'animate.css';
import 'xeltica-ui/dist/css/xeltica-ui.min.css';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css';
document.head.appendChild(link);
document.body.innerHTML = '<div id="app"></div>';

// document.body.classList.add('dark');

const App: React.VFC = () => {
	return (
		<>
			<Global styles={globalStyle} />
			<Index />
		</>
	);
};

ReactDOM.render(<App/>, document.getElementById('app'));
　　