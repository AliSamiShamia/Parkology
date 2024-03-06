import {
  addPrefixIfNotExist,
  isEmpty,
  isValidPhoneNumber,
} from '@/components/functions';
import Layout from '@/components/layout';
import Styles from '@/components/styles';
import CustomCard from '@/components/widgets/card';
import CustomInputField from '@/components/widgets/input';
import Logo from '@/components/widgets/logo';
import { Colors } from '@/constant/color';
import { routeConfig } from '@/constant/route';
import { post } from '@/data/api.handler';
import React, { useState } from 'react';
import { Dimensions, Keyboard, TouchableOpacity, View } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { Text, TextInput } from 'react-native-paper';

function ForgotPasswordScreen({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isSent, setIsSent] = useState(false);
  const [info, setInfo] = useState<any>({
    phone: '',
    otp: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState<any>({
    phone: false,
    otp: false,
    password: false,
    confirm_password: false,
  });

  const onDismiss = () => {
    setError({
      phone: false,
      otp: false,
      password: false,
      confirm_password: false,
    });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const { phone } = info;
    setLoading(true);
    try {
      if (!isValidPhoneNumber(phone)) {
        setError({
          ...error,
          phone: true,
        });
        setMessage('Kindly type correct phone number like: +20xxxxxxxxxx');
      } else {
        let data = {
          username: addPrefixIfNotExist(info.phone, '+20'),
        };
        const res = await post(routeConfig.forgotPassword, data, null);
        if (res && res.status_code == 200) {
          setError({
            phone: false,
          });
          setIsSent(true);
        } else {
          setMessage(
            'The credentials are incorrect; kindly attempt the process once more.',
          );
          setError({
            phone: true,
          });
          setIsSent(false);
        }
      }
      setLoading(false);
    } catch (e) {
      setMessage(
        'The credentials are incorrect; kindly attempt the process once more.',
      );
      setIsSent(false);
      setLoading(false);
    }
  };

  const handleReset = async () => {
    Keyboard.dismiss();
    const { verify_code, password, confirm_password } = info;
    setLoading(true);
    try {
      if (isEmpty(verify_code)) {
        setError({
          ...error,
          phone: true,
        });
        setMessage('Kindly type correct phone number like: +20xxxxxxxxxx');
        return false;
      } else if (isEmpty(password) || password !== confirm_password) {
        setError({
          ...error,
          password: true,
          confirm_password: true,
        });
        setMessage('The password and confirmation should match.');
        return false;
      }
      let data = {
        phone: addPrefixIfNotExist(info.phone, '+20'),
        password: password,
        verify_code: verify_code,
      };
      const res = await post(routeConfig.resetPassword, data, null);
      if (res && res.status_code == 200) {
        setError({
          phone: false,
          password: false,
          verify_code: false,
        });

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'INFORMATION',
          textBody:
            'Your password has been updated successfully',
          autoClose: true,
          closeOnOverlayTap: false,
          onHide: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        });
      } else {
        setMessage(
          'The credentials are incorrect; kindly attempt the process once more.',
        );
        setError({
          phone: true,
          password: true,
          verify_code: true,
        });
      }

      setLoading(false);
    } catch (e) {
      setMessage(
        'The credentials are incorrect; kindly attempt the process once more.',
      );
      setIsSent(false);
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setInfo({
      ...info,
      [key]: value,
    });
  };
  const handleResend = async () => {
    try {
      setLoading(true);
      const { phone } = info;
      if (!isValidPhoneNumber(phone)) {
        setError({
          ...error,
          phone: true,
        });
        setMessage('Kindly type correct phone number like: +20xxxxxxxxxx');
      }
      let data = {
        username: addPrefixIfNotExist(info.phone, '+20'),
      };

      const res = await post(routeConfig.forgotPassword, data, null);
      if (res && res.status_code == 200) {
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Layout
      removeSpace
      snackDismiss={onDismiss}
      snackTitle={message}
      snackVisable={error.phone || error.password}>
      <View style={[{ flex: 1, minHeight: Dimensions.get('screen').height, justifyContent: 'center', alignItems: 'center' }]}>
        <View style={[Styles.center, { marginVertical: 10 }]}>
          <Logo width={200} height={200} />
          <View>
            {isSent ? (
              <CustomCard
                title="Reset Password"
                subtitle=""
                action={{
                  title: 'Reset',
                  action: handleReset,
                  type: 'contained',
                  color: Colors.white,
                }}
                loading={loading}
                additional_action={[
                  {
                    title: 'Login',
                    subtitle: 'Have an account?',
                    action: () => {
                      navigation.replace('Login');
                    },
                    type: 'text',
                    color: Colors.primary,
                  },
                ]}>
                <View style={[Styles.flexRow]}>

                  <View style={Styles.flexColumn}>
                    <Text
                      style={{
                        ...Styles.darkText,
                        color: Colors.secondary,
                        fontStyle: 'italic',
                      }}>
                      The OTP has been sent to {info.phone}
                    </Text>
                    <CustomInputField
                      label="Your Otp"
                      param="verify_code"
                      required
                      value={info?.verify_code}
                      action={handleChange}
                      error={error?.verify_code}
                      placeholder="Enter your Otp"
                    />
                    <CustomInputField
                      label="New Password"
                      param="password"
                      required
                      password
                      value={info?.password}
                      action={handleChange}
                      placeholder="Enter your new password"
                    />
                    <CustomInputField
                      label="Confirm Password"
                      param="confirm_password"
                      required
                      password
                      value={info?.confirm_password}
                      action={handleChange}
                      placeholder="Enter password again"
                    />
                    <View style={[Styles.flexRowEnd]}>
                      <TouchableOpacity
                        onPress={() => {
                          handleResend();
                        }}>
                        <Text style={[Styles.darkBoldText, { fontSize: 12 }]}>
                          Resend
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </CustomCard>
            ) : (
              <CustomCard
                title="Reset Password"
                subtitle=""
                action={{
                  title: 'Reset',
                  action: handleSubmit,
                  type: 'contained',
                  color: Colors.white,
                }}
                loading={loading}
                additional_action={[
                  {
                    title: 'Login',
                    subtitle: 'Have an account?',
                    action: () => {
                      navigation.replace('Login');
                    },
                    type: 'text',
                    color: Colors.primary,
                  },
                ]}>
                <View style={[Styles.flexRow]}>

                  <View style={Styles.flexColumn}>
                    <CustomInputField
                      label="Phone Number"
                      param="phone"
                      keyboardType={'phone-pad'}
                      left={<TextInput.Affix text="+20" />}
                      value={info?.phone}
                      action={handleChange}
                      error={error?.phone}
                      placeholder="Enter your Phone Number"
                    />
                  </View>
                </View>
              </CustomCard>
            )}
          </View>
        </View>
      </View>
    </Layout>
  );
}

export default ForgotPasswordScreen;
