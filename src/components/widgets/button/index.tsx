import React from 'react';
import { Button, Text } from 'react-native-paper';
import Styles from '../../styles';
import { ButtonType } from '../../types';
import { scaledFontSize } from '@/components/functions';

function CustomButton({
  title,
  color,
  action,
  type,
  style,
  loading,
}: ButtonType) {
  return (
    <Button
      style={[style]}
      loading={loading}
      mode={type ? type : 'contained'}
      compact
      onPress={action}>
      <Text style={{ ...Styles.btnText, color: color, textAlign: 'center', fontSize: scaledFontSize(15) }}> {title}</Text>
    </Button>
  );
}

export default CustomButton;
