'use client'
import React from 'react'
import useTheme from '../use-theme'
import useScale, { withScale } from '../use-scale'
import useClasses from '../use-classes'
import useLayout from '../use-layout'

interface Props {
  disableAutoMargin?: boolean
  className?: string
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CardFooterProps = Props & NativeAttrs

const CardFooterComponent: React.FC<React.PropsWithChildren<CardFooterProps>> = ({
  children,
  className = '',
  disableAutoMargin = false,
  ...props
}: CardFooterProps) => {
  const theme = useTheme()
  const { SCALES } = useScale()
  const layout = useLayout()
  const classes = useClasses({ 'auto-margin': !disableAutoMargin }, className)

  return (
    <footer className={classes} {...props}>
      {children}
      <style jsx>{`
        footer {
          padding: ${SCALES.py(0.66)} ${SCALES.px(1.31)};
          display: flex;
          align-items: center;
          overflow: hidden;
          color: inherit;
          background-color: inherit;
          font-size: ${SCALES.font(0.875)};
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.style.radius};
          border-bottom-right-radius: ${theme.style.radius};
          min-height: ${SCALES.height(3.3)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .auto-margin :global(*) {
          margin-top: 0;
          margin-bottom: 0;
          margin-right: ${layout.gapQuarter};
        }
      `}</style>
    </footer>
  )
}

CardFooterComponent.displayName = 'HimalayaCardFooter'
const CardFooter = withScale(CardFooterComponent)
export default CardFooter
