import React from 'react';
import { Dimensions, Image } from 'react-native';
import Styles from '../../styles';
import { LogoProps } from '../../types';

const baseHeight = 180; // Height on which the font size is designed

function Logo({ width, height }: LogoProps) {
  const scaleFactor = height / baseHeight;
  const scaledFontSize = (size: number) => Math.round(size * scaleFactor);

  return (
    <Image
      style={{ ...Styles.logo, width: scaledFontSize(width), height: scaledFontSize(height) }}
      source={require('@assets/images/logo.png')}></Image>
  );
}

export default Logo;
