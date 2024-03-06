import Layout from '@/components/layout';
import React from 'react';
import {View} from 'react-native';
import { Text } from 'react-native-paper';

function SettingScreen({navigation}: any) {
  return (
    <Layout appbar bottomBar navigation={navigation}>
      <View>
        <Text>Settings</Text>
      </View>
    </Layout>
  );
}

export default SettingScreen;
