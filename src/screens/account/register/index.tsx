import {
  addPrefixIfNotExist,
  isEmpty,
  isValidEmail,
  isValidPhoneNumber,
  removePrefixIfNotExist,
} from '@/components/functions';
import Layout from '@/components/layout';
import Styles from '@/components/styles';
import {
  UserRegistrationErrorType,
  UserRegistrationType,
} from '@/components/types';
import RegisterForm from '@/components/widgets/acount/register';
import Logo from '@/components/widgets/logo';
import {routeConfig} from '@/constant/route';
import {post} from '@/data/api.handler';
import {storeTempUser} from '@/data/store.data';
import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';

function RegisterScreen({navigation}: {navigation: any}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [info, setInfo] = useState<UserRegistrationType>({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState<UserRegistrationErrorType>({
    phone: false,
    name: false,
    email: false,
    pharmacy: false,
    city: false,
    password: false,
    confirm_password: false,
  });
  const handleChange = (key: string, value: string) => {
    setInfo({
      ...info,
      [key]: value,
    });
    onDismiss();
  };
  const onDismiss = () => {
    setError({
      phone: false,
      name: false,
      email: false,
      pharmacy: false,
      city: false,
      password: false,
      confirm_password: false,
    });
    setMessage('');
  };

  const onError = () => {
    setError({
      phone: true,
      name: true,
      email: true,
      pharmacy: true,
      city: true,
      password: true,
      confirm_password: true,
    });
    setMessage(
      'The credentials are incorrect; kindly attempt the process once more.',
    );
  };

  const validateForm = () => {
    const {name, phone, email, city, pharmacy, password, confirm_password} =
      info;

    if (isEmpty(name.trim())) {
      setError({
        ...error,
        name: true,
      });
      setMessage('Please type your full name.');
      return false;
    }
    if (!isValidEmail(email.trim())) {
      setError({
        ...error,
        email: true,
      });
      setMessage('Please type your email address.');
      return false;
    }
    if (!isValidPhoneNumber(phone)) {
      setError({
        ...error,
        phone: true,
      });
      setMessage('Kindly type correct phone number like: +20xxxxxxxxxx');
      return false;
    }
    if (
      isEmpty(password.trim()) ||
      isEmpty(confirm_password.trim()) ||
      confirm_password != password
    ) {
      setError({
        ...error,
        password: true,
        confirm_password: true,
      });
      setMessage('The password and confirmation should match.');
      return false;
    }
    if (!city?.id) {
      setError({
        ...error,
        city: true,
      });
      setMessage('Please select the city.');
      return false;
    }
    if (!pharmacy?.id) {
      setError({
        ...error,
        pharmacy: true,
      });
      setMessage('Please select the pharmacy.');
      return false;
    }
    setMessage('');

    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (validateForm()) {
        let data = {
          ...info,
          phone: addPrefixIfNotExist(info.phone, '+20'),
          city_id: info.city?.id,
          pharmacy_id: info.pharmacy?.id,
        };
        const res = await post(routeConfig.register, data, null);
        if (res && res.status_code == 200) {
          storeTempUser(res.data);
          setInfo(data);
          navigation.navigate('UserTypeInfo');
          onDismiss();
        } else {
          setInfo({
            ...info,
            phone: removePrefixIfNotExist(info.phone, '+20'),
          });

          onError();
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Layout
      snackDismiss={onDismiss}
      removeSpace
      snackTitle={message}
      snackVisable={!isEmpty(message)}>
      <View style={[{ flex: 1, minHeight: Dimensions.get('screen').height, justifyContent: 'center', alignItems: 'center' }]}>
        <View style={[Styles.center, {marginVertical: 10,}]}>
          <Logo width={200} height={250} />
          <RegisterForm
            loading={loading}
            handleSubmit={handleSubmit}
            navigation={navigation}
            info={info}
            error={error}
            handleChange={handleChange}
          />
        </View>
      </View>
    </Layout>
  );
}

export default RegisterScreen;
