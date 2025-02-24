import { HorzScaleOptions } from '../../model/time-scale'

export const timeScaleOptionsDefaults: HorzScaleOptions = {
  rightOffset: 0,
  barSpacing: 6,
  minBarSpacing: 0.5,
  fixLeftEdge: false,
  fixRightEdge: false,
  lockVisibleTimeRangeOnResize: false,
  rightBarStaysOnScroll: false,
  borderVisible: true,
  borderColor: '#2B2B43',
  visible: true,
  timeVisible: false,
  secondsVisible: true,
  shiftVisibleRangeOnNewBar: true,
  ticksVisible: false,
  uniformDistribution: false,
  minimumHeight: 0,
}
