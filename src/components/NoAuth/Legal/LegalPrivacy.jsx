import React from 'react';
import { View, Pressable } from 'react-native';
import { withTheme, Text, Menu } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';
import SafeArea from '../../../template/SafeAreaWrapper';
import PrivacyPolicy from './PrivacyPolicy';
import EULA from './EULA';
import Attribution from './Attribution';
import ScrollView from '../../../template/ScrollViewWrapper';

const Eula = 'EULA';
const PrivayPolicy = 'Privacy Policy';
const ThirdParty = 'Open Source & 3rd Party Attribution';
const LegalPrivacy = 'Legal & Privacy';

const LegalJargon = ({ switchTerm }) => {
  switch (switchTerm) {
    case Eula:
      return <EULA />;
    case PrivayPolicy:
      return <PrivacyPolicy />;
    case ThirdParty:
      return <Attribution />;
    default:
      return null;
  }
};

const LegalPrivacyPolicy = ({ navigation, theme, isVisible = true, setIsVisible }) => {
  const [title, setTitle] = React.useState(LegalPrivacy);

  const showPrivacy = () => {
    setTitle(PrivayPolicy);
  };

  const showTerms = () => {
    setTitle(Eula);
  };

  const showOpenSource = () => {
    setTitle(ThirdParty);
  };

  const handleClick = (e) => {
    setTitle(LegalPrivacy);
  };

  const isLegalJargon = title !== LegalPrivacy;

  return (
    <SafeArea theme={theme}>
      <NotifyModal
        title={title}
        theme={theme}
        onPress={handleClick}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        showButton={isLegalJargon === undefined ? false : isLegalJargon}
        content={null}
      >
        {!isLegalJargon ? (
          <View>
            <Menu.Item style={{ width: 500 }} onPress={showPrivacy} title={PrivayPolicy} />
            <Menu.Item onPress={() => showTerms()} title={Eula} />
            <Menu.Item onPress={() => showOpenSource()} title={ThirdParty} />
          </View>
        ) : (
          <View style={{ maxHeight: 500 }}>
            <ScrollView isForceScroll>
              <LegalJargon switchTerm={title} />
            </ScrollView>
          </View>
        )}
      </NotifyModal>
    </SafeArea>
  );
};
export default withTheme(LegalPrivacyPolicy);
