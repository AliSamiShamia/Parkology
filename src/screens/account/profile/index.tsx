import { scaledFontSize } from "@/components/functions";
import Layout from "@/components/layout";
import Styles from "@/components/styles";
import { UserType } from "@/components/types";
import CustomCard from "@/components/widgets/card";
import { Colors } from "@/constant/color";
import { routeConfig } from "@/constant/route";
import { post } from "@/data/api.handler";
import { deleteTempUser, deleteUser, getUser } from "@/data/store.data";
import useTrans from "@/locale";
import { resetUser, setUser } from "@/store/user";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { ActivityIndicator, Chip, Text } from "react-native-paper";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("screen");
const baseHeight = 800; // Width on which the font size is designed
const baseImageHeight = 700;

function ProfileScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const scaleFactor = height / baseHeight;
  const scaledHeight = baseImageHeight * scaleFactor;
  const [profile, setProfile] = useState<UserType>();
  const dispatch = useDispatch();
  const { language, translate } = useTrans();

  const loadData = async () => {
    setLoading(true);
    const user = await getUser();
    try {
      const res = await post(routeConfig.profile, null, user?.token);
      if (res && res.status_code == 200) {
        setProfile(res.data);
        dispatch(setUser(res.data));
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const logout = () => {
    setLoading(true);
    dispatch(resetUser());
    deleteUser();
    deleteTempUser();

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // Resetting navigation to the Login screen
    });
  };
  const editProfile = async () => {
    navigation.navigate("EditProfile");
  };

  return (
    <Layout appbar bottomBar navigation={navigation} refresh={loadData}>
      <View style={{ height: scaledHeight, position: "relative" }}>
        <View style={[Styles.flexColumnStart, { marginVertical: 10 }]}>
          <CustomCard
            title="Personal Information"
            subtitle="Profile"
            loading={loading}
            style={{
              paddingVertical: 0,
              borderWidth: 1,
              marginHorizontal: width * 0.05,
            }}
            action={{
              title: translate("edit"),
              action: editProfile,
              color: Colors.white,
              type: "contained",
              style: { width: 150 },
            }}
            additional_action={[
              {
                title: translate("logout"),
                action: logout,
                color: Colors.white,
                type: "contained",
                style: { backgroundColor: Colors.error, width: 150 },
              },
            ]}
          >
            {loading ? (
              <View>
                <ActivityIndicator size={40} color={Colors.secondary} />
              </View>
            ) : (
              <View
                style={[
                  Styles.flexColumn,
                  {
                    flexDirection: "row",
                    gap: scaledFontSize(20),
                    marginTop: 20,
                  },
                ]}
              >
                <View style={[Styles.flexColumn, { gap: 10 }]}>
                  <View style={[Styles.flexRow, { alignItems: "center" }]}>
                    <Text
                      style={[
                        Styles.darkBoldText,
                        { width: 80, fontSize: scaledFontSize(16) },
                      ]}
                    >
                      {translate("name")}:
                    </Text>
                    <Chip
                      textStyle={[
                        Styles.darkText,
                        {
                          backgroundColor: Colors.transparent,
                          maxWidth: 170,
                          flexWrap: "wrap",
                          fontSize: scaledFontSize(16),
                        },
                      ]}
                    >
                      {profile?.name}
                    </Chip>
                  </View>
                  <View style={[Styles.flexRow, { alignItems: "center" }]}>
                    <Text
                      style={[
                        Styles.darkBoldText,
                        { width: 80, fontSize: scaledFontSize(16) },
                      ]}
                    >
                      {translate("email")}:
                    </Text>
                    <Chip
                      textStyle={[
                        Styles.darkText,
                        {
                          backgroundColor: Colors.transparent,
                          maxWidth: 170,
                          flexWrap: "wrap",
                          fontSize: scaledFontSize(16),
                        },
                      ]}
                    >
                      {profile?.email}
                    </Chip>
                  </View>
                  <View style={[Styles.flexRow, { alignItems: "center" }]}>
                    <Text
                      style={[
                        Styles.darkBoldText,
                        { width: 80, fontSize: scaledFontSize(16) },
                      ]}
                    >
                      {translate("phone")}:
                    </Text>
                    <Chip
                      textStyle={[
                        Styles.darkText,
                        {
                          backgroundColor: Colors.transparent,
                          maxWidth: 170,
                          flexWrap: "wrap",
                          fontSize: scaledFontSize(16),
                        },
                      ]}
                    >
                      {profile?.phone}
                    </Chip>
                  </View>
                  <View style={[Styles.flexRow, { alignItems: "center" }]}>
                    <Text
                      style={[
                        Styles.darkBoldText,
                        { width: 80, fontSize: scaledFontSize(16) },
                      ]}
                    >
                      {translate("city")}:
                    </Text>
                    <Chip
                      textStyle={[
                        Styles.darkText,
                        {
                          backgroundColor: Colors.transparent,
                          maxWidth: 170,
                          flexWrap: "wrap",
                          fontSize: scaledFontSize(16),
                        },
                      ]}
                    >
                      {profile?.city?.name}
                    </Chip>
                  </View>
                  <View style={[Styles.flexRow, { alignItems: "center" }]}>
                    <Text
                      style={[
                        Styles.darkBoldText,
                        { width: 80, fontSize: scaledFontSize(16) },
                      ]}
                    >
                      {translate("pharmacy")}:
                    </Text>
                    <Chip
                      textStyle={[
                        Styles.darkText,
                        {
                          backgroundColor: Colors.transparent,
                          maxWidth: 170,
                          flexWrap: "wrap",
                          fontSize: scaledFontSize(16),
                        },
                      ]}
                    >
                      {profile?.pharmacy?.name}
                    </Chip>
                  </View>
                  <View style={[Styles.flexRow, { alignItems: "center" }]}>
                    <Text
                      style={[
                        Styles.darkBoldText,
                        { width: 80, fontSize: scaledFontSize(16) },
                      ]}
                    >
                      {translate("type")}:
                    </Text>
                    <Chip
                      textStyle={[
                        Styles.darkText,
                        {
                          backgroundColor: Colors.transparent,
                          maxWidth: 170,
                          flexWrap: "wrap",
                          fontSize: scaledFontSize(16),
                        },
                      ]}
                    >
                      {profile?.type?.name}
                    </Chip>
                  </View>
                </View>
              </View>
            )}
          </CustomCard>
        </View>
      </View>
    </Layout>
  );
}

export default ProfileScreen;
