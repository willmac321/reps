import { Platform, useWindowDimensions } from 'react-native';

const isMobile = () => {
  switch (Platform.OS) {
    case 'ios':
    case 'android':
      return true;
    default:
      return false;
  }
};
const isAndroid = () => {
  switch (Platform.OS) {
    case 'android':
      return true;
    default:
      return false;
  }
};

const isApple = () => {
  switch (Platform.OS) {
    case 'ios':
      return true;
    default:
      return false;
  }
};

const useIsSmallScreen = () => {
  const { width, scale } = useWindowDimensions();
  return width * scale < 480;
};

export { isMobile, isAndroid, isApple, useIsSmallScreen };
