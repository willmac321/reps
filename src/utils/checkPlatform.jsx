import { Platform, Dimensions } from 'react-native';

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

const isSmallScreen = () => {
  const { width } = Dimensions.get('window');
  return width < 640;
};

export { isMobile, isAndroid, isApple, isSmallScreen };
