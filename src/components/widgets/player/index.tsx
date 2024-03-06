import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import Styles from '@/components/styles';
import { connect, useSelector } from 'react-redux';
import { scaledFontSize } from '@/components/functions';

interface PlayerState {
  animatedValue: Animated.Value;
}
const { width, height } = Dimensions.get('window');
const baseIconWidth = 45;
const baseIconHeight = 48;
const scaleFactor = height / baseIconHeight;

class Player extends Component<any, PlayerState> {


  constructor(props: any) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animatedValue, {
          toValue: 1,
          duration: 1000, // Adjust as needed
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.animatedValue, {
          toValue: 0,
          duration: 1000, // Adjust as needed
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 },
    ).start();
  };

  render() {
    const { animatedValue } = this.state;
    const { avatar } = this.props;


    const movingAnimation = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-width * 0.01, width * 0.01], // Move image from 0% to 50% of screen width
    });

    const rotation = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '30deg'], // Rotate image from 0deg to 30deg
    });

    return (
      <Animated.Image
        source={avatar == "male" ? require('@assets/images/male-player.png') : require('@assets/images/female-player.png')}
        style={[
          Styles.image,
          {
            width: scaledFontSize(50),
            height: scaledFontSize(60),
            transform: [{ translateX: movingAnimation }, { rotate: rotation }]
          },
        ]}
      />
    );
  }
}

const PlayerProps = (state: any) => ({
  avatar: state.user.avatar
})
export default connect(PlayerProps)(Player);
