import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PropsType } from "../types";
import Styles from "../styles";
import CustomSnackbar from "../widgets/snackbar";
import CustomAppBar from "../widgets/appbar";
import { AlertNotificationRoot } from "react-native-alert-notification";
import BottomBar from "../widgets/bottombar";
import Orientation from "react-native-orientation-locker";
import { useIsFocused } from "@react-navigation/native";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { ONESIGNAL_APP_ID_ANDROID, ONESIGNAL_APP_ID_IOS } from "@env";

function Layout({
  children,
  snackTitle,
  snackVisable,
  snackDismiss,
  appbar,
  bottomBar,
  navigation,
  refresh,
  refreshing,
  removeSpace,
  fixed,
  life,
  rotate,
}: PropsType) {
  const isFocussed = useIsFocused();

  useEffect(() => {
    if (rotate) {
      Orientation.unlockAllOrientations();
    } else {
      Orientation.lockToPortrait();
    }
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);

      // OneSignal Initialization
      OneSignal.initialize(
        Platform.OS === "ios" ? ONESIGNAL_APP_ID_IOS : ONESIGNAL_APP_ID_ANDROID
      );

      // requestPermission will show the native iOS or Android notification permission prompt.
      // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
      OneSignal.Notifications.requestPermission(true);

      // Method for listening for notification clicks
      OneSignal.Notifications.addEventListener("click", (event: any) => {
        try {
          const { action, notification } = event;
          if (notification.additionalData != undefined) {
            switch (notification.additionalData.type) {
              case "challenge":
                navigation.navigate("Game");
                break;
              case "product":
                navigation.navigate("ProductKnowledge");
                break;
              default:
                navigation.navigate("Home");
                break;
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    
  }, []);

  return (
    <AlertNotificationRoot>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={{ flex: 1, position: "relative", borderWidth: 1 }}>
        <ImageBackground
          source={require("@assets/images/background.png")}
          resizeMode="cover"
          style={[Styles.main]}
        >
          {appbar ? <CustomAppBar navigation={navigation} life={life} /> : null}
          <KeyboardAvoidingView
            style={[Styles.container]}
            keyboardVerticalOffset={2}
            key={isFocussed ? "focussed" : "non-focussed"}
            enabled={isFocussed}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                scrollEnabled={fixed ? false : true}
                style={Styles.scrollView}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing ?? false}
                    onRefresh={refresh}
                    progressViewOffset={100}
                  />
                }
              >
                <View style={[removeSpace ? {} : Styles.appbarSpace]}>
                  {children}
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          {bottomBar ? (
            <View>
              <View style={[Styles.space3]}></View>
              <BottomBar navigation={navigation} />
            </View>
          ) : null}
        </ImageBackground>

        <CustomSnackbar
          title={snackTitle}
          visible={snackVisable}
          onDismiss={snackDismiss}
        />
      </View>
    </AlertNotificationRoot>
  );
}

export default Layout;
