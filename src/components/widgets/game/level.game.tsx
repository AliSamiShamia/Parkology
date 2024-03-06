import Styles from '@/components/styles';
import { Colors } from '@/constant/color';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';

import { Text } from 'react-native-paper';
import Player from '../player';
import { LevelProps } from '@/components/types';

const { width, height } = Dimensions.get('screen');
const baseHeight = Math.min(height, 800); // Width on which the font size is designed
const baseIconWidth = (45);
const baseIconHeight = (50);
const baseImageHeight = Math.min(height, 780);
const baseImageWidth = Math.min(width, 380);

const isIPhoneSE = width <= 340; // iPhone SE width is 320
const isIPad = width >= 768; // iPad width is 768
function CustomLevel({
  id,
  index,
  attempts,
  level,
  status,
  pass,
  navigation,
}: LevelProps) {
  const scaleFactor = height / baseHeight;
  const scaledFontSize = (size: number) => Math.round(size * scaleFactor);
  const scaledWidth = baseIconWidth * scaleFactor;
  const scaledHeight = baseIconHeight * scaleFactor;
  const scaledMapHeight = baseImageHeight * scaleFactor;
  const scaledMapWidth = baseImageWidth * scaleFactor;

  const positions = [
    { x: scaledMapWidth * (isIPad ? 0.1 : isIPhoneSE ? 0.07 : 0.05), y: scaledMapHeight * 0.1 + ((isIPad ? 20 : isIPhoneSE ? -15 : 20) * scaleFactor) },
    { x: scaledMapWidth * (isIPad ? 0.12 : isIPhoneSE ? 0.08 : 0.07), y: scaledMapHeight * 0.16 + ((isIPad ? 50 : isIPhoneSE ? 5 : 50) * scaleFactor) },
    { x: scaledMapWidth * (isIPad ? -0.05 : isIPhoneSE ? -0.02 : -0.04), y: scaledMapHeight * 0.24 + ((isIPad ? 35 : isIPhoneSE ? 5 : 50) * scaleFactor) },
    { x: -scaledMapWidth * (isIPad ? 0.3 : isIPhoneSE ? 0.3 : 0.28), y: scaledMapHeight * 0.29 + ((isIPad ? 0 : isIPhoneSE ? -20 : 10) * scaleFactor) },
    { x: -scaledMapWidth * (isIPad ? 0.34 : isIPhoneSE ? 0.3 : 0.26), y: scaledMapHeight * 0.444 + ((isIPad ? -35 : isIPhoneSE ? -50 : -20) * scaleFactor) },
    { x: -scaledMapWidth * (isIPad ? 0.1 : isIPhoneSE ? 0.1 : 0.05), y: scaledMapHeight * 0.444 + ((isIPad ? 0 : isIPhoneSE ? -25 : -10) * scaleFactor) },
    { x: scaledMapWidth * (isIPad ? 0.15 : isIPhoneSE ? 0.15 : 0.14), y: scaledMapHeight * 0.444 + ((isIPad ? -10 : isIPhoneSE ? -12 : -5) * scaleFactor) },
    { x: -scaledMapWidth * (isIPad ? -0.05 : isIPhoneSE ? 0.0 : 0), y: scaledMapHeight * 0.555 + ((isIPad ? 10 : isIPhoneSE ? -22 : -15) * scaleFactor) },
    { x: -scaledMapWidth * (isIPad ? 0.28 : isIPhoneSE ? 0.22 : 0.28), y: scaledMapHeight * 0.555 + ((isIPad ? 10 : isIPhoneSE ? -20 : -15) * scaleFactor) },
    { x: -scaledMapWidth * (isIPad ? 0.34 : isIPhoneSE ? 0.31 : 0.29), y: scaledMapHeight * 0.65 + ((isIPad ? 15 : isIPhoneSE ? -20 : -10) * scaleFactor) },
    { x: -scaledMapWidth * (isIPad ? 0.13 : isIPhoneSE ? 0.15 : 0.12), y: (scaledMapHeight * 0.68) + ((isIPad ? 25 : isIPhoneSE ? -10 : -15) * (scaleFactor)) },
    { x: scaledMapWidth * (isIPad ? 0.1 : isIPhoneSE ? 0.08 : 0.12), y: (scaledMapHeight * 0.67) + ((isIPad ? 30 : isIPhoneSE ? -5 : 0) * (scaleFactor)) },];

  const items = positions.reverse()
  return (
    <View
      style={[
        {
          height: scaledFontSize(50),
          width: scaledFontSize(50),
          position: 'absolute',
          left: items[index].x,
          top: items[index].y,
          marginTop: scaledFontSize(20),
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 11,
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          status ? navigation.navigate('Quiz') : () => { };
        }}
      >
        <View>

          {status ? <Player /> : null}
          <ImageBackground
            source={
              status
                ? require('@assets/images/level.png')
                : pass == 1
                  ? require('@assets/images/pass.png')
                  : pass == -1
                    ? require('@assets/images/fail.png')
                    : require('@assets/images/lock.png')
            }
            style={[
              Styles.flex,
              {
                width: scaledWidth,
                height: scaledHeight,
              },
            ]}>
            {status || pass != 0 ? (
              <Text
                style={[
                  Styles.darkBoldText,
                  {
                    fontSize: scaledFontSize(18),
                    position: 'absolute',
                    textAlignVertical: 'center',
                    top: -5,
                    bottom: 1,
                    left: 0,
                    right: 0,
                    color: pass != 0 ? Colors.white : Colors.dark,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  },
                ]}>
                {level}
              </Text>
            ) : null}
          </ImageBackground>
        </View>

      </TouchableOpacity>
    </View>
  );
}

export default CustomLevel;
