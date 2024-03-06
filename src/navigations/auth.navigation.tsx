import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screens/account/register/index';
import GameScreen from '../screens/game';
import LoginScreen from '../screens/account/login';
import StartScreen from '../screens/start';
import DrawerNavigation from './drawer.navigation';
import CompleteRegistrationScreen from '@/screens/account/otp';
import UserTypeScreen from '@/screens/account/user-type';
import LeaderBoardScreen from '@/screens/leaderboard';
import SettingScreen from '@/screens/settings';
import {Colors} from '@/constant/color';
import QuizScreen from '@/screens/game/quiz';
import ForgotPasswordScreen from '@/screens/account/forgot';
import ProfileScreen from '@/screens/account/profile';
import ProductKnowledgeScreen from '@/screens/product';
import VideoScreen from '@/screens/product/video';
import SalesScreen from '@/screens/sales';
import EventScreen from '@/screens/events';
import HomeScreen from '@/screens/home';

const Stack = createNativeStackNavigator();
function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        // navigationBarHidden: false,
        // navigationBarColor: Colors.lightSecondary,
      }}>
      <Stack.Screen name="Start" component={StartScreen} />
     
   
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="AuthStack" component={DrawerNavigation} />
      <Stack.Screen name="UserTypeInfo" component={UserTypeScreen} />
      <Stack.Screen
        name="VerifyAccount"
        component={CompleteRegistrationScreen}
      />


    </Stack.Navigator>
  );
}

export default AuthNavigation;
