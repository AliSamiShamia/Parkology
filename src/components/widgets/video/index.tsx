import Styles from "@/components/styles";
import { ProductKnowledgeType } from "@/components/types";
import { Colors } from "@/constant/color";
import { routeConfig } from "@/constant/route";
import { post } from "@/data/api.handler";
import { getUser } from "@/data/store.data";
import useTrans from "@/locale";
import { updateScore } from "@/store/user";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { ActivityIndicator, IconButton } from "react-native-paper";
import Video from "react-native-video";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("screen");
const baseHeight = 800; // Height on which the font size is designed

function FullScreenVideo({ item }: { item: ProductKnowledgeType }) {
  const videoRef = useRef(null);
  const { language, translate } = useTrans();
  const [dimensions, setDimensions] = useState({
    width: width,
    height: height,
  });
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  useEffect(() => {
    // collectPoints()
    const updateDimensions = () => {
      setDimensions({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      });
    };

    const listener = Dimensions.addEventListener("change", updateDimensions);

    return () => {
      listener.remove();
    };
  }, []);

  const [paused, setPaused] = useState(false);
  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const closeFullScreen = () => {
    navigation.replace("ProductKnowledge");
  };
  const collectPoints = async () => {
    setLoading(true);
    try {
      const user = await getUser();

      const res = await post(
        routeConfig.productKnowledge + "/" + item.id,
        null,
        user?.token
      );
      if (res && res.status_code == 200) {
        dispatch(updateScore(res.data.score));
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: translate("success"),
          textBody:
            translate("collected_points") +
            " " +
            res.data.points +
            " " +
            translate("points"),
          button: "close",
          autoClose: true,
          closeOnOverlayTap: false,
          onHide: () => {
            navigation.replace("ProductKnowledge");
          },
        });
      } else {
        navigation.replace("ProductKnowledge");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        position: "relative",
        height: dimensions.height,
        width: "100%",
        borderWidth: 1,
      }}
    >
      {loading ? (
        <View style={[Styles.center, { flex: 1 }]}>
          <ActivityIndicator size={40} color={Colors.secondary} />
        </View>
      ) : (
        <Video
          ref={videoRef}
          source={{
            uri: item.media.url,
          }}
          allowsExternalPlayback
          controls
          paused={paused}
          poster={item.media.thumb}
          ignoreSilentSwitch="ignore"
          style={[
            Styles.backgroundVideo,
            {
              height: dimensions.height,
              width: "100%",
              backgroundColor: Colors.placeholder,
            },
          ]}
          fullscreen
          resizeMode="contain"
          posterResizeMode="contain"
          onLoad={() => {
            setVideoLoading(false);
          }}
          onEnd={() => {
            collectPoints();
          }}
        />
      )}
      {videoLoading ? (
        <View
          style={[
            Styles.center,
            {
              flex: 1,
              position: "absolute",
              top: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1100,
              alignContent: "center",
              width: dimensions.width,
              height: dimensions.height,
              backgroundColor: Colors.placeholder,
            },
          ]}
        >
          <ActivityIndicator size={40} color={Colors.secondary} />
        </View>
      ) : null}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: dimensions.height * 0.05,
          right: dimensions.width * 0.05,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1200,
        }}
        onPress={closeFullScreen}
      >
        <View>
          <IconButton
            style={{
              borderRadius: 25,
              backgroundColor: Colors.white,

              opacity: 1,
            }}
            iconColor={Colors.error}
            icon={"close"}
            size={25}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: dimensions.height,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
        onPress={togglePlayPause}
      >
        <View>
          {paused && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                style={{
                  borderRadius: 60,
                  backgroundColor: Colors.secondary,

                  opacity: paused ? 1 : 0,
                }}
                iconColor={Colors.white}
                icon={"play"}
                size={40}
              />
            </View>
          )}
          {!paused && (
            <View style={{}}>
              <IconButton
                style={{
                  borderRadius: 60,
                  backgroundColor: Colors.white,
                  opacity: paused ? 0 : 0,
                }}
                icon={"pause"}
                size={60}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default FullScreenVideo;
