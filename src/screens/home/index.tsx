import Layout from "@/components/layout";
import Styles from "@/components/styles";
import { AdsType, UserType } from "@/components/types";
import { Colors } from "@/constant/color";
import { routeConfig } from "@/constant/route";
import { get } from "@/data/api.handler";
import { getUser, storeUser } from "@/data/store.data";
import { setUser } from "@/store/user";
import { OneSignal } from "react-native-onesignal";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Icon, Text } from "react-native-paper";
import Carousel from "react-native-snap-carousel-v4";
import { useDispatch, useSelector } from "react-redux";
import ChooseAvatar from "@/components/widgets/avatar";

const sections = [
  {
    icon: require("@assets/images/icon.png"),
    type: "image",
    action: "Game",
    active: true,
  },
  {
    icon: "video",
    type: "icon",
    action: "ProductKnowledge",
    active: true,
  },
  {
    icon: "finance",
    type: "icon",
    action: "Sales",
    active: true,
  },
  {
    icon: require("@assets/images/event.png"),
    type: "image",
    action: "Event",
    active: true,
  },
];

const baseHeight = 800; // Width on which the font size is designed
const { width, height } = Dimensions.get("screen");
const baseIconWidth = 120;
const baseWidth = 120;

function HomeScreen({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const user = useSelector((state: any) => state.user)
  const [avatar, setAvatar] = useState(false);
  const scaleFactor = height / baseHeight;
  const dispatch = useDispatch();
  const scaledFontSize = (size: number) => Math.round(size * scaleFactor);
  const scaledWidth = baseIconWidth * scaleFactor;
  const scaledHeight = baseHeight * scaleFactor;
  const loadData = async () => {
    try {
      setLoading(true);
      const user = await getUser();
      const fcm = OneSignal.User.pushSubscription.getPushSubscriptionId();
      // OneSignal.User.pushSubscription.getPushSubscriptionToken();
      let data = {
        fcm: fcm,
      };
      if (user?.avatar) {
        setAvatar(false);
      } else {
        setAvatar(true);
      }
      const res = await get(routeConfig.ads, user?.token, data);
      if (res && res.status_code == 200) {
        storeUser(res.data.profile);
        dispatch(setUser(res.data.profile));
        setEntries(res.data.ads);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {

    if (!loading &&
      user && (!user?.avatar || user?.avatar == "")
    ) {
      setAvatar(true);
    } else {
      setAvatar(false);
    }

  }, [user?.avatar, loading]);

  const _renderItem = ({ item, index }: { item: AdsType; index: number }) => {
    return item.action ? (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate(item.type);
        }}
      >
        <ImageBackground
          resizeMode="cover"
          source={{ uri: item.url }}
          style={[Styles.slide, Styles.center, { height: scaledHeight * .2 }]}
        />
      </TouchableOpacity>
    ) : (
      <ImageBackground
        key={index}
        resizeMode="cover"
        source={{ uri: item.url }}
        style={[Styles.slide, Styles.center, { height: scaledHeight * .2 }]}
      />
    );
  };
  return (
    <>
      <Layout appbar bottomBar navigation={navigation} refresh={loadData}>
        <View style={Styles.space3}>
          <View style={[Styles.center]}>
            {loading ? (
              <View style={[Styles.center, Styles.slide]}>
                <ActivityIndicator size={scaledFontSize(30)} />
              </View>
            ) : (
              <Carousel
                vertical={false}
                data={entries}
                autoplay
                layout={"stack"}
                layoutCardOffset={18}
                renderItem={_renderItem}
                sliderWidth={width * 0.9}
                itemWidth={width}
              />
            )}
          </View>
          <View style={[Styles.flexWrap, Styles.space5]}>
            {sections.map((item, key) => {
              return (
                <View key={key} style={Styles.item}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      item.active ? navigation.navigate(item.action) : null;
                    }}
                  >
                    <View
                      style={[
                        Styles.roundItem,
                        { width: scaledWidth, height: scaledWidth },
                      ]}
                    >
                      {item.type == "icon" ? (
                        <Icon
                          source={item.icon}
                          size={scaledFontSize(70)}
                          color={Colors.primary}
                        />
                      ) : (
                        <Image
                          style={{ width: scaledFontSize(70) }}
                          resizeMode="contain"
                          source={item.icon}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </Layout>
      {avatar ? <ChooseAvatar /> : null}
    </>
  );
}

export default HomeScreen;
