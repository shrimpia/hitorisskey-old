import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

import { Index } from './pages/Index';
import { globalStyle } from './globalStyle';
import { store } from './store';
import { Layout } from './layout';

import 'animate.css';
import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

const App: React.VFC = () => {
	return (
		<>
		<Global styles={globalStyle} />
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route path="/" element={<Index />}>
							</Route>
						</Routes>
					</Layout>
				</BrowserRouter>
			</PersistGate>
		</Provider>
		</>
	);
};

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css';
document.head.appendChild(link);
document.body.innerHTML = '<div id="app"></div>';

ReactDOM.render(<App/>, document.getElementById('app'));
　　