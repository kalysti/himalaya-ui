import { UIThemesPalette } from '../themes/presets'
import { NormalTypes } from '../utils/prop-types'

export type SelectColor = {
  bg: string
}

export const getColors = (
  palette: UIThemesPalette,
  status?: NormalTypes,
): SelectColor => {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      bg: palette.accents_8,
    },
    secondary: {
      bg: palette.accents_8,
    },
    success: {
      bg: palette.success,
    },
    warning: {
      bg: palette.warning,
    },
    error: {
      bg: palette.error,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
