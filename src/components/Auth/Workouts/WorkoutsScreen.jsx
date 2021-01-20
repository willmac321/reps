import React from 'react';
import { withTheme } from 'react-native-paper';
import Workouts from './parts/Workouts';

const WorkoutsScreen = ({ navigation }) => <Workouts navigation={navigation} />;

export default withTheme(WorkoutsScreen);
