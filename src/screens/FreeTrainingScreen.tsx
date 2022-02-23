import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import TargetInput from '../components/TargetInput';
import {RootStackParamList} from '../routes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type FreeTrainingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function FreeTrainingScreen() {
  const {t} = useTranslation();
  const navigation = useNavigation<FreeTrainingScreenNavigationProp>();

  return (
    <Root>
      <Icon name="arrow-left" onPress={() => navigation.navigate('Home')} />
      <TargetInput />
    </Root>
  );
}

const Root = styled(View)({
  backgroundColor: '#fff',
  minHeight: '100%',
});
