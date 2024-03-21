/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const HomeLazyImport = createFileRoute('/home')()
const IndexLazyImport = createFileRoute('/')()
const HomePlacesLazyImport = createFileRoute('/home/places')()
const HomeMeLazyImport = createFileRoute('/home/me')()
const HomeChatsLazyImport = createFileRoute('/home/chats')()
const HomeUserIdLazyImport = createFileRoute('/home/$userId')()

// Create/Update Routes

const HomeLazyRoute = HomeLazyImport.update({
  path: '/home',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/home.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const HomePlacesLazyRoute = HomePlacesLazyImport.update({
  path: '/places',
  getParentRoute: () => HomeLazyRoute,
} as any).lazy(() => import('./routes/home.places.lazy').then((d) => d.Route))

const HomeMeLazyRoute = HomeMeLazyImport.update({
  path: '/me',
  getParentRoute: () => HomeLazyRoute,
} as any).lazy(() => import('./routes/home.me.lazy').then((d) => d.Route))

const HomeChatsLazyRoute = HomeChatsLazyImport.update({
  path: '/chats',
  getParentRoute: () => HomeLazyRoute,
} as any).lazy(() => import('./routes/home.chats.lazy').then((d) => d.Route))

const HomeUserIdLazyRoute = HomeUserIdLazyImport.update({
  path: '/$userId',
  getParentRoute: () => HomeLazyRoute,
} as any).lazy(() => import('./routes/home.$userId.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/home': {
      preLoaderRoute: typeof HomeLazyImport
      parentRoute: typeof rootRoute
    }
    '/home/$userId': {
      preLoaderRoute: typeof HomeUserIdLazyImport
      parentRoute: typeof HomeLazyImport
    }
    '/home/chats': {
      preLoaderRoute: typeof HomeChatsLazyImport
      parentRoute: typeof HomeLazyImport
    }
    '/home/me': {
      preLoaderRoute: typeof HomeMeLazyImport
      parentRoute: typeof HomeLazyImport
    }
    '/home/places': {
      preLoaderRoute: typeof HomePlacesLazyImport
      parentRoute: typeof HomeLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  HomeLazyRoute.addChildren([
    HomeUserIdLazyRoute,
    HomeChatsLazyRoute,
    HomeMeLazyRoute,
    HomePlacesLazyRoute,
  ]),
])

/* prettier-ignore-end */
