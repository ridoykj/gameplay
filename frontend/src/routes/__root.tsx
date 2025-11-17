import * as React from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import AppErrorComponent from '../views/error/AppErrorComponent';
import GlobalErrorComponent from '../views/error/GlobalErrorComponent';
import NotFoundPage from '../views/error/NotFoundPage';

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                name: 'description',
                content: 'My App is a web application',
            },
            {
                title: 'TestFly',
            },
        ],
        links: [
            {
                rel: 'icon',
                href: '/favicon.ico',
            },
        ],
        scripts: [
            {
                src: 'https://www.google-analytics.com/analytics.js',
            },
        ],
    }),
    scripts: () => [
        {
            children: 'console.log("body script initialized")',
        },
    ],
    component: () => (
        <>
            {/* Main Navigation */}
            <HeadContent />
            <React.Suspense fallback={<AppErrorComponent />}>
                <Outlet />
                <TanStackRouterDevtools />
            </React.Suspense>
            <Scripts />
        </>
    ),
    notFoundComponent: NotFoundPage,
    errorComponent: ({ error }) => <GlobalErrorComponent props={error} />
});