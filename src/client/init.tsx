import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/react';

import { Index } from './pages';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import 'animate.css';
import { globalStyle } from './globalStyle';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://use.fontawesome.com/releases/v5.15.3/css/all.css';
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
　　