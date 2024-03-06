import React from 'react';
import { Image } from 'react-native';
import Styles from '../../styles';

function Banner() {
  return (
    <Image
      style={Styles.banner}
      source={require('@/assets/images/banner.png')}></Image>
  );
}

export default Banner;
