import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {LayoutChangeEvent, Text, View} from 'react-native';
import {RootStackParamList} from '../../routes';
import HomeButton from './HomeButton';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const {t} = useTranslation();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [size, setSize] = useState({width: 0, height: 0});
  function handleLayout(event: LayoutChangeEvent) {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }
  const buttonWidth = Math.floor(size.width / 2);

  return (
    <Root>
      <Title>{t('home.title')}</Title>
      <Subtitle>{t('home.subtitle')}</Subtitle>
      <View style={{flexGrow: 1, justifyContent: 'center'}}>
        <ButtonsContainer onLayout={handleLayout}>
          <HomeButton
            title={t('home.freeTraining')}
            onPress={() => navigation.navigate('FreeTraining')}
            icon="bullseye"
            width={buttonWidth}
            color="#FDFFB6"
          />

          <HomeButton
            title={t('home.tournament')}
            onPress={() => navigation.navigate('FreeTraining')}
            icon="bullseye-arrow"
            width={buttonWidth}
            color="#FFADAD"
          />

          <HomeButton
            title={t('home.bows')}
            onPress={() => navigation.navigate('FreeTraining')}
            icon="bow-arrow"
            width={buttonWidth}
            color="#9BF6FF"
          />

          <HomeButton
            title={t('home.settings')}
            onPress={() => navigation.navigate('FreeTraining')}
            icon="cog"
            width={buttonWidth}
            color="#BDB2FF"
          />
        </ButtonsContainer>
      </View>
    </Root>
  );
}

const Root = styled(View)(({theme}) => ({
  backgroundColor: '#fff',
  minHeight: '100%',
  padding: theme.spacing,
}));

const Title = styled(Text)(({theme}) => ({
  color: theme.colors.text,
  fontSize: 28,
  fontWeight: '700',
  padding: theme.spacing,
}));

const Subtitle = styled(Text)(({theme}) => ({
  color: theme.colors.text,
  fontSize: 18,
  paddingHorizontal: theme.spacing,
}));

const ButtonsContainer = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
});
