import { DefaultTheme } from 'react-native-paper';
import { Platform } from 'react-native';

const primary = '#8a8cc2';
const accent = '#DBE0F2';
const surface = 'white';

export const dropShadow = () => {
  switch (Platform.OS) {
    case 'ios':
      return {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
      };
    case 'android':
      return { elevation: 8 };
    default:
      return {
        boxSizing: 'border-box',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      };
  }
};

const theme = {
  ...DefaultTheme,
  roundness: 14,
  colors: {
    ...DefaultTheme.colors,
    primary,
    accent,
    ripple: `${primary}ff`,
    background: '#e4ecf0',
    text: '#8a8cc2',
    textSelected: '#4e4f73',
    surface,
    placeholder: '#8a8cc2',
    link: '#56CCF2',
    alert: '#eb5757',
    secondary: '#c8d8de',
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
    color: '#f2f2f2',
    fontWeight: 'bold',
  },
  card: {
    borderStyle: 'solid',
    borderTopColor: accent,
    borderLeftColor: accent,
    borderRightColor: primary,
    borderBottomColor: primary,
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
