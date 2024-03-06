import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/home';
import SettingScreen from '@/screens/settings';
import LeaderBoardScreen from '@/screens/leaderboard';
import Logo from '@/components/widgets/logo';
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '@/constant/color';
import { Icon } from 'react-native-paper';
import GameScreen from '@/screens/game';
import QuizScreen from '@/screens/game/quiz';
import ProductKnowledgeScreen from '@/screens/product';
import ProfileScreen from '@/screens/account/profile';
import SalesScreen from '@/screens/sales';
import EventScreen from '@/screens/events';
import { Image } from 'react-native';
import Styles from '@/components/styles';
import MainNavigation from './main.navigation';
import AboutScreen from '@/screens/about';
import PrivacyScreen from '@/screens/privacy';
import LoginScreen from '@/screens/account/login';
import { scaledFontSize } from '@/components/functions';
const Drawer = createDrawerNavigator();

const { width } = Dimensions.get('screen');
// Custom Drawer Content Component
function CustomDrawerContent(props: any) {
  return (
    <ImageBackground
      resizeMode="cover"
      style={{
        flex: 1,
      }}
      source={require('@assets/images/drawer-bg.png')}>
      <DrawerContentScrollView
        // contentContainerStyle={}
        {...props}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 20,
            flexDirection: 'row',
          }}>
          <View style={{ paddingHorizontal: 10 }}>
            <Logo width={180} height={180} />
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}>
            <Icon source={'chevron-left'} size={scaledFontSize(70)} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        {/* Default Drawer Items */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Image
          source={require('@assets/images/company-logo.png')}
          style={{ height: 50, width: width * 0.4 }}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        drawerActiveTintColor: Colors.secondary,
        drawerActiveBackgroundColor: '#eee',
        drawerInactiveTintColor: Colors.primary,
        drawerInactiveBackgroundColor: 'transparent',
        drawerLabelStyle: {
          fontWeight: 'bold',
          fontSize: scaledFontSize(16),
          padding: 0,
          width: scaledFontSize(width) * 0.4,
          flexWrap: 'wrap',
          marginLeft: -scaledFontSize(10),
        },
        drawerItemStyle: {
          margin: 0, // Or adjust padding as needed
          padding: 0,
        },
        drawerStyle: {
          width: width * 0.6,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="MainStack"
        options={{
          headerShown: false,
          drawerItemStyle: { height: 0 },
        }}
        component={MainNavigation}
      />

      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { height: 0 },
        }}
      />

      <Drawer.Screen
        name="GameScreen"
        component={GameScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Parkology',

          drawerIcon: ({ focused }) => (
            <Image
              source={require('@assets/images/icon.png')}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ProductKnowledgeScreen"
        component={ProductKnowledgeScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Product Knowledge',
          drawerIcon: ({ focused }) => (
            <Icon source={'video'} color={Colors.primary} size={30} />
          ),
        }}
      />
      <Drawer.Screen
        name="SalesScreen"
        component={SalesScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Sales',
          drawerIcon: ({ focused }) => (
            <Icon source={'finance'} color={Colors.primary} size={30} />
          ),
        }}
      />
      <Drawer.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Event',
          drawerIcon: ({ focused }) => (
            <Image
              source={require('@assets/images/event.png')}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="LeaderBoardScreen"
        component={LeaderBoardScreen}
        options={{
          headerShown: false,
          drawerLabel: 'LeaderBoard',
          drawerIcon: ({ focused }) => (
            <Icon source={'star'} color={Colors.primary} size={30} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Profile',
          drawerIcon: ({ focused }) => (
            <Icon source={'account'} color={Colors.primary} size={30} />
          ),
        }}
      />
      <Drawer.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { height: 0 },
          drawerIcon: ({ focused }) => <Icon source={'video'} size={30} />,
        }}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerShown: false,
          drawerLabel: 'About us',
          drawerIcon: ({ focused }) => (
            <Icon
              source={'information-outline'}
              color={Colors.primary}
              size={30}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PrivacyScreen"
        component={PrivacyScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Privacy Policy',
          drawerIcon: ({ focused }) => (
            <Icon source={'octagram'} color={Colors.primary} size={30} />
          ),
        }}
      />

      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { height: 0 },
          drawerIcon: ({ focused }) => (
            <Icon source={'octagram'} color={Colors.primary} size={30} />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="SettingsScreen"
        component={SettingScreen}
        options={{headerShown: false, drawerLabel: 'Quiz'}}
      /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
