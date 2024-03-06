import React from 'react';
// import { Text, TextInput } from 'react-native-paper';
import { FieldType } from '../../types';
import { Dimensions, View } from 'react-native';
import Styles from '../../styles';
import { Colors } from '@/constant/color';
import { scaledFontSize } from '@/components/functions';
import { TextInput } from 'react-native-paper';

const baseHeight = 800; // Height on which the font size is designed
const { width, height } = Dimensions.get('window')

function CustomInputField({
  keyboardType,
  returnKeyType,
  label,
  param,
  required,
  value,
  password,
  placeholder,
  error,
  action,
  left,
  right,
}: FieldType) {

  return (
    <View >
      <TextInput
        left={left}
        right={right}
        mode={'outlined'}
        keyboardType={keyboardType ?? 'default'}
        label={(required ? `${label} *` : label)}
        value={value ?? ''}
        placeholderTextColor={Colors.placeholder}
        secureTextEntry={password}
        // returnKeyType={returnKeyType}
        error={error}
        placeholder={placeholder}
        onChange={(e) => {
          action(param, e.nativeEvent.text)
        }}
      />


    </View>
  );
}

export default CustomInputField;
