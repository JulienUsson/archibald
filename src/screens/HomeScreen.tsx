import styled from '@emotion/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

const Title = styled(Text)(({theme}) => ({
  color: theme.colors.text,
}));

export default function HomeScreen() {
  const {t} = useTranslation();

  return (
    <View>
      <Title>{t('home.title')}</Title>
    </View>
  );
}
