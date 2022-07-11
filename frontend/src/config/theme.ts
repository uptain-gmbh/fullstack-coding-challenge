const colors = {
  light: "#EFEFEF",
  dark: "#444444",
  red: "#FF0000",
  shadowOut:
    "-6px -6px 14px rgba(255, 255, 255, .7), -6px -6px 10px rgba(255, 255, 255, .5), 6px 6px 8px rgba(255, 255, 255, .075), 6px 6px 10px rgba(0, 0, 0, .15)",
  shadowNormal:
    "-2px -2px 6px rgba(255, 255, 255, .6), -2px -2px 4px rgba(255, 255, 255, .4), 2px 2px 2px rgba(255, 255, 255, .05), 2px 2px 4px rgba(0, 0, 0, .1)",
  shadowPressed:
    "inset -2px -2px 6px rgba(255, 255, 255, .7), inset -2px -2px 4px rgba(255, 255, 255, .5), inset 2px 2px 2px rgba(255, 255, 255, .075), inset 2px 2px 4px rgba(0, 0, 0, .15)",
};

export const defaultTheme = {
  colors,
};

export type ThemeType = typeof defaultTheme;

export type StyledThemePropsType = { theme: ThemeType };

export type DefinedColors = keyof typeof defaultTheme.colors;
