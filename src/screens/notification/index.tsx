import { scaledFontSize } from "@/components/functions";
import Layout from "@/components/layout";
import Styles from "@/components/styles";
import { NotificationType } from "@/components/types";
import CustomCard from "@/components/widgets/card";
import { Colors } from "@/constant/color";
import { routeConfig } from "@/constant/route";
import { get } from "@/data/api.handler";
import { getUser } from "@/data/store.data";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

const height = Dimensions.get("screen").height;
const baseHeight = 800; // Width on which the font size is designed
const baseImageHeight = 700;

function NotificationScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(false);
  const scaleFactor = height / baseHeight;
  const scaledHeight = baseImageHeight * scaleFactor;
  const loadData = async () => {
    setLoading(true);
    try {
      const user = await getUser();
      const res = await get(routeConfig.notification, user?.token);
      if (res && res.status_code == 200) {
        setData(res.data);
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
      <View style={{ position: "relative" }}>
        {loading ? (
          <View>
            <ActivityIndicator size={40} color={Colors.secondary} />
          </View>
        ) : (
          <View
            style={[
              Styles.flexColumn,
              {
                marginVertical: scaledHeight * 0.02,
                gap: 10,
                marginBottom: scaledHeight * 0.1,
              },
            ]}
          >
            {data.map((item, key) => {
              return (
                <CustomCard
                  key={key}
                  style={{
                    maxWidth: "100%",
                    flex: 1,
                    paddingHorizontal: 0,
                    paddingVertical: 10,
                    marginHorizontal: scaledFontSize(15),
                    backgroundColor: Colors.grey,
                  }}
                  loading={false}
                >
                  <Text
                    style={{
                      fontSize: scaledFontSize(16),
                      color: Colors.dark,
                      alignSelf: "flex-start",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: scaledFontSize(14),
                      color: Colors.primary,
                      fontWeight: "bold",
                      alignSelf: "flex-end",
                      marginVertical: 10,
                      fontStyle: "italic",
                    }}
                  >
                    {item.created_at}
                  </Text>
                </CustomCard>
              );
            })}
          </View>
        )}
      </View>
    </Layout>
  );
}

export default NotificationScreen;
