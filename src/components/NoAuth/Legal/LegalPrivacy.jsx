import React from 'react';
import { View, Pressable } from 'react-native';
import { withTheme, Text, Menu } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';

const LegalPrivacyPolicy = ({ navigation, theme, isVisible = true, setIsVisible }) => {
  const [innercontent, setContent] = React.useState('');
  const [title, setTitle] = React.useState('Legal & Privacy');

  const showPrivacy = () => {
    setTitle('Privacy Policy');
    setContent(() => <Text> aaaaaaaaaaa</Text>);
  };
  const showTerms = () => {
    setTitle('EULA');
    setContent(() => <Text> ssssss</Text>);
  };
  const showOpenSource = () => {
    setTitle('Open Source & 3rd Party Attribution');
    setContent(() => <Text> iiiiiii</Text>);
  };

  const handleClick = () => {
    setTitle('Legal & Privacy');
    setContent('');
  };

  React.useEffect(() => {
    setContent('');
  }, [isVisible]);

  return (
    <NotifyModal
      title={title}
      theme={theme}
      onPress={handleClick}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      showButton={false}
    >
      {!innercontent ? (
        <View>
          <Menu.Item style={{ width: 500 }} onPress={() => showPrivacy()} title="Privacy Policy" />
          <Menu.Item onPress={() => showTerms()} title="End User License Agreement" />
          <Menu.Item onPress={() => showOpenSource()} title="Open Source & 3rd Party" />
        </View>
      ) : (
        innercontent
      )}
    </NotifyModal>
  );
};

export default withTheme(LegalPrivacyPolicy);
