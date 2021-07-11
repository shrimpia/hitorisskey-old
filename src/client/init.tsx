import React from 'react';
import ReactDOM from 'react-dom';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import 'animate.css';
import { Index } from './pages';

document.body.innerHTML = '<div id="app"></div>';

document.body.classList.add('dark');

const App: React.VFC = () => {
	return (
		<Index />
	);
};

ReactDOM.render(<App/>, document.getElementById('app'));
　　