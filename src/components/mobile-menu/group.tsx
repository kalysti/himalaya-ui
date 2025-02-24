'use client'
import { ChevronRight, ChevronDown } from '@geist-ui/icons'
import React, { PropsWithChildren, ReactNode, useRef, useState } from 'react'
import { INavigationItem } from './index'
import useClasses from '../use-classes'
import useScale, { withScale } from '../use-scale'
import useTheme from '../use-theme'

export interface NavigationGroupProps extends INavigationItem {
  expanded?: boolean
}

const NavigationGroup: React.FC<PropsWithChildren<NavigationGroupProps>> = ({
  children,
  title,
  expanded = false,
}) => {
  const theme = useTheme()
  const { SCALES } = useScale()
  const ref = useRef<HTMLAnchorElement | null>(null)
  const [isExpanded, setIsExpanded] = useState(expanded)

  const btnClass = useClasses({
    'menu-item': true,
    'has-chevron': !!children,
  })

  const childs = (childElements: ReactNode) => {
    return (
      <div className={useClasses({ 'sub-child-grid': true, 'grid-hide': !isExpanded })}>
        {childElements}
        <style jsx>{`
          .sub-child-grid {
            display: grid;
            height: auto;
            margin-left: ${SCALES.pr(1.5)};
            grid-template-rows: repeat(1, 1fr);
          }

          .grid-hide {
            display: none;
          }

          .grid-show {
            display: grid;
          }
        `}</style>
      </div>
    )
  }

  const handleGroupClick = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    setIsExpanded(!isExpanded)
  }

  return (
    <div className="navigation-group-outer">
      <div className="navigation-group">
        <a className={btnClass} ref={ref} onClick={e => handleGroupClick(e)}>
          <span className="chevron-right">
            <span className={useClasses({ chevron: true })}>
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </span>
          <span>{title}</span>
        </a>
        {childs(children)}
      </div>
      <style jsx>{`
        .navigation-group-outer {
          display: inline-flex;
          height: auto;
          align-items: center;
        }

        .navigation-group {
          display: flex;
          position: relative;
          height: auto;
          flex-direction: column;
        }

        .chevron {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .chevron-right {
          position: relative;
          height: 100%;
          margin-right: ${SCALES.pr(0.2)};
          bottom: 0;
          display: flex;
          align-items: center;
        }

        .menu-item {
          position: relative;
          box-sizing: border-box;
          cursor: pointer;
          outline: 0;
          gap: 3px;
          white-space: nowrap;
          background-color: transparent;
          color: ${theme.palette.accents_5};
          user-select: none;
          display: flex;
          align-items: center;
          user-select: none;
          font-size: ${SCALES.font(0.875)};
          line-height: normal;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.875)} ${SCALES.pr(0.55)} ${SCALES.pb(0.875)}
            ${SCALES.pl(0.55)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0.2)} ${SCALES.mb(0)} ${SCALES.ml(0.2)};
          z-index: 1;
        }

        .has-chevron {
          padding-right: ${SCALES.pr(1.3)};
        }

        .menu-item:after {
          position: absolute;
          content: '';
          bottom: -1px;
          left: 0;
          right: 0;
          width: 100%;
          height: 2px;
          border-radius: 4px;
          transform: scaleX(0.75);
          background-color: ${theme.palette.foreground};
          transition:
            opacity,
            transform 200ms ease-in;
          opacity: 0;
        }

        :global(.menu-item) span.label {
          z-index: 1;
          padding: 8px 12px;
        }

        .backdrop {
          background: ${theme.palette.accents_2};
          position: absolute;
          border-radius: 5px;
          width: 100%;
          height: 100%;
          left: 0;
          z-index: 0;
          bottom: 0;
        }

        :global(.tooltip-content.menu-popover-item > .inner) {
          padding: 0 !important;
        }

        :global(.tooltip-content.menu-popover-item) {
          max-width: 600px;
        }
      `}</style>
    </div>
  )
}
NavigationGroup.displayName = 'HimalayaNavigationItem'

export default withScale(NavigationGroup)
