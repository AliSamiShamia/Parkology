import { OtpFormType } from '@/components/types';
import React from 'react';
import CustomCard from '../../card';
import { View } from 'react-native';
import Styles from '@/components/styles';
import CustomInputField from '../../input';
import { Text } from 'react-native-paper';
import { Colors } from '@/constant/color';

function VerifyForm({
  loading,
  handleSubmit,
  info,
  handleResend,
  error,
  handleChange,
}: OtpFormType) {
  return (
    <CustomCard
      title="Sign Up"
      subtitle="Register"
      action={{
        title: 'Next',
        action: handleSubmit,
        type: 'contained',
        color: Colors.white,
      }}
      loading={loading}
      additional_action={[
        {
          title: 'Resend',
          subtitle: "Did't receive it?",
          action: handleResend,
          type: 'text',
          color: Colors.primary,
        },
      ]}>
      <View style={[Styles.flexRow]}>

        <View style={[Styles.flexColumn, { marginVertical: 20 }]}>
          <View style={{ ...Styles.flexColumn, gap: 10 }}>
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
              keyboardType={'name-phone-pad'}
              required
              value={info?.verify_code}
              action={handleChange}
              error={error?.verify_code}
              placeholder="Enter your Otp"
            />
          </View>
        </View>
      </View>
    </CustomCard>
  );
}

export default VerifyForm;
