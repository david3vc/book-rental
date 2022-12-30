import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Admin from '../layouts/Admin';
import Auth from '../layouts/Auth';

const Loging = lazy(async () => await import('../views/auth/login'));
const SendResetLink = lazy(async () => await import('../views/auth/send-reset-link'));

const Home = lazy(async () => await import('../views/home'));
const Editorial = lazy(async () => await import('../views/editorial'));
const LoadingPage = (): JSX.Element => {
	return <>Loading...</>;
};

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Admin />,
		errorElement: <>Error 404</>,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<LoadingPage />}>
						<Home />
					</Suspense>
				),
			},
			{
				path: '/editoriales',
				element: (
					<Suspense fallback={<LoadingPage />}>
						<Editorial />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/login',
		element: <Auth />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<>Loading...</>}>
						<Loging />
					</Suspense>
				),
			},
		],
	},
	{
		path: '/send-reset-link',
		element: <Auth />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<>Loading...</>}>
						<SendResetLink />
					</Suspense>
				),
			},
		],
	},
];

export default createBrowserRouter(routes);
