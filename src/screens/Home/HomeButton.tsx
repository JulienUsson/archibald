import styled from '@emotion/native';
import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';

interface Props {
  title: string;
  icon: string;
  width: number;
  color: string;
  onPress: () => void;
}

export default function HomeButton({
  title,
  width,
  color,
  icon,
  onPress,
}: Props) {
  return (
    <Button
      activeOpacity={0.5}
      underlayColor="#fff"
      width={width}
      onPress={onPress}>
      <ButtonContent style={{backgroundColor: color}}>
        <ButtonIcon name={icon} />
        <ButtonText>{title}</ButtonText>
      </ButtonContent>
    </Button>
  );
}

const Button = styled(TouchableHighlight)<{width: number}>(
  ({theme, width}) => ({
    width: width,
    height: width,
    padding: theme.spacing,
  }),
);

const ButtonContent = styled(View)(({theme}) => ({
  backgroundColor: '#FFFD98',
  borderRadius: theme.borderRadius,
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing,
  height: '100%',
  width: '100%',
}));

const ButtonIcon = styled(Icon)(({theme}) => ({
  fontSize: 64,
  color: theme.colors.text,
}));

const ButtonText = styled(Text)(({theme}) => ({
  fontSize: 18,
  textAlign: 'center',
  fontWeight: '700',
  color: theme.colors.text,
}));
