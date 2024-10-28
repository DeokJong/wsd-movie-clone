/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SigninImport } from './routes/signin'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutWishlistImport } from './routes/_layout/wishlist'
import { Route as LayoutSearchImport } from './routes/_layout/search'
import { Route as LayoutPopularImport } from './routes/_layout/popular'

// Create/Update Routes

const SigninRoute = SigninImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutWishlistRoute = LayoutWishlistImport.update({
  path: '/wishlist',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutSearchRoute = LayoutSearchImport.update({
  path: '/search',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPopularRoute = LayoutPopularImport.update({
  path: '/popular',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninImport
      parentRoute: typeof rootRoute
    }
    '/_layout/popular': {
      id: '/_layout/popular'
      path: '/popular'
      fullPath: '/popular'
      preLoaderRoute: typeof LayoutPopularImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/search': {
      id: '/_layout/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof LayoutSearchImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/wishlist': {
      id: '/_layout/wishlist'
      path: '/wishlist'
      fullPath: '/wishlist'
      preLoaderRoute: typeof LayoutWishlistImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  LayoutRoute: LayoutRoute.addChildren({
    LayoutPopularRoute,
    LayoutSearchRoute,
    LayoutWishlistRoute,
    LayoutIndexRoute,
  }),
  SigninRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout",
        "/signin"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/popular",
        "/_layout/search",
        "/_layout/wishlist",
        "/_layout/"
      ]
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/_layout/popular": {
      "filePath": "_layout/popular.tsx",
      "parent": "/_layout"
    },
    "/_layout/search": {
      "filePath": "_layout/search.tsx",
      "parent": "/_layout"
    },
    "/_layout/wishlist": {
      "filePath": "_layout/wishlist.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
