import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import Layout from '@/components/layout';
import Styles from '@/components/styles';
import Logo from '@/components/widgets/logo';
import CustomCard from '@/components/widgets/card';
import {
  CityType,
  PharmacyType,
  UserRegisterErrorType,
  UserRegisterType,
  UserSpecialityType,
} from '@/components/types';
import CustomInputField from '@/components/widgets/input';
import {
  addPrefixIfNotExist,
  isEmpty,
  isValidPhoneNumber,
  removePrefixIfNotExist,
} from '@/components/functions';
import {post} from '@/data/api.handler';
import {routeConfig} from '@/constant/route';
import {useDispatch} from 'react-redux';
import {storeTempUser} from '@/data/store.data';
import RegisterForm from '@/components/widgets/acount/register';
import VerifyForm from '@/components/widgets/acount/verify';

function RegisterScreen({navigation}: {navigation: any}) {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [info, setInfo] = useState<UserRegisterType>({
    phone: '',
  });
  const [error, setError] = useState<UserRegisterErrorType>({
    phone: false,
  });
  const handleChange = (key: string, value: string) => {
    setInfo({
      ...info,
      [key]: value,
    });
  };
  const onDismiss = () => {
    setError({
      phone: false,
    });
  };

  const handleSubmit = async () => {
    try {
      const {phone} = info;
      if (!isValidPhoneNumber(phone)) {
        setError({
          ...error,
          phone: true,
        });
        setMessage('Kindly type correct phone number like: +20xxxxxxxxxx');
      } else {
        setLoading(true);
        let data = {
          phone: addPrefixIfNotExist(info.phone, '+20'),
        };
        const res = await post(routeConfig.sendOtp, data, null);
        if (res && res.status_code == 200) {
          //   storeUser(res.data);
          setInfo(data);
          setError({
            phone: false,
          });
          setIsSent(true);
        } else {
          setInfo({
            phone: removePrefixIfNotExist(info.phone, '+20'),
          });
          setMessage(
            'The credentials are incorrect; kindly attempt the process once more.',
          );
          setError({
            phone: true,
          });
        }
      }
      setLoading(false);
    } catch (e) {
      setMessage(
        'The credentials are incorrect; kindly attempt the process once more.',
      );
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      const {phone, verify_code} = info;
      if (!isValidPhoneNumber(phone)) {
        setError({
          ...error,
          phone: true,
        });
        setMessage('Kindly type correct phone number like: +20xxxxxxxxxx');
      } else if (verify_code && isEmpty(verify_code)) {
        setError({
          ...error,
          verify_code: true,
        });
        setMessage('Please enter the OTP sent to your phone number: ' + phone);
      } else {
        setLoading(true);
        let data = {
          ...info,
          verify_code: verify_code,
          phone: addPrefixIfNotExist(info.phone, '+20'),
        };
        const res = await post(routeConfig.verifyOtp, data, null);
        if (res && res.status_code == 200) {
          storeTempUser(res.data);
          setInfo(data);
          navigation.reset({
            index: 0,
            routes: [{name: 'CompleteInfo'}],
          });
        } else {
          setInfo({
            phone: removePrefixIfNotExist(info.phone, '+20'),
          });
          console.log(res);
          setMessage(
            'The credentials are incorrect; kindly attempt the process once more.',
          );
          setError({
            phone: true,
            verify_code: true,
          });
        }
      }
      setLoading(false);
    } catch (e) {
      setMessage(
        'The credentials are incorrect; kindly attempt the process once more.',
      );
      setLoading(false);
    }
  };

  return (
    <Layout
      snackDismiss={onDismiss}
      removeSpace
      snackTitle={message}
      snackVisable={error.phone}>
      <View style={[{flex: 1, minHeight: Dimensions.get('screen').height}]}>
        <View style={[Styles.center, {marginVertical: 10}]}>
          <Logo width={200} height={250} />
          {!isSent ? (
            // <RegisterForm
            //   loading={loading}
            //   handleSubmit={handleSubmit}
            //   navigation={navigation}
            //   info={info}
            //   error={error}
            //   handleChange={handleChange}
            // />
            <></>
          ) : (
            <VerifyForm
              loading={loading}
              handleSubmit={handleVerify}
              handleResend={handleSubmit}
              info={info}
              error={error}
              handleChange={handleChange}
            />
          )}
        </View>
      </View>
    </Layout>
  );
}

export default RegisterScreen;
