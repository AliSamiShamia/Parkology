import { scaledFontSize } from '@/components/functions';
import Layout from '@/components/layout';
import Styles from '@/components/styles';
import CustomCard from '@/components/widgets/card';
import { Colors } from '@/constant/color';
import { routeConfig } from '@/constant/route';
import { get } from '@/data/api.handler';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const baseHeight = 800; // Width on which the font size is designed
const baseImageHeight = 700;

function AboutScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const scaleFactor = height / baseHeight;
  const scaledHeight = baseImageHeight * scaleFactor;
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.about, null);
      if (res && res.status_code == 200) {
        setData(res.data.about);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout appbar bottomBar navigation={navigation} refreshing={false}>
      <View style={{ position: 'relative' }}>
        {loading ? (
          <View>
            <ActivityIndicator size={40} color={Colors.secondary} />
          </View>
        ) : (
          <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: scaledHeight * 0.02, }]}>
            <CustomCard title="About us" loading={false} style={{}}>
              <View>
                <Text style={[{ fontSize: scaledFontSize(17) }]}>{data}</Text>
              </View>
              <View style={Styles.space3}></View>
            </CustomCard>
          </View>
        )}
      </View>
    </Layout>
  );
}

export default AboutScreen;
