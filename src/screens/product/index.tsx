import { scaledFontSize } from '@/components/functions';
import Layout from '@/components/layout';
import Styles from '@/components/styles';
import { ProductKnowledgeType } from '@/components/types';
import CustomButton from '@/components/widgets/button';
import { Colors } from '@/constant/color';
import { routeConfig } from '@/constant/route';
import { get } from '@/data/api.handler';
import { getUser } from '@/data/store.data';
import useTrans from '@/locale';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const { height, width } = Dimensions.get('screen');
const baseHeight = 800; // Height on which the font size is designed
const baseWidth = 400; // Height on which the font size is designed

function ProductKnowledgeScreen({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductKnowledgeType[]>([]);
  const scaleFactor = height / baseHeight;
  const scaledHeight = baseHeight * scaleFactor;
  const scaledWidth = baseWidth * scaleFactor;
  const { language, translate } = useTrans();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [more, setMore] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const user = await getUser();
    try {
      const res = await get(routeConfig.productKnowledge, user?.token, {
        page: page,
      });
      if (res && res.status_code == 200) {
        page == 1 ? setData(res.data) : setData([...data, ...res.data]);
        setTotal(res.total ?? 0);
        let check = (res.total ?? 0) / (page * (res.perPage ?? 10));
        setMore(check > 1);
      } else {
        setMore(false);
        setData([]);
      }

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };
  const PlayVideo = (item: ProductKnowledgeType) => {
    navigation.navigate('Video', {
      item: item,
    });
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <Layout appbar bottomBar navigation={navigation} refresh={loadData}>
      <View style={{ height: height }}>
        <View style={{ flex: 1 }}>
          <View>
            {loading ? (
              <View>
                <ActivityIndicator size={40} color={Colors.secondary} />
              </View>
            ) : (
              <View style={[{ alignItems: 'center', gap: 10, marginTop: 20 }]}>
                {data.map((item, key) => {
                  return (
                    <View
                      key={key}
                      style={[
                        Styles.card,
                        {
                          backgroundColor: Colors.white,
                          borderRadius: 10,
                          paddingHorizontal: 10,
                          paddingVertical: 0,
                          maxWidth: 600,
                          width: scaledWidth * .8,
                          padding: 0,
                        },
                      ]}>
                      <TouchableOpacity
                        onPress={() => {
                          PlayVideo(item);
                        }}
                        activeOpacity={0.7}>
                        <View
                          style={[
                            Styles.flexColumn,
                            {
                              borderTopEndRadius: 10,
                              borderTopStartRadius: 10,
                              gap: 6,
                            },
                          ]}>
                          <Image
                            style={[
                              {
                                height: scaledHeight * .2,
                                paddingHorizontal: 10,
                                paddingBottom: 40,
                                width: scaledWidth * .8,
                                backgroundColor: Colors.placeholder,
                                borderTopLeftRadius: 6,
                                borderTopRightRadius: 6,
                              },
                            ]}
                            resizeMode="cover"
                            source={{ uri: item.media.thumb }}
                          />
                          <Text style={[Styles.darkBoldText, { padding: 10, fontSize: scaledFontSize(16) }]}>
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}

                {more ? (
                  <View style={{ marginVertical: 20 }}>
                    <CustomButton
                      title={translate('load_more')}
                      action={loadMore}
                      style={{ width: scaledWidth * .4, backgroundColor: 'white' }}
                      color={Colors.primary}
                      loading={loading}
                    />
                  </View>
                ) : null}
              </View>

            )}

          </View>
        </View>
      </View>
    </Layout >
  );
}

export default ProductKnowledgeScreen;
