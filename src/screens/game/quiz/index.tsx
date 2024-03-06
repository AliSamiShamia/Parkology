import Layout from '@/components/layout';
import Styles from '@/components/styles';
import {
  MapProps,
  QuizAnswerProps,
  QuizProps,
  ThemeProps,
} from '@/components/types';
import { Colors } from '@/constant/color';
import { routeConfig } from '@/constant/route';
import { get, post } from '@/data/api.handler';
import { getUser } from '@/data/store.data';
import useTrans from '@/locale';
import { updateLife, updateScore } from '@/store/user';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');
const baseHeight = 800; // Height on which the font size is designed

function QuizScreen({ }: any) {
  const { language, translate } = useTrans();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<QuizProps>();
  const scaleFactor = height / baseHeight;
  const scaledHeight = baseHeight * scaleFactor;
  const scaledFontSize = (size: number) => Math.round(size * scaleFactor);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<QuizAnswerProps>();
  const auth = useSelector((state: any) => state.user);

  const loadData = async () => {
    setLoading(true);
    const user = await getUser();
    try {
      const res = await get(
        routeConfig.activeTheme.level,
        user?.token,
        null,
        language,
      );
      if (res && res.status_code == 200) {
        setData(res.data);
        dispatch(updateLife(res.data.attempts));
      } else {
        setData(undefined);
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: translate('info'),
          textBody: res ? res.message : translate('error'),
          button: translate('close'),
          closeOnOverlayTap: false,
          autoClose: true,
          onHide: () => {
            navigation.dispatch(StackActions.replace('Game'));
          },

        });
      }

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const submit = async () => {
    try {
      setLoading(true);
      if (selected?.id) {
        const user = await getUser();
        const res = await post(
          routeConfig.daily_quiz,
          {
            level_id: data?.id,
            answer_id: selected?.id,
          },
          user?.token,
          user?.language,
        );
        if (res && res.status_code == 200) {
          dispatch(updateScore(res.data.score));
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: translate('success'),
            textBody: res.message,
            button: 'close',
            autoClose: true,
            onHide: () => {
              navigation.dispatch(StackActions.replace('Game'));
            },
          });
        } else {
          if (res && res.status_code == 209) {
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: translate('info'),
              textBody: res ? res.message : translate('error'),
              button: 'close',
              autoClose: true,
              onHide: () => {
                navigation.dispatch(StackActions.replace('Game'));
              },
            });
          } else {
            dispatch(updateLife(auth?.attempts ? auth?.attempts - 1 : 0));
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: translate('info'),
              textBody: res ? res.message : translate('error'),
              autoClose: true,
              button: 'close',
            });
          }
        }
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: translate('info'),
          textBody: translate('selectAnswer'),
          button: 'close',
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: translate('info'),
        textBody: translate('selectAnswer'),
        button: 'close',
        autoClose: true,
        onHide: () => {
          navigation.dispatch(StackActions.replace('Game'));
        },
      });
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout
      life
      fixed
      appbar
      bottomBar
      navigation={navigation}
      refresh={loadData}>
      <View style={{ height: height, position: 'relative' }}>
        <View style={[Styles.centerRow, { marginVertical: scaledFontSize(20), }]}>
          {loading ? (
            <View>
              <ActivityIndicator size={40} color={Colors.secondary} />
            </View>
          ) : data ? (
            <ImageBackground
              source={require('@assets/images/quiz_bg.png')}
              resizeMode="stretch"
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  // width: width * 0.8,
                  minWidth: width * .5,
                  maxWidth: 700,
                  marginHorizontal: scaledFontSize(16),
                  height: scaledHeight * 0.6,
                  padding: 0.15,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Game');
                }}
                style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
                <Image
                  source={require('@assets/images/close.png')}
                  style={{ width: scaledFontSize(50), height: scaledFontSize(50) }}
                />
              </TouchableOpacity>

              <View style={{ position: 'relative' }}>
                <View
                  style={[
                    Styles.quiz,
                    {
                      paddingVertical: 60,
                      gap: scaledFontSize(20)
                    },
                  ]}>
                  <Text
                    style={[
                      Styles.quizTitle,
                      { fontSize: scaledFontSize(16), fontWeight: 'bold' },
                    ]}>
                    {data?.title}
                  </Text>
                  <ScrollView style={[]}>
                    {data.answers.map((item, key) => {
                      return (
                        <TouchableOpacity
                          key={key}
                          activeOpacity={1}
                          style={{ marginVertical:10 }}
                          onPress={() => {
                            setSelected(item);
                          }}>
                          <View
                            style={[
                              Styles.answer,
                              {
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:
                                  selected?.id == item.id
                                    ? Colors.secondary
                                    : Colors.white,
                              },
                            ]}>
                            <Text
                              style={[
                                Styles.quizTitle,
                                {
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '100%',
                                  textAlign: 'center',
                                  color:
                                    selected?.id == item.id
                                      ? Colors.white
                                      : Colors.primary,
                                  fontSize: scaledFontSize(16),
                                  fontWeight: 'bold',
                                },
                              ]}>
                              {item.title}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: -15,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    // height: height * 0.1,
                  }}
                  onPress={submit}
                  activeOpacity={0.7}>
                  <ImageBackground
                    source={require('@assets/images/submit.png')}
                    resizeMode="contain"
                    style={[
                      {
                        width: scaledHeight * 0.2,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 8,
                      },
                    ]}>
                    <Text
                      style={[Styles.boldText, { fontSize: scaledFontSize(18) }]}>
                      {translate('submit')}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          ) : null}
        </View>
      </View>
    </Layout>
  );
}

export default QuizScreen;
