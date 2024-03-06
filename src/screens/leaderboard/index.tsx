import Layout from '@/components/layout';
import Styles from '@/components/styles';
import { LeaderboardType } from '@/components/types';
import { Colors } from '@/constant/color';
import { routeConfig } from '@/constant/route';
import { get } from '@/data/api.handler';
import { getUser } from '@/data/store.data';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');
const baseHeight = 800; // Height on which the font size is designed
const baseWidth = 400; // Height on which the font size is designed

function LeaderBoardScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LeaderboardType[]>([]);
  const scaleFactor = height / baseHeight;
  const scaledHeight = baseHeight * scaleFactor;
  const scaledWidth = baseWidth * scaleFactor;
  const scaledFontSize = (size: number) => Math.round(size * scaleFactor);

  const loadData = async () => {
    try {
      const user = await getUser();
      setLoading(true);
      const res = await get(routeConfig.leaderboard, user?.token);
      if (res && res.status_code == 200) {
        setData(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Layout appbar bottomBar navigation={navigation} refresh={loadData}>
      <View style={[Styles.flex]}>
        {loading ? (
          <View>
            <ActivityIndicator size={40} color={Colors.secondary} />
          </View>
        ) : (
          <View style={[{

            maxWidth: scaledWidth,
            marginHorizontal: scaledFontSize(30),
          }]}>
            <ImageBackground
              source={require('@assets/images/quiz_bg.png')}
              resizeMode="stretch"
              style={[
                {
                  // justifyContent: 'center',
                  // width: width * 0.8,
                  minHeight: scaledHeight * 0.6,
                  maxWidth: 600,
                  padding: 0.15,
                  marginTop: scaledHeight * 0.05,
                },
              ]}>
              <View style={{
                position: 'relative',
                maxWidth: 600,
              }}>
                <Image
                  source={require('@assets/images/leaderboard.png')}
                  resizeMode="contain"
                  style={[
                    {
                      // position: 'absolute',
                      top: -30,
                      left: 0,
                      right: 0,
                      width: "100%",
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: scaledHeight * 0.1,
                    },
                  ]}
                />
              </View>
              <View
                style={[
                  Styles.flexColumnStart,
                  {
                    // marginVertical: scaledHeight * 0.08,
                    marginHorizontal: scaledHeight * 0.03,
                    marginBottom: scaledHeight * 0.03,

                  },
                ]}>
                <ScrollView style={[Styles.flexColumn, { maxHeight: scaledHeight * 0.42 }]}>

                  {data.map((item, key) => {
                    return (
                      <ImageBackground
                        key={key}
                        resizeMode="stretch"
                        source={require('@assets/images/leaderboard-item.png')}
                        style={{
                          width: '100%',
                          height: scaledHeight * 0.06,
                          marginVertical: 2
                        }}>
                        <View
                          style={[
                            Styles.centerRow,
                            Styles.flexSpaceBetween,
                            {
                              paddingStart: 10,
                              paddingEnd: 20,
                              alignItems: 'center',
                              height: '100%',
                            },
                          ]}>
                          <Text
                            style={{
                              color: Colors.error,
                              fontWeight: 'bold',
                              fontStyle: 'italic',

                              fontSize: scaledFontSize(28),
                            }}>
                            {key + 1}.
                          </Text>
                          <Text
                            style={{
                              color: Colors.primary,
                              fontWeight: 'bold',
                              fontSize: scaledFontSize(15),
                            }}>
                            {item.name.slice(0, 15) +
                              (item.name.length > 15 ? '...' : '')}
                          </Text>
                          <Text
                            style={{
                              color: Colors.primary,
                              fontWeight: 'bold',
                              fontSize: scaledFontSize(16),
                            }}>
                            {item.score}
                          </Text>
                        </View>
                      </ImageBackground>
                    );
                  })}
                </ScrollView>
              </View>
            </ImageBackground>
          </View>
        )}
      </View>
    </Layout>
  );
}

export default LeaderBoardScreen;
