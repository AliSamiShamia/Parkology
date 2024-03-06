import Styles from '@/components/styles';
import { Colors } from '@/constant/color';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import { Badge, Icon, IconButton, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerActions } from '@react-navigation/native';

const baseHeight = 1000; // Width on which the font size is designed
const { width, height } = Dimensions.get('screen');

function CustomAppBar({ life }: any) {
  const scaleFactor = height / baseHeight;
  const user = useSelector((state: any) => state.user);
  const scaledFontSize = (size: number) => Math.round(size * scaleFactor);
  const [score, setScore] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState({
    width: width,
    height: height,
  });
  const loadUser = async () => {
    try {
      if (user) {
        setScore(user.score ?? '');
        setAttempts(user.attempts ?? '');
      }
    } catch (e) {
      setScore('-');
    }
  };


  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
    };

    const listener = Dimensions.addEventListener('change', updateDimensions);

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {

    loadUser();
  }, [user]);

  return (
    <ImageBackground
      source={require('@assets/images/appbar-bg.png')}
      resizeMode="stretch"
      style={[
        Styles.appbar,
        {
          width: dimensions.width,
          minHeight: dimensions.height * scaleFactor * 0.1,
          height: dimensions.height * 0.19,
          maxHeight: dimensions.height * 0.4,
        },
      ]}>
      <View style={Styles.icons}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <View
            style={[Styles.icon, { width: width * 0.12, height: width * 0.12, maxWidth: 100, maxHeight: 100 }]}>
            <Image
              style={{ width: scaledFontSize(28), height: scaledFontSize(28) }}
              resizeMode="contain"
              source={require('@assets/images/menu.png')}
            />
          </View>
        </TouchableOpacity>
        <View style={Styles.flex}>
          <View style={[Styles.score]}>
            <ImageBackground
              style={{
                height: scaledFontSize(50),
                width: scaledFontSize(120),
                justifyContent: 'center',
                // alignItems: 'center',
                paddingHorizontal: 5,
              }}
              resizeMode="contain"
              source={require('@assets/images/score.png')}>
              <Text
                style={[
                  Styles.darkBoldText,
                  {
                    textAlignVertical: 'center',
                    width: scaledFontSize(65),
                    textAlign: 'center',
                    fontSize: scaledFontSize(13),
                    fontWeight: 'bold',
                    marginTop: 5,
                    paddingStart: 10,
                  },
                ]}>
                {score}
              </Text>
            </ImageBackground>
            {life ? (
              <View
                style={[{ justifyContent: 'flex-end', alignItems: 'center' }]}>
                <ImageBackground
                  source={require('@assets/images/heart.png')}
                  resizeMode="contain"
                  style={[
                    {
                      height: scaledFontSize(35),
                      width: scaledFontSize(35),
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: scaledFontSize(20) }}>
                    {attempts}
                  </Text>
                </ImageBackground>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              // navigation.dispatch(DrawerActions.openDrawer());
              navigation.dispatch(CommonActions.navigate('Notification'));

              // 
            }}>
            <View
              style={[Styles.icon, { width: width * 0.12, height: width * 0.12, maxWidth: 100, maxHeight: 100 }]}>
              <Icon
                source="bell"
                size={scaledFontSize(30)}
                color={Colors.primary}
              />
              {/* <Badge
                style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  backgroundColor: 'red',
                }}
                size={scaledFontSize(20)}>
                0
              </Badge> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default CustomAppBar;
