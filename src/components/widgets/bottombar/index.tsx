import {Colors} from '@/constant/color';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {ImageBackground, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';

const items = [
  {
    icon: 'home',
    title: 'Home',
    action: 'Home',
  },
  {
    icon: 'star',
    title: 'LeaderBoard',
    action: 'LeaderBoard',
  },
  {
    icon: 'account',
    title: 'Profile',
    action: 'Profile',
  },
];
const baseHeight = 800; // Width on which the font size is designed
const {width, height} = Dimensions.get('screen');

function BottomBar({navigation}: {navigation: any}) {
  const route = useRoute();
  const scaleFactor = height / baseHeight;
  const scaledFontSize = (size: number) => Math.round(size * scaleFactor);

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('@/assets/images/botttom-bar.png')}
      style={{
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 20,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      {items.map((item, key) => {
        return (
          <TouchableOpacity
            key={key}
            activeOpacity={0.8}
            style={[
              {
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 18,
                shadowOpacity: 0.2,

                elevation: 8,
                padding: 8,
                borderRadius: 50,
              },
              route.name.toLowerCase() == item.title.toLowerCase()
                ? {backgroundColor: Colors.primary}
                : {backgroundColor: Colors.white},
            ]}
            onPress={() => {
              navigation.navigate(item.action);
            }}>
            <Icon
              source={item.icon}
              size={scaledFontSize(35)}
              color={
                route.name.toLowerCase() == item.title.toLowerCase()
                  ? Colors.white
                  : Colors.primary
              }
            />
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
}

export default BottomBar;
