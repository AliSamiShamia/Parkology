import React, { useEffect } from 'react';
import Layout from '../../components/layout';
import { View } from 'react-native';
import Styles from '../../components/styles';
import Logo from '../../components/widgets/logo';
import Banner from '../../components/widgets/banner';
import { getTempUser, getUser } from '@/data/store.data';

function StartScreen({ navigation }: { navigation: any }) {
  const loadPage = async () => {
    const user = await getUser();
    const tempuser = await getTempUser();
    if (user && user.verified) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      });
    } else {
      if (tempuser) {
        if (!tempuser.type_id) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'UserTypeInfo' }],
          });
        } else if (!tempuser.verified) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'VerifyAccount' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      } else {
        console.log(user);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    }
  };
  useEffect(() => {
    loadPage();
  }, []);
  return (
    <Layout removeSpace>
      <View style={Styles.center}>
        <Logo width={200} height={300} />
        <View style={Styles.space20} />
        <Banner />
      </View>
    </Layout>
  );
}

export default StartScreen;
