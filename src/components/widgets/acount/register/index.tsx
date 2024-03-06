import { RegisterFormType } from '@/components/types';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomCard from '../../card';
import { View } from 'react-native';
import Styles from '@/components/styles';
import CustomInputField from '../../input';
import { Text, TextInput } from 'react-native-paper';
import AutoComplete from '../../autocomplete';
import { routeConfig } from '@/constant/route';

function RegisterForm({
  loading,
  handleSubmit,
  navigation,
  info,
  error,
  handleChange,
}: RegisterFormType) {
  return (
    <CustomCard
      title="Sign Up"
      subtitle="Register"
      action={{
        title: 'Next',
        action: handleSubmit,
        type: 'contained',
        color: Colors.white,
        style: { borderWidth: 2 }
      }}
      loading={loading}
      additional_action={[
        {
          title: 'Login',
          subtitle: 'Have an account?',
          action: () => {
            navigation.navigate('Login');
          },
          type: 'text',
          color: Colors.primary,
        },
      ]}>
      <View style={[Styles.flexRow]}>

        <View style={[Styles.flexColumn,]}>
          <View style={{ ...Styles.flexColumn, gap: 3 }}>
            <Text style={Styles.darkBoldText}>Personal Information</Text>
            <View style={Styles.flexColumn}>

              <TextInput
                label="Name *"
                keyboardType={'default'}
                value={info?.name}
                error={error?.name}
                placeholder="Enter your Full Name"
                mode={'outlined'}
                placeholderTextColor={Colors.placeholder}
                onChange={(e) => {
                  handleChange('name', e.nativeEvent.text)
                }}
              />

              <TextInput
                label="Email Address *"
                keyboardType={'email-address'}
                value={info?.email}
                error={error?.email}
                placeholder="Enter your Email Address"
                mode={'outlined'}
                placeholderTextColor={Colors.placeholder}
                onChange={(e) => {
                  handleChange('email', e.nativeEvent.text)
                }}
              />

              <TextInput
                left={<TextInput.Affix text="+20" />}
                mode={'outlined'}
                keyboardType={'phone-pad'}
                label={"Phone Number *"}
                value={info?.phone} placeholderTextColor={Colors.placeholder}
                error={error.phone}
                placeholder={"Enter your Phone Number"}
                onChange={(e) => {
                  handleChange('phone', e.nativeEvent.text)
                }}
              />
              <AutoComplete
                url={routeConfig.cities}
                title="city"
                value={info.city}
                handleChange={handleChange}
              />
              {info.city ? (
                <AutoComplete
                  url={routeConfig.pharmacies + '/' + info.city.id}
                  value={info.pharmacy}
                  title="pharmacy"
                  handleChange={handleChange}
                />
              ) : null}
            </View>
          </View>
          <View style={{ ...Styles.flexColumn, gap: 3 }}>
            <Text style={Styles.darkBoldText}>Additional Information</Text>

            <TextInput
              mode={'outlined'}
              keyboardType={'default'}
              label={"Password *"}
              value={info?.password}
              secureTextEntry={true}
              placeholderTextColor={Colors.placeholder}
              error={error.password}
              placeholder={"Enter your Password"}
              onChange={(e) => {
                handleChange('password', e.nativeEvent.text)
              }}
            />
            <TextInput
              mode={'outlined'}
              keyboardType={'default'}
              label={"Confirm Password *"}
              secureTextEntry={true}

              value={info?.confirm_password}
              placeholderTextColor={Colors.placeholder}
              error={error.confirm_password}
              placeholder="Enter your Password again"
              onChange={(e) => {
                handleChange('confirm_password', e.nativeEvent.text)
              }}
            />

          </View>
        </View>
      </View>
    </CustomCard>
  );
}

export default RegisterForm;
