import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Switch, List, RadioButton, Text } from 'react-native-paper';
import { NotifyModal } from '../../../../template/NotifyModal';

const PrivacyPolicy = ({ navigation, theme }) => {
  return (<NotifyModal 
    title= 'test'
    buttonText='accept'
    theme = {theme}
    onPress={()=>{}}
    />)};

export default withTheme(PrivacyPolicy);
