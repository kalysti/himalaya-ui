'use client'

import React, { PropsWithChildren, useEffect } from 'react'
import { MobileMenuProps } from '.'
import Drawer from '../drawer'
import { InnerScroll } from '../scroll'
import { useConfigs } from '../use-context/config-context'
import { useMobileMenu } from '../use-mobile-menu/mobile-menu-context'
import useScale, { withScale } from '../use-scale'

const MobileMenu: React.FC<PropsWithChildren<MobileMenuProps>> = ({
  children,
  direction = 'left',
  animationTime = 300,
}) => {
  const { SCALES } = useScale()

  const { swipeToRight, swipedToLeft, onSwiping } = useConfigs()

  const { isEnabled, setIsEnabled } = useMobileMenu()

  useEffect(() => {}, [swipeToRight])

  useEffect(() => {}, [swipedToLeft])

  useEffect(() => {}, [onSwiping])

  return (
    <>
      <Drawer
        transitionTime={animationTime}
        width={SCALES.width(1, '80%')}
        radius={0}
        visible={isEnabled}
        wrapClassName={'sidebar-drawer-nav'}
        onClose={() => setIsEnabled(false)}
        placement={direction}>
        <div className="sidebar-nav-content">
          <InnerScroll width={'100%'} height={'100%'} type="vertical">
            {children}
          </InnerScroll>
        </div>
      </Drawer>

      <style jsx>{`
        :global(.sidebar-nav-content) {
          text-align: left;
          height: 100%;
          positon: relative;
          overflow: hidden;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default withScale(MobileMenu)
