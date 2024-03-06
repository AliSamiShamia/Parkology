import Layout from '@/components/layout';
import Styles from '@/components/styles';
import { MapProps, ThemeProps } from '@/components/types';
import CustomLevel from '@/components/widgets/game/level.game';
import { Colors } from '@/constant/color';
import { routeConfig } from '@/constant/route';
import { get } from '@/data/api.handler';
import { getUser } from '@/data/store.data';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions, Image, ImageBackground, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const baseHeight = 530; // Width on which the font size is designed
const baseImageHeight = 530;
const baseImageWidth = 600;

function GameScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [data, setData] = useState<MapProps>();
  const scaleFactor = height / baseHeight;
  const scaledHeight = baseImageHeight * scaleFactor;
  const scaledFontSize = (size: number) => Math.round(size * scaleFactor);

  const loadData = async () => {
    setLoading(true);
    const user = await getUser();
    try {
      const res = await get(routeConfig.activeTheme.index, user?.token);
      if (res && res.status_code == 200) {
        setData(res.data);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const loadTheme = async (data: any) => {
    setLoading(true);

    try {
      const user = await getUser();
      const res = await get(
        routeConfig.map.loadLevelsPerPage,
        user?.token,
        data,
      );
      if (res && res.status_code == 200) {
        setData(res.data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const loadNext = async () => {
    setImageLoading(true);
    let page = data?.page ?? 0;
    const form_data = {
      page: parseInt(page.toString()) + 1,
    };
    await loadTheme(form_data);
  };
  const loadPrev = async () => {
    setImageLoading(true);
    let page = data?.page ?? 0;
    const form_data = {
      page: parseInt(page.toString()) - 1,
    };
    await loadTheme(form_data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout fixed  appbar bottomBar navigation={navigation} refresh={loadData}>
      <View style={{ height: height, position: 'relative' }}>
        {loading ? (
          <View>
            <ActivityIndicator size={40} color={Colors.secondary} />
          </View>
        ) : data?.theme && data?.theme.image ? (
          <ImageBackground

            style={[
              {
                minHeight: scaledHeight,
                maxWidth: 1000,

                width: width,

                position: 'absolute',
                left: 0,
                top: -scaledHeight * 0.14 ,
                right: 0,
              },
            ]}
            onLoadStart={() => {
              setImageLoading(true);
            }}
            onLoadEnd={() => {
              setImageLoading(false);
            }}
            resizeMode="contain"
            resizeMethod="scale"
            source={{ uri: data?.theme.image }}>
            {imageLoading ? (
              <ActivityIndicator size={40} color={Colors.secondary} />
            ) : (
              <View style={[Styles.map,{flex:1}]}>
                <View style={[Styles.flexWrap, ]}>
                  {data.levels.map((item, key) => {
                    return (
                      <CustomLevel
                        key={key}
                        index={key}
                        id={item.id}
                        attempts={item.attempts}
                        pass={item.pass}
                        navigation={navigation}
                        status={
                          data.active_level
                            ? item.level == data.active_level.level
                            : false
                        }
                        level={item.level}
                        quiz_id={0}
                      />
                    );
                  })}
                </View>
              </View>
            )}
            <View
              style={{
                position: 'absolute',
                top: scaledHeight * 0.15,
                bottom: scaledHeight * 0.2,
                paddingHorizontal: 15,
                zIndex: 13,
                right: 0,

                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexDirection: 'column',
              }}>
              <View>
                {data.next ? (
                  <TouchableOpacity onPress={loadNext}>
                    <Image
                      source={require('@assets/images/next.png')}
                      resizeMode="contain"
                      style={{
                        height: scaledFontSize(50),
                        width: scaledFontSize(50),
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              {data.prev ? (
                <TouchableOpacity onPress={loadPrev}>
                  <Image
                    source={require('@assets/images/previous.png')}
                    resizeMode="contain"
                    style={{
                      height: scaledFontSize(50),
                      width: scaledFontSize(50),
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </ImageBackground>
        ) : null}
      </View>
    </Layout >
  );
}

export default GameScreen;
