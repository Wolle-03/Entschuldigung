import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Backend from './features/backend/App';
import { store as backendStore } from './features/backend/store';
import Frontend from './features/frontend/App';
import { store as frontendStore } from './features/frontend/store';
import Validate from './features/validate/App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={
					<Provider store={frontendStore}>
						<Frontend />
					</Provider>
				} />
				<Route path="/backend" element={
					<Provider store={backendStore}>
						<Backend />
					</Provider>
				} />
				<Route path="/validate/:signature/" element={<Validate />} />
			</Routes>
		</BrowserRouter>
	</StrictMode >
);

const title = createRoot(document.getElementById('title')!);
title.render(`${process.env.REACT_APP_NAME}`[0].toUpperCase() + `${process.env.REACT_APP_NAME}`.slice(1));