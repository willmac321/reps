import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Switch, List, RadioButton, Text, Menu } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';

const LegalPrivacyPolicy = ({ navigation, theme, isVisible = true, setIsVisible }) => {
  const [innercontent, setContent] = React.useState(null);
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

  const handleClick = (e) => {
    if (
      e.target.attributes &&
      e.target.attributes['aria-label'] &&
      e.target.attributes['aria-label'].value &&
      e.target.attributes['aria-label'].value === 'Close modal'
    ) {
      setIsVisible(false);
      setTitle('Legal & Privacy');
      setContent(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isVisible]);

  React.useEffect(() => {
    setContent(null);
  }, [isVisible]);

  return (
    <NotifyModal
      title={title}
      theme={theme}
      onPress={() => {}}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      showButton={false}
      content={
        !innercontent ? (
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
          innercontent
        )
      }
    />
  );
};

export default withTheme(LegalPrivacyPolicy);
