/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const lightRed = '#FFCDD2';
const primaryRed = '#D32F2F';
const darkRed = '#B71C1C';
const orange = '#FF894C';
const black = '#212121';
const darkGray = '#424242';
const mediumGray = '#363636';
const lightGray = '#BDBDBD';
const white = '#FFFFFF';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: black,
    background: white,
    tint: tintColorLight,
    icon: darkGray,
    tabIconDefault: darkGray,
    tabIconSelected: tintColorLight,
    lightRed,
    primaryRed,
    mediumGray,
    lightGray,
    white,
    orange
  },
  dark: {
    text: white,
    background: black,
    tint: tintColorDark,
    icon: mediumGray,
    tabIconDefault: mediumGray,
    tabIconSelected: tintColorDark,
    darkRed,
    black,
    darkGray,
  },
};
