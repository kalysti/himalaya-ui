'use client'
import { useEffect, useMemo, useState } from 'react'
import { tuple } from '../utils/prop-types'
import { BreakpointsItem, UIThemesBreakpoints } from '../use-layout'
import useLayout from '../use-layout'

const breakpoints = tuple('xs', 'sm', 'md', 'lg', 'xl', 'mobile')
export type ResponsiveBreakpoint = (typeof breakpoints)[number]

const matchType = tuple('up', 'down', 'default')
export type ResponsiveMatchType = (typeof matchType)[number]
export type ResponsiveOptions = {
  match?: ResponsiveMatchType
  ssrMatchMedia?: () => { matches: boolean }
}

const defaultResponsiveOptions = {
  match: 'default' as ResponsiveMatchType,
}

const makeQueries = (
  bp: UIThemesBreakpoints,
  up: boolean,
  down: boolean,
): {
  [key in ResponsiveBreakpoint]: string
} => {
  const queryString = (item: BreakpointsItem) => {
    const upQuery = `(min-width: ${item.min})`
    const downQuery = `(max-width: ${item.max})`
    return up ? upQuery : down ? downQuery : `${upQuery} and ${downQuery}`
  }
  const xs = queryString(bp.xs)
  return {
    xs: xs,
    mobile: xs,
    sm: queryString(bp.sm),
    md: queryString(bp.md),
    lg: queryString(bp.lg),
    xl: queryString(bp.xl),
  }
}

const useMediaQuery = (
  breakpoint: ResponsiveBreakpoint,
  options: ResponsiveOptions = defaultResponsiveOptions,
) => {
  const { match: matchType = 'default', ssrMatchMedia = null } = options
  const supportMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'

  const theme = useLayout()
  const mediaQueries: {
    [key in ResponsiveBreakpoint]: string
  } = useMemo(() => {
    const up = matchType === 'up'
    const down = matchType === 'down'
    return makeQueries(theme.breakpoints, up, down)
  }, [theme.breakpoints, options])
  const query = useMemo(() => mediaQueries[breakpoint], [mediaQueries, breakpoint])
  const matchQuery = (q: string) => window.matchMedia(q)

  /**
   * Do nothing in the server-side rendering.
   * If server match query fucntion is simulated, return user-defined value first.
   */
  const [state, setState] = useState<boolean>(() => {
    if (supportMedia) return matchQuery(query).matches
    if (ssrMatchMedia && typeof ssrMatchMedia === 'function') {
      return ssrMatchMedia().matches
    }
    return false
  })

  useEffect(() => {
    if (!supportMedia) return
    const queryList = matchQuery(query)
    const update = () => setState(matchQuery(query).matches)
    update()

    /**
     * addListener is deprecated. EventTarget.addEventListener is recommended.
     * But in some old browsers, MediaQueryList does not inherit from EventTarget.
     */
    queryList.addListener(update)
    return () => {
      queryList.removeListener(update)
    }
  }, [supportMedia])

  return state
}

export default useMediaQuery
