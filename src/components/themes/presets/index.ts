export interface Gradient {
  from: string
  to: string
}

export interface UIThemesPalette {
  accents_0: string
  accents_1: string
  accents_2: string
  accents_3: string
  accents_4: string
  accents_5: string
  accents_6: string
  accents_7: string
  accents_8: string
  background: string
  foreground: string
  selection: string
  secondary: string
  code: string
  border: string
  success: string
  successLighter: string
  successLight: string
  successDark: string
  error: string
  errorLighter: string
  errorLight: string
  errorDark: string
  warning: string
  warningLighter: string
  warningLight: string
  warningDark: string
  cyan: string
  cyanLighter: string
  cyanLight: string
  cyanDark: string
  violet: string
  violetLighter: string
  violetLight: string
  violetDark: string
  link: string
  purple: string
  magenta: string
  alert: string

  gradient_1: Gradient
  gradient_2: Gradient
  gradient_3: Gradient
}

export interface UIThemesExpressiveness {
  linkStyle: string
  linkHoverStyle: string
  dropdownBoxShadow: string
  scrollerStart: string
  scrollerEnd: string
  shadowSmall: string
  shadowMedium: string
  shadowLarge: string
  portalOpacity: number
}

export interface UIStyling {
  radius: string
}

export interface UIThemesFont {
  sans: string
  mono: string
  prism: string
}

export interface UIThemes {
  type: string
  font: UIThemesFont
  style: UIStyling
  palette: UIThemesPalette
  expressiveness: UIThemesExpressiveness
}
