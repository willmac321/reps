import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Switch, List, RadioButton, Text } from 'react-native-paper';
import NotifyModal from '../../../../template/NotifyModal';

const PrivacyPolicy = ({ navigation, theme }) => {
  return (<NotifyModal 
    title= ''
    buttonText='OK'
    theme = {theme}
    onPress={()=>{}}
    isVisible
    />);};

export default withTheme(PrivacyPolicy);
