import React from 'react';
import { View, Pressable } from 'react-native';
import { withTheme, Text, Menu } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';
import SafeArea from '../../../template/SafeAreaWrapper';
import PrivacyPolicy from './PrivacyPolicy';
import EULA from './EULA';
import Attribution from './Attribution';
import ScrollView from '../../../template/ScrollViewWrapper';

const LegalPrivacyPolicy = ({ navigation, theme, isVisible = true, setIsVisible }) => {
  const [innercontent, setContent] = React.useState('');
  const [title, setTitle] = React.useState('Legal & Privacy');

  const showPrivacy = () => {
    setTitle('Privacy Policy');
    setContent(<PrivacyPolicy />);
  };

  const showTerms = () => {
    setTitle('EULA');
    setContent(<EULA />);
  };

  const showOpenSource = () => {
    setTitle('Open Source & 3rd Party Attribution');
    setContent(<Attribution/>);
  };

  const handleClick = (e) => {
    setTitle('Legal & Privacy');
    setContent('');
  };

  React.useEffect(() => {
    setContent('');
  }, [isVisible]);

  return (
    <SafeArea theme={theme}>
      <NotifyModal
        title={title}
        theme={theme}
        onPress={handleClick}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        showButton={!!innercontent}
      >
        {!innercontent ? (
          <View>
            <Menu.Item
              style={{ width: 500 }}
              onPress={() => showPrivacy()}
              title="Privacy Policy"
            />
            <Menu.Item onPress={() => showTerms()} title="End User License Agreement" />
            <Menu.Item onPress={() => showOpenSource()} title="Open Source & 3rd Party" />
          </View>
        ) : (
          <View style={{ maxHeight: '70vh' }}>
            <ScrollView>{innercontent}</ScrollView>
          </View>
        )}
      </NotifyModal>
    </SafeArea>
  );
};

export default withTheme(LegalPrivacyPolicy);
