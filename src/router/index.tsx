import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Admin from '../layouts/Admin';
import Auth from '../layouts/Auth';

const Loging = lazy(async () => await import('../views/auth/login'));
const SendResetLink = lazy(async () => await import('../views/auth/send-reset-link'));

const Home = lazy(async () => await import('../views/home'));
const Editorial = lazy(async () => await import('../views/editorial'));
const Libro = lazy(async () => await import('../views/libro'));
const Solicitante = lazy(async () => await import('../views/solicitante'));
const Prestamo = lazy(async () => await import('../views/prestamo'));
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
			{
				path: '/libros',
				element: (
					<Suspense fallback={<LoadingPage />}>
						<Libro />
					</Suspense>
				),
			},
			{
				path: '/solicitantes',
				element: (
					<Suspense fallback={<LoadingPage />}>
						<Solicitante />
					</Suspense>
				),
			},
			{
				path: '/prestamos',
				element: (
					<Suspense fallback={<LoadingPage />}>
						<Prestamo />
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
