import { DefaultTheme } from 'react-native-paper';
import { isAndroid, isApple } from '../utils/checkPlatform';

const primary = '#97c2aae0';
const accent = '#2a2b2b';
const surface = '#414142';

export const dropShadow = () => {
  if (isApple())
    return {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 4,
      shadowOpacity: 0.25,
    };
  if (isAndroid()) return { elevation: 8 };
  return {
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  };
};

const theme = {
  ...DefaultTheme,
  roundness: 14,
  colors: {
    ...DefaultTheme.colors,
    primary,
    accent,
    ripple: `${primary}ff`,
    background: '#2b2b2b',
    text: primary,
    textSelected: '#b3e6ca',
    surface,
    placeholder: primary,
    link: '#56CCF2',
    alert: '#eb5757',
    secondary: '#4f695b',
    secondarySelected: `${accent}CA`,
    backdrop: 'rgba(0,0,0,0.2)',
    underlineColor: 'transparent',
  },
  marginHorizontal: 20,
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  item: {
    borderStyle: 'solid',
    borderColor: surface,
    borderWidth: 3,
    borderRadius: 10,
  },
  button: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 10,
    marginBottom: 20,
    width: 170,
    height: 40,
    borderRadius: 10,
    ...dropShadow(),
  },
  buttonText: {
    fontSize: 18,
    color: surface,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    fontSize: 18,
    color: primary,
    fontWeight: 'bold',
  },
  card: {
    borderStyle: 'solid',
    borderColor: primary,
    borderTopColor: accent,
    borderLeftColor: accent,
    borderWidth: 0.1,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
  },
  input: {
    backgroundColor: surface,
    marginTop: 10,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
  },
};

export default theme;
