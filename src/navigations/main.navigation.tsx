import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/account/register/index';
import GameScreen from '../screens/game';
import LoginScreen from '../screens/account/login';
import StartScreen from '../screens/start';
import DrawerNavigation from './drawer.navigation';
import CompleteRegistrationScreen from '@/screens/account/otp';
import UserTypeScreen from '@/screens/account/user-type';
import LeaderBoardScreen from '@/screens/leaderboard';
import SettingScreen from '@/screens/settings';
import { Colors } from '@/constant/color';
import QuizScreen from '@/screens/game/quiz';
import ForgotPasswordScreen from '@/screens/account/forgot';
import ProfileScreen from '@/screens/account/profile';
import ProductKnowledgeScreen from '@/screens/product';
import VideoScreen from '@/screens/product/video';
import SalesScreen from '@/screens/sales';
import EventScreen from '@/screens/events';
import HomeScreen from '@/screens/home';
import EditProfileScreen from '@/screens/account/profile/edit.profile';
import NotificationScreen from '@/screens/notification';

const Stack = createNativeStackNavigator();
function MainNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        // navigationBarHidden: false,
        // navigationBarColor: Colors.lightSecondary,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Sales" component={SalesScreen} />

      <Stack.Screen name="Event" component={EventScreen} />

      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
      <Stack.Screen
        name="ProductKnowledge"
        component={ProductKnowledgeScreen}
      />
      <Stack.Screen name="Video" component={VideoScreen} />

      <Stack.Screen name="Settings" component={SettingScreen} />

      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      {/* <Stack.Screen name="Main" component={DrawerNavigation} /> */}

    </Stack.Navigator>
  );
}

export default MainNavigation;
